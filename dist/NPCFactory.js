import { Utils } from "./utils/Uils.js";
import * as Grafts from "./data/Grafts.js";
import { ItemFactory } from "./ItemFactory.js";
import { MonsterCreation } from "./data/MonsterCreation.js";
import { Races } from "./data/Races.js";
import { Randomizer } from "./Randomizer.js";
import { WeaponFactory } from "./WeaponFactory.js";
export class NPCFactory {
    static async makeNPC(options = { CR: "1/3", race: null }) {
        let actorData = { name: "Generated Actor", type: "npc" };
        let actor = await Actor.create(actorData);
        let actorDescription = {};
        actorDescription["data.details.biography.value"] = "<p>Created by Populator.</p>";
        await actor.update(actorDescription);
        let context = {
            options: options,
            itemsToAdd: [],
            arrays: { main: null, attack: null },
            // Skills
            masterSkill: [],
            goodSkill: [],
            // Attacks
            hasNaturalWeapons: false
        };
        // Look up array
        context.arrays.main = MonsterCreation.arrays.expert.main[options.CR];
        context.arrays.attack = MonsterCreation.arrays.expert.attack[options.CR];
        // Fill in details
        await this.setNameGenderAndRace(actor, context);
        await this.setDetails(actor, context);
        await this.setAttributes(actor, context);
        await this.setGrafts(actor, context);
        await this.setSkills(actor, context);
        await this.setWeapons(actor, context);
        await this.setInventory(actor, context);
        // Add all items
        let actorUpdate = {};
        actorUpdate["items"] = context.itemsToAdd;
        await actor.update(actorUpdate);
    }
    static async setNameGenderAndRace(actor, context) {
        if (!context.options.race) {
            context.options.race = Randomizer.randomRace();
        }
        let actorUpdate = {};
        let raceData = await Utils.fuzzyFindRaceAsync(context.options.race.name);
        // Race item
        await this.clean(raceData);
        context.itemsToAdd.push(raceData);
        // Gender
        let gender = Randomizer.randomGender();
        actorUpdate["data.details.raceAndGrafts"] = gender + " " + context.options.race.name + ", grafts:"; // Grafts will be filled in as applied
        // Name
        actorUpdate["name"] = Randomizer.randomName(context.options.race.name, gender);
        // Update actor
        await actor.update(actorUpdate);
    }
    static async setDetails(actor, context) {
        let race = Races.nonCombatantRaces[context.options.race.name];
        let actorUpdate = {};
        // Source
        actorUpdate["data.details.source"] = "Populator";
        // CR
        var CR = context.options.CR;
        if (CR === "1/3") {
            CR = (1 / 3);
        }
        if (CR === "1/2") {
            CR = 0.5;
        }
        actorUpdate["data.details.cr"] = CR;
        // Alignment
        actorUpdate["data.details.alignment"] = Randomizer.randomAlignment();
        // Languages
        var languages = ["common"];
        if (race.languages) {
            languages.push(...race.languages);
        }
        actorUpdate["data.traits.languages.value"] = languages;
        // Update actor
        await actor.update(actorUpdate);
    }
    static async setAttributes(actor, context) {
        var _a;
        let array = context.arrays.main;
        let actorUpdate = {};
        // Size
        actorUpdate["data.traits.size"] = context.options.race.size;
        // Hands
        if (context.options.race.arms != undefined) {
            actorUpdate["data.attributes.arms"] = context.options.race.arms;
        }
        // Reach
        // TODO: Reach should be decided by grafts
        actorUpdate["data.attributes.reach"] = 5;
        // Set HP
        actorUpdate["data.attributes.hp.value"] = array.HP;
        actorUpdate["data.attributes.hp.max"] = array.HP;
        // Set SP (should be 0)
        actorUpdate["data.attributes.sp.max"] = 0;
        // Set RP (should be 0)
        actorUpdate["data.attributes.rp.max"] = 0;
        // Set KAC
        actorUpdate["data.attributes.kac.value"] = array.KAC;
        // Set EAC
        actorUpdate["data.attributes.eac.value"] = array.EAC;
        // Set reflex save
        actorUpdate["data.attributes.reflex.bonus"] = array.reflex;
        // Set fort save
        actorUpdate["data.attributes.fort.bonus"] = array.fort;
        // Set will save
        actorUpdate["data.attributes.will.bonus"] = array.will;
        // Set ability modifiers
        var attributes = ["cha", "con", "dex", "int", "str", "wis"];
        // We randomize which abilities are buffed
        Utils.shuffleArray(attributes);
        actorUpdate["data.abilities." + attributes[0] + ".mod"] = array.abilityMods[0];
        actorUpdate["data.abilities." + attributes[1] + ".mod"] = array.abilityMods[1];
        actorUpdate["data.abilities." + attributes[2] + ".mod"] = array.abilityMods[2];
        // Set initiative modifier (be dex modifier)
        actorUpdate["data.attributes.init.total"] = (_a = actorUpdate["data.abilities.dex.mod"]) !== null && _a !== void 0 ? _a : 0;
        // Update actor
        await actor.update(actorUpdate);
    }
    static async setGrafts(actor, context) {
        let actorUpdate = {};
        let race = context.options.race;
        await this.applyCreatureTypeGraft(actor, context, race.creatureTypeGraft);
        if (race.creatureSubtypeGraft) {
            await this.applyCreatureSubtypeGraft(actor, context, race.creatureSubtypeGraft);
            // Apply type in "<creature type>(<creature subtype>)" format
            actorUpdate["data.details.type"] = race.creatureTypeGraft + " (" + race.creatureSubtypeGraft + ")";
        }
        else {
            // Apply type in "<creature type>" format
            actorUpdate["data.details.type"] = race.creatureTypeGraft;
        }
        // Update actor
        await actor.update(actorUpdate);
    }
    static async applyCreatureTypeGraft(actor, context, graft) {
        let actorUpdate = {};
        if (graft === Grafts.Grafts.creatureType.humanoid) {
            // Applies a +2 to a random saving throw
            var saves = ["reflex", "fort", "will"];
            Utils.shuffleArray(saves);
            let save = saves[0];
            actorUpdate["data.attributes." + save + ".bonus"] = actor.data.data.attributes[save].value + 2;
        }
        else if (graft === Grafts.Grafts.creatureType.monstrousHumanoid) {
            // Applies a +2 to reflex & will
            // TODO: +1 to all attacks
            actorUpdate["data.attributes.reflex.bonus"] = actor.data.data.attributes.reflex.value + 2;
            actorUpdate["data.attributes.will.bonus"] = actor.data.data.attributes.will.value + 2;
            // Set traits
            actorUpdate["data.traits.senses"] = "darkvision 60 ft.";
        }
        actorUpdate["data.details.raceAndGrafts"] = actor.data.data.details.raceAndGrafts + " " + graft;
        // Update actor
        await actor.update(actorUpdate);
    }
    static async applyCreatureSubtypeGraft(actor, context, graft) {
        let actorUpdate = {};
        // Set as 1 per day
        function addOncePerDayInnateSpell(spell) {
            spell.data.uses.value = 1;
            spell.data.uses.max = 1;
            spell.data.uses.per = "day";
            spell.data.preparation.mode = "innate";
            context.itemsToAdd.push(spell);
        }
        function addAtWillInnateSpell(spell) {
            spell.data.preparation.mode = "innate";
            context.itemsToAdd.push(spell);
        }
        if (graft === Grafts.Grafts.creatureSubtype.android) {
            //Senses
            actorUpdate["data.traits.senses"] = "darkvision 60 ft.; low-light vision";
        }
        else if (graft === Grafts.Grafts.creatureSubtype.dwarf) {
            //Senses
            actorUpdate["data.traits.senses"] = "darkvision 60 ft.";
        }
        else if (graft === Grafts.Grafts.creatureSubtype.gnome) {
            //Senses
            actorUpdate["data.traits.senses"] = "low-light vision";
            // Gnome magic once per day innate spells
            let dancingLights = await Utils.fuzzyFindSpellAsync("dancing lights");
            let ghostSound = await Utils.fuzzyFindSpellAsync("ghost sound");
            let tokenSpell = await Utils.fuzzyFindSpellAsync("token spell");
            addOncePerDayInnateSpell(dancingLights);
            addOncePerDayInnateSpell(ghostSound);
            addOncePerDayInnateSpell(tokenSpell);
            // Culture as a master skill
            context.masterSkill.push("cul");
        }
        else if (graft === Grafts.Grafts.creatureSubtype.halfling) {
            // Perception and Stealth as master skills
            context.masterSkill.push("ste");
            context.masterSkill.push("per");
            // Athletics and Acrobatics as good skills
            context.goodSkill.push("acr");
            context.goodSkill.push("ath");
        }
        else if (graft === Grafts.Grafts.creatureSubtype.human) {
            // Nothing applied
        }
        else if (graft === Grafts.Grafts.creatureSubtype.kasatha) {
            // Acrobatics and Athletics master skills
            context.masterSkill.push("acr");
            context.masterSkill.push("ath");
            // culture as good skills
            context.goodSkill.push("cul");
        }
        else if (graft === Grafts.Grafts.creatureSubtype.lashunta) {
            // Languages
            actorUpdate["data.traits.languages.custom"] = "limited telepathy 30 ft.";
            // Innate spells
            let detectThoughts = await Utils.fuzzyFindSpellAsync("detect thoughts");
            let daze = await Utils.fuzzyFindSpellAsync("daze");
            let psychokineticHand = await Utils.fuzzyFindSpellAsync("psychokinetic hand");
            addOncePerDayInnateSpell(detectThoughts);
            addAtWillInnateSpell(daze);
            addAtWillInnateSpell(psychokineticHand);
        }
        else if (graft === Grafts.Grafts.creatureSubtype.shirren) {
            // Languages
            actorUpdate["data.traits.languages.custom"] = "limited telepathy 30 ft.";
            // Culture and Diplomacy as good skills
            context.goodSkill.push("cul");
            context.goodSkill.push("dip");
        }
        else if (graft === Grafts.Grafts.creatureSubtype.skittermander) {
            // Nothing applied
        }
        else if (graft === Grafts.Grafts.creatureSubtype.vesk) {
            //Senses
            actorUpdate["data.traits.senses"] = "low-light vision";
            context.hasNaturalWeapons = true;
        }
        else if (graft === Grafts.Grafts.creatureSubtype.ysoki) {
            //Senses
            actorUpdate["data.traits.senses"] = "darkvision 60 ft.";
            // Engineering and stealth as master skills
            context.masterSkill.push("eng");
            context.masterSkill.push("ste");
            // Survival as good skill
            context.goodSkill.push("sur");
        }
        // Append subtype graft to graft list
        actorUpdate["data.details.raceAndGrafts"] = actor.data.data.details.raceAndGrafts + ", " + graft;
        // Update actor
        await actor.update(actorUpdate);
    }
    static async setSkills(actor, context) {
        let array = context.arrays.main;
        let actorUpdate = {};
        // All skills minus perception (always a `good` skill, and profession)
        // TODO: Support profession skills
        var skillsToBuff = ["acr", "ath", "blu", "com", "cul", "dip", "dis", "eng", "int", "lsc", "med", "mys", "phs", "pil", "sen", "sle", "ste", "sur"];
        // Remove any skills we are buffing due to grafts
        skillsToBuff = skillsToBuff.filter(function (skill) {
            return !context.masterSkill.includes(skill) && !context.goodSkill.includes(skill);
        });
        Utils.shuffleArray(skillsToBuff);
        // Apply good skill mod to perception
        actorUpdate["data.skills.per.mod"] = array.goodSkill.mod;
        actorUpdate["data.skills.per.enabled"] = true;
        // NOTE: We do this step after the above buff to perception as some grafts make perception a master skill and
        // we want that to override the above in that case.
        // Apply fixed master/good skills (from grafts)
        for (let masterSkill of context.masterSkill) {
            actorUpdate["data.skills." + masterSkill + ".mod"] = array.masterSkill.mod;
            actorUpdate["data.skills." + masterSkill + ".enabled"] = true;
        }
        for (let goodSkill of context.goodSkill) {
            actorUpdate["data.skills." + goodSkill + ".mod"] = array.goodSkill.mod;
            actorUpdate["data.skills." + goodSkill + ".enabled"] = true;
        }
        // Apply master / good skill mod to random skills (from an array of skills missing graft skills + perception)
        var skillIndex = 0; // Used to track progress through array of skills
        // Apply mod to master skills
        for (let i = 0; i < array.masterSkill.count; i++) {
            let skill = skillsToBuff[skillIndex];
            actorUpdate["data.skills." + skill + ".mod"] = array.masterSkill.mod;
            actorUpdate["data.skills." + skill + ".enabled"] = true;
            skillIndex++;
        }
        // Apply mod to good skills
        for (let i = 0; i < array.goodSkill.count; i++) {
            let skill = skillsToBuff[skillIndex];
            actorUpdate["data.skills." + skill + ".mod"] = array.goodSkill.mod;
            actorUpdate["data.skills." + skill + ".enabled"] = true;
            skillIndex++;
        }
        // Update actor
        await actor.update(actorUpdate);
    }
    static async setWeapons(actor, context) {
        let attackArray = context.arrays.attack;
        let highAttackBonus = attackArray.high;
        // Add natural weapons or generic unarmed strike
        if (context.hasNaturalWeapons === true) {
            let naturalWeapons = WeaponFactory.makeNaturalWeapons();
            naturalWeapons.data.attackBonus = highAttackBonus;
            naturalWeapons.data.damage = {
                "parts": [
                    [
                        attackArray.standard,
                        "bludgeoning"
                    ]
                ]
            };
            // TODO: If CR3+ add 1.5x (rounded down) to damage
            context.itemsToAdd.push(naturalWeapons);
        }
        else {
            // All NPCs have unarmed strike unless they are equiped with natural weapons
            let unarmedStrike = WeaponFactory.makeUnarmedStrike();
            unarmedStrike.data.attackBonus = highAttackBonus;
            context.itemsToAdd.push(unarmedStrike);
        }
    }
    static async setInventory(actor, context) {
        let items = ItemFactory.makeItemCollection();
        context.itemsToAdd.push(...items);
    }
    static async clean(item) {
        if (item["_id"]) {
            item["sourceId"] = item["_id"];
            delete item["_id"];
        }
    }
}
//# sourceMappingURL=NPCFactory.js.map