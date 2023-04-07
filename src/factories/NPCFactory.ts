import { Utils } from "../utils/Uils.js"
import { Grafts } from "../data/Grafts.js"
import { ItemFactory } from "./ItemFactory.js"
import {
    MonsterCreation,
    MonsterReferenceSymbol,
    MonsterSkillType
} from "../data/MonsterCreation.js"
import { BundledRaces, Races } from "../data/Races.js"
import { Randomizer } from "../Randomizer.js"
import { WeaponFactory } from "./WeaponFactory.js"
import CreatureTypeGraft from "../models/CreatureTypeGraft.js"
import CreatureSubtypeGraft from "../models/CreatureSubtypeGraft.js"
import NPCCreationContext, {
    isNPCCreationContext
} from "../models/NPCCreationContext.js"
import Race from "../models/Race.js"
import { BiographyFactory } from "./BiographyFactory.js"
import UniversalCreatureRule from "../models/UniversalCreatureRule.js"
import { CreatureTypeGenerationOptions } from "../data/Generator.js"
import { UniversalCreatureRules } from "../data/universal creature rules/UniversalCreatureRules.js"
import SkillAdjuster from "../models/adjusters/SkillAdjuster.js"
import { Skill } from "../data/Skills.js"
import SenseAdjuster from "../models/adjusters/SenseAdjuster.js"
import { apply, ApplyOutput } from "../models/Interfaces/IApplyable.js"
import { SharedAdjusters } from "../data/adjusters/SharedAdjusters.js"
import SaveAdjuster from "../models/adjusters/SaveAdjuster.js"
import AbilityScoreAdjuster from "../models/adjusters/AbilityScoreAdjuster.js"
import { AbilityScore } from "../data/AbilityScores.js"
import NPCMutationContext from "../models/NPCMutationContext.js"
import MutationAdjuster from "../models/adjusters/MutationAdjuster.js"
import { INPCData } from "../models/Interfaces/actors/INPCData.js"
import { IContext } from "../models/Interfaces/IContext.js"
import { Size } from "../data/Sizes.js"
import { Save } from "../data/Saves.js"
import { CR } from "../data/CRs.js"

export class NPCFactory {
    // Produces a non-hostile NPC from a subset of races
    public static async makeNonHostile(context: NPCCreationContext) {
        await this.makeNPC(context)
    }

    // Produces a hostile NPC from a subset of creature types / subtypes
    public static async makeHostile(context: NPCCreationContext) {
        // If no type set we randomly generate
        if (!context.creatureTypeGraft) {
            // Randomizes creature type
            let supportedMonsterTypes = CreatureTypeGenerationOptions
            Utils.shuffleArray(supportedMonsterTypes)
            context.creatureTypeGraft = supportedMonsterTypes[0].typeGraft
        }

        // Default to combatant if none chosen
        context.monsterReferenceSymbol = context.monsterReferenceSymbol ? context.monsterReferenceSymbol : MonsterReferenceSymbol.combatant

        // TODO: Pick a random subtype (or none)

        // We don't generate "junk" items for monsters
        context.generateAdditionalItems = false
        // Monsters generally don't have personalities
        context.generatePersonality = false

        await this.makeNPC(context)
    }

    // Attempts to increase the CR of an existing NPC by applying the net new abilities and stats unlocked
    // between it's current CR and target CR
    public static async mutate(
        actor: Actor<INPCData>,
        context: NPCMutationContext
    ) {
        // Clone existing monster
        var newActor = (await Actor.create(actor.toJSON())) as Actor<INPCData>

        const output: ApplyOutput = await apply(
            newActor,
            context,
            new MutationAdjuster()
        )

        context.log.push(...output)
        await this.setAbout(newActor, context)
    }

    // Private
    private static async makeNPC(
        context: NPCCreationContext
    ) {
        //Generate the actor
        let actorData = {
            name: "Generated Actor",
            type: "npc2",
            folder: context.folderId
        }
        let actor = (await Actor.create(actorData)) as Actor<INPCData>

        // Fill in details
        await this.setArray(actor, context)
        await this.setRace(actor, context)        
        await this.setGenderAndName(actor, context)
        await this.setDetails(actor, context)
        await this.setGrafts(actor, context)
        //#TODO set template grafts
        await this.setSpecialAbilities(actor, context)
        await this.setAttributes(actor, context)
        await this.setVulnerabilitiesAndImmunities(actor, context)
        await this.setSkills(actor, context)
        await this.setWeapons(actor, context)
        await this.setInventory(actor, context)
        await this.setSenses(actor, context)
        await this.setToken(actor, context)
        await this.setAbout(actor, context)
    }
    private static async setArray(actor: Actor<INPCData, Item<{}>>, context: NPCCreationContext) {
        let logEntries: [string, string][] = []

        if (context.monsterReferenceSymbol) {
            // Grab appropriate array rows
            let monsterReferenceSymbol =
            MonsterReferenceSymbol[context.monsterReferenceSymbol]

            //DeepCopy the monster stats
            let mainArrayRow = JSON.parse(JSON.stringify(MonsterCreation.arrays[monsterReferenceSymbol].main[context.CR]));
            let attackArrayRow = JSON.parse(JSON.stringify(MonsterCreation.arrays[monsterReferenceSymbol].attack[context.CR]));

            context.mainArrayRow = mainArrayRow
            context.attackArrayRow = attackArrayRow
            
            logEntries.push([monsterReferenceSymbol + " Array selected with CR: " + context.CR, ""])
        } else {
            logEntries.push(["Failed to set Array.", ""])
        }

        // Update log
        context.log.push(...logEntries)
    }

    private static async setRace(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        let logEntries: [string, string][] = []

        if (context.race) {
            if (context.race === "random") {
                let randomRace = Randomizer.randomRace(context.npcLocation)
                context.race = randomRace.name
                logEntries.push([
                    "Chose race " + randomRace.name + " at random using " + context.npcLocation + " distribution",
                    ""
                ])
            } else {
                logEntries.push(["Race " + context.race + " chosen.", ""])
            }
    
            // Set grafts for race
            let race = Races.nonCombatantRaces[context.race]
            context.creatureTypeGraft = race.creatureTypeGraft
            context.creatureSubtypeGrafts = race.creatureSubtypeGrafts
    
            var raceData
            // We stub in gnolls until they are included in sfrpg
            if (context.race == "gnoll") {
                raceData = BundledRaces.gnoll
            } else {
                raceData = await Utils.fuzzyFindRaceAsync(race.name)
            }
    
            // Race item
            // #TODO what was the point of this? Just crashes now.
            // await this.clean(raceData)
            context.itemsToAdd.push(raceData)
        } else {
            logEntries.push(["No Race applied.", ""])
        }


        // Update log
        context.log.push(...logEntries)
    }

    private static async setGenderAndName(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        let actorUpdate = {}
        let logEntries: [string, string][] = []
        // Settings
        const includeNonBinary = game.settings.get("sfrpg-populator","includeNonBinary") === "true";

        // Gender
        if (!context.gender) {
            let randomGender = Randomizer.randomGender(includeNonBinary ? 'nonBinary': undefined)
            context.gender = randomGender
            logEntries.push([
                "Chose gender " + randomGender + " at random.",
                ""
            ])
        } else {
            logEntries.push(["Gender " + context.gender + " chosen.", ""])
        }

        // Race and Grafts label
        let raceText = context.race
            ? " " + Races.nonCombatantRaces[context.race].name
            : ""
        actorUpdate["data.details.raceAndGrafts"] =
            context.gender + raceText + ", grafts:" // Grafts will be filled in as applied

        // Name
        let randomName = Randomizer.randomName(context)
        actorUpdate["name"] = randomName
        context.name = randomName
        logEntries.push([" Generated name " + randomName + " at random.", ""])

        // Update actor
        await actor.update(actorUpdate)

        // Update log
        context.log.push(...logEntries)
    }

    private static async setDetails(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        let logEntries: [string, string][] = []
        var race: Race | undefined
        if (context.race) race = Races.nonCombatantRaces[context.race]
        let actorUpdate = {}

        // Source
        actorUpdate["data.details.source"] = "Populator"

        // CR
        var CR: number
        if (context.CR === "1/3") {
            CR = 1 / 3
        } else if (context.CR === "1/2") {
            CR = 0.5
        } else {
            CR = parseFloat(context.CR)
        }
        actorUpdate["data.details.cr"] = CR

        // Alignment
        let randomAlignment = Randomizer.randomAlignment()
        actorUpdate["data.details.alignment"] = randomAlignment
        logEntries.push([
            "Chose alignment " + randomAlignment + " at random.",
            ""
        ])

        // Languages
        // NOTE: Only applies languages if this creature type has the intelligence capacity for language
        if (context.creatureTypeGraft?.capicityForLanguage) {
            var languages = ["common"]
            if (race?.languages) {
                languages.push(...race.languages)
            }

            actorUpdate["data.traits.languages.value"] = languages
        }

        // Update actor
        await actor.update(actorUpdate)

        // Update log
        context.log.push(...logEntries)
    }

    private static async setGrafts(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        if (!context.creatureTypeGraft) return
        let logEntries: [string, string][] = []
        let actorUpdate = {}

        try {
            await this.applyCreatureTypeGraft(
                actor,
                context,
                context.creatureTypeGraft
            )

            if (context.creatureSubtypeGrafts) {
                let subtypes: string[] = []
                for (let creatureSubtypeGraft of context.creatureSubtypeGrafts) {
                    // Adds subtypes to an array to construct type
                    subtypes.push(creatureSubtypeGraft.name)

                    await this.applyCreatureSubtypeGraft(
                        actor,
                        context,
                        creatureSubtypeGraft
                    )
                }

                // Apply type in "<creature type>(<creature subtype>)" format
                actorUpdate["data.details.type"] =
                    context.creatureTypeGraft.name +
                    " (" +
                    subtypes.join() +
                    ")"

                logEntries.push([
                    "Set type based on <u>" +
                        context.creatureTypeGraft.name +
                        "</u> creature type graft, <u>" +
                        subtypes.join() +
                        "</u> subtype grafts.",
                    ""
                ])
            } else {
                // Apply type in "<creature type>" format
                actorUpdate["data.details.type"] =
                    context.creatureTypeGraft.name
                logEntries.push([
                    "Set type based on <u>" +
                        context.creatureTypeGraft.name +
                        "</u> creature type graft.",
                    ""
                ])
            }

            // Update actor
            await actor.update(actorUpdate)
        } catch (e) {
            logEntries.push([
                "Failed to set grafts.",
                "<font color='red'>Exception:" + e + "</font>"
            ])
        }

        // Update log
        context.log.push(...logEntries)
    }

    private static async setSpecialAbilities(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        // Update log
        context.log.push([
            "Applying " +
                context.mainArrayRow.specialAbilities +
                " special abilities.",
            ""
        ])

        try {
            var amountOfSpecialAbilities = context.mainArrayRow.specialAbilities

            // First we check for chosen universal creature rules (specifically natural weapons or integrated weapons)
            // TODO: Expand to other universal creature rules
            if (
                context.universalCreatureRules.includes(
                    MonsterCreation.specialAbilities.universalCreatureRule
                        .naturalWeapons
                )
            ) {
                // Flag that we'll generate a `bite` / `slam` / `claws` attack
                context.naturalWeapons.enabled = true
                context.naturalWeapons.racial = false
                // This takes up one of our special abilities, reduce by 1
                amountOfSpecialAbilities -= 1

                context.log.push([
                    "Applying <u>Natural Weapons (Ex)</u> special abilities as chosen. <b>NOTE: Populator will auto-choose Natural Weapons as the 1st special ability of any monster which doesn't have gear and weapons to attack with.</b>",
                    UniversalCreatureRules.naturalWeapons.description
                ])
            }
            //
            if (
                context.universalCreatureRules.includes(
                    MonsterCreation.specialAbilities.universalCreatureRule
                        .integratedWeapons
                )
            ) {
                // Add integrated weapons feature
                let integratedWeapons = await Utils.fuzzyFindUniversalCreatureRule(
                    "integrated weapons"
                )
                context.itemsToAdd.push(integratedWeapons)

                // Set flag to add a weapon during item generation
                context.rangedWeapon.enabled = true

                // This takes up one of our special abilities, reduce by 1
                amountOfSpecialAbilities -= 1

                context.log.push([
                    "Applying <u>Integrated Weapons (Ex)</u> universal creature rule as a special abilities as chosen. <b>NOTE: Populator will auto-choose Integrated Weapons as the 1st special ability of any <bold>construct</bold> type monster.</b>",
                    UniversalCreatureRules.integratedWeapons.description
                ])
            }

            //#TODO do we want to add feats? Maybe create a list of expert vs combat feats with random chance to add one
            var amountOfFeats = context.feats.length
            if (
                amountOfFeats > 0
            ) {
                for (var i = 0; i < amountOfFeats && i < amountOfSpecialAbilities; i++) {
                    let feat = await Utils.fuzzyFindUniversalCreatureRule(
                        context.feats[i]
                    )
                    if (feat){
                        context.itemsToAdd.push(feat)

                        // This takes up one of our special abilities, reduce by 1
                        amountOfSpecialAbilities -= 1
    
                        context.log.push([
                            "Applying <u>Feats </u> Populator applies a feat from a list of appropriate feats based on the array type</b>", context.feats[i]
                        ])
                    }
                }
            }

            // NOTE: Currently chooses 1+ Adjustment Special Abilities
            let adjustmentSpecialAbilities: any[] = Object.values(
                MonsterCreation.specialAbilities.adjustment
            )
            Utils.shuffleArray(adjustmentSpecialAbilities)

            // We apply 1+ special abilities
            for (var i = 0; i < amountOfSpecialAbilities; i++) {
                // get special ability
                let adjustmentSpecialAbility = adjustmentSpecialAbilities[i]
                // Apply special ability
                await this.applyAdjustmentSpecialAbility(
                    actor,
                    context,
                    adjustmentSpecialAbility
                )
            }
        } catch (e) {
            context.log.push([
                "Failed to set special abilities.",
                "<font color='red'>Exception:" + e + "</font>"
            ])
        }
    }

    private static async setAttributes(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        let logEntries: [string, string][] = []
        var race: Race | undefined
        if (context.race) race = Races.nonCombatantRaces[context.race]
        let array = context.mainArrayRow
        let actorUpdate = {}

        // Size
        actorUpdate["data.traits.size"] = race?.size
            ? Size[race.size]
            : Size[Size.medium] // We default to medium size

        // Hands
        if (race?.arms != undefined) {
            actorUpdate["data.attributes.arms"] = race.arms
        }

        // Reach
        // TODO: Reach should be decided by grafts
        actorUpdate["data.attributes.reach"] = 5

        // Set HP
        actorUpdate["data.attributes.hp.value"] = array.HP
        actorUpdate["data.attributes.hp.max"] = array.HP

        // Set SP (should be 0)
        actorUpdate["data.attributes.sp.max"] = 0

        // Set RP (should be 0)
        //#TODO add RP = CR /5 + 3 if NPC has RP special ability
        actorUpdate["data.attributes.rp.max"] = 0

        // Set KAC
        actorUpdate["data.attributes.kac.value"] = array.KAC
        actorUpdate["data.attributes.kac.base"] = array.KAC

        // Set EAC
        actorUpdate["data.attributes.eac.value"] = array.EAC
        actorUpdate["data.attributes.eac.base"] = array.EAC

        // Set reflex save
        actorUpdate["data.attributes.reflex.bonus"] = array.reflex
        actorUpdate["data.attributes.reflex.base"] = array.reflex

        // Set fort save
        actorUpdate["data.attributes.fort.bonus"] = array.fort
        actorUpdate["data.attributes.fort.base"] = array.fort

        // Set will save
        actorUpdate["data.attributes.will.bonus"] = array.will
        actorUpdate["data.attributes.will.base"] = array.will

        // Set ability modifiers
        // all abilities
        var abilities = ["cha", "con", "dex", "int", "str", "wis"]
        // First set hard-coded ability modifiers from grafts or special abilities
        for (let ability of context.abilities) {
            let i = abilities.indexOf(ability[0])
            // Remove from our array of abilities to randomly improve
            if (i) {
                actorUpdate["data.abilities." + ability[0] + ".mod"] =
                    ability[1]
                actorUpdate["data.abilities." + ability[0] + ".base"] =
                    ability[1]                    
                abilities.splice(i, 1)
                logEntries.push([
                    "Increased <u>" +
                        ability[0] +
                        "</u> ability by " +
                        ability[1] +
                        " as dictated by graft/special ability.",
                    ""
                ])
            }
        }

        // We randomize which abilities are buffed
        //#TODO the abilities we buff should probably be weighted towards certain abilities determined by the array. 
        //Combantant at least two in STR/DEX/CON
        //Experts are mechants advisors envoys mechanics and operatives so probably at least two in INT/CHA/WIS/DEX
        //Spellcaster obviously needs its highest in the appropriate spellcasting ability
        Utils.shuffleArray(abilities)

        actorUpdate["data.abilities." + abilities[0] + ".mod"] =
            array.abilityMods[0]
        actorUpdate["data.abilities." + abilities[1] + ".mod"] =
            array.abilityMods[1]
        actorUpdate["data.abilities." + abilities[2] + ".mod"] =
            array.abilityMods[2]
        actorUpdate["data.abilities." + abilities[0] + ".base"] =
            array.abilityMods[0]
        actorUpdate["data.abilities." + abilities[1] + ".base"] =
            array.abilityMods[1]
        actorUpdate["data.abilities." + abilities[2] + ".base"] =
            array.abilityMods[2]            

        logEntries.push([
            "Increased <u>" +
                abilities[0] +
                "</u> ability (chosen randomly) by " +
                array.abilityMods[0] +
                " as dictated by array.",
            ""
        ])
        logEntries.push([
            "Increased <u>" +
                abilities[1] +
                "</u> ability (chosen randomly) by " +
                array.abilityMods[1] +
                " as dictated by array.",
            ""
        ])
        logEntries.push([
            "Increased <u>" +
                abilities[2] +
                "</u> ability (chosen randomly) by " +
                array.abilityMods[2] +
                " as dictated by array.",
            ""
        ])

        // Set initiative modifier (be dex modifier)
        let initiative = actorUpdate["data.abilities.dex.mod"] ?? 0
        actorUpdate["data.attributes.init.value"] = initiative
        logEntries.push([
            "Set <u>initiative</u> as " +
                initiative +
                " to match dex modifier (if no dex modifier defaults to <b>0</b>).",
            "Unless you increase it with the Improved Initiative feat, a graft, or an ad hoc adjustment, the NPC’s\n" +
                "initiative bonus is equal to its Dexterity modifier."
        ])

        // Update actor
        await actor.update(actorUpdate)

        // Update log
        context.log.push(...logEntries)
    }

    private static async setVulnerabilitiesAndImmunities(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        let logEntries: [string, string][] = []
        let actorUpdate = {}

        actorUpdate["data.traits.ci.custom"] = context.conditionImmunities.join(
            ";"
        )

        //#TODO vulnerabilities?

        // Update actor
        await actor.update(actorUpdate)

        // Update log
        context.log.push(...logEntries)
    }

    private static async setSkills(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        let array = context.mainArrayRow
        let actorUpdate = {}

        // All skills minus perception (always a `good` skill, and profession)
        // TODO: Support profession skills
        var skillsToBuff = [
            "acr",
            "ath",
            "blu",
            "com",
            "cul",
            "dip",
            "dis",
            "eng",
            "int",
            "lsc",
            "med",
            "mys",
            "phs",
            "pil",
            "sen",
            "sle",
            "ste",
            "sur"
        ]

        // Remove any skills we are buffing due to grafts
        skillsToBuff = skillsToBuff.filter(function (skill) {
            return (
                !context.masterSkills.includes(skill) &&
                !context.goodSkills.includes(skill)
            )
        })

        Utils.shuffleArray(skillsToBuff)

        // Apply good skill mod to perception
        actorUpdate["data.skills.per.mod"] = array.goodSkill.mod
        actorUpdate["data.skills.per.ranks"] = array.goodSkill.mod
        actorUpdate["data.skills.per.enabled"] = true

        // NOTE: We do this step after the above buff to perception as some grafts make perception a master skill and
        // we want that to override the above in that case.
        // Apply fixed master/good skills (from grafts)
        for (let masterSkill of context.masterSkills) {
            actorUpdate["data.skills." + masterSkill + ".mod"] =
                array.masterSkill.mod
            actorUpdate["data.skills." + masterSkill + ".ranks"] =
                array.masterSkill.mod                
            actorUpdate["data.skills." + masterSkill + ".enabled"] = true
        }
        for (let goodSkill of context.goodSkills) {
            actorUpdate["data.skills." + goodSkill + ".mod"] =
                array.goodSkill.mod
            actorUpdate["data.skills." + goodSkill + ".ranks"] =
                array.goodSkill.mod
            actorUpdate["data.skills." + goodSkill + ".enabled"] = true
        }

        // Apply master / good skill mod to random skills (from an array of skills missing graft skills + perception)
        var skillIndex = 0 // Used to track progress through array of skills
        // Apply mod to master skills
        for (let i = 0; i < array.masterSkill.count && skillIndex < skillsToBuff.length; i++) {
            let skill = skillsToBuff[skillIndex];
			if (skill != undefined)
			{
				actorUpdate["data.skills." + skill + ".mod"] = array.masterSkill.mod;
				actorUpdate["data.skills." + skill + ".ranks"] = array.masterSkill.mod;
				actorUpdate["data.skills." + skill + ".enabled"] = true;
			}
            skillIndex++;
        }
		
        // Apply mod to good skills
        for (let i = 0; i < array.goodSkill.count && skillIndex < skillsToBuff.length; i++) {
            let skill = skillsToBuff[skillIndex];
			if (skill != undefined)
			{
				actorUpdate["data.skills." + skill + ".mod"] = array.goodSkill.mod;
				actorUpdate["data.skills." + skill + ".ranks"] = array.goodSkill.mod;
				actorUpdate["data.skills." + skill + ".enabled"] = true;
			}
            skillIndex++;
        }

        // Update actor
        await actor.update(actorUpdate)
    }

    private static async setWeapons(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {        
        let logEntries: [string, string][] = []

        if (context.monsterReferenceSymbol) {
            let arrays = MonsterCreation.arrays[MonsterReferenceSymbol[context.monsterReferenceSymbol]]
            let attackArray = arrays.attack[context.CR]
            let highAttackBonus = attackArray.high
            let lowAttackBonus = attackArray.low
    
            // Add natural weapons or generic unarmed strike
            if (context.naturalWeapons.enabled === true) {
                let naturalWeapons = WeaponFactory.makeNaturalWeapons()
    
                // Unlocked by the universal creature rule rather than a racial feature
                if (context.naturalWeapons.racial === false) {
                    naturalWeapons.name = "slam"
                    // TODO: bite, claw, or slam
                    // TODO: Different damage types depending on slam, bite or claw
                }
    
                naturalWeapons.system.attackBonus = highAttackBonus
                naturalWeapons.system.damage.parts = [{formula: attackArray.standard,types: { bludgeoning: true }}];
                context.itemsToAdd.push(naturalWeapons)
            } else if (MonsterReferenceSymbol[context.monsterReferenceSymbol] === "combatant") {
                // #TODO - add some random weapons and choose between melee and ranged depending on stats
                let laserPistol = await WeaponFactory.makeLaserPistol(context.CR)
                if (laserPistol) {
                    laserPistol.system.equipped = true
                    laserPistol.system.proficient = true // Should always be proficient with equipped weapons
                    laserPistol.system.ability = "" // Should not be modified by any ability
                    laserPistol.system.attackBonus = highAttackBonus
                    laserPistol.system.damage.parts =  [{formula: attackArray.energy,types: { fire: true }}];
                    context.itemsToAdd.push(laserPistol)
                }
            } else {
                // All NPCs have unarmed strike unless they are equipped with natural weapons
                let unarmedStrike = WeaponFactory.makeUnarmedStrike()
                // We use the low attack for built in unarmed strikes as they should never be the primary attack of a combatant
                unarmedStrike.system.attackBonus = lowAttackBonus
                context.itemsToAdd.push(unarmedStrike)
            }

            // Generate ranged weapons
            if (context.rangedWeapon.enabled) {
                let laserPistol = await WeaponFactory.makeLaserPistol(context.CR)
                if (laserPistol) {
                    laserPistol.system.equipped = true
                    laserPistol.system.proficient = true // Should always be proficient with equipped weapons
                    laserPistol.system.ability = "" // Should not be modified by any ability
                    laserPistol.system.attackBonus = highAttackBonus
                    laserPistol.system.damage.parts =  [{formula: attackArray.energy,types: { fire: true }}];
                    context.itemsToAdd.push(laserPistol)
                }
            }
            context.log.push(["Created weapons for " + MonsterReferenceSymbol[context.monsterReferenceSymbol], ""]);
        } else {
            context.log.push(["Failed to set Weapons.", ""]);
        }
        // Update log
        context.log.push(...logEntries)
    }

    private static async setInventory(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        if (context.generateAdditionalItems) {
            let items = ItemFactory.makeItemCollection()
            context.itemsToAdd.push(...items)
        }

        // Add all items
        let actorUpdate = {}
        actorUpdate["items"] = context.itemsToAdd
        await actor.update(actorUpdate)
    }

    private static async setToken(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {        
        let actorUpdate = {}
        actorUpdate["token.randomImg"] = false

        if (context.tokenOptions?.dynamicImage) {
            var path: string | undefined
            // Either set path as race + gender or creature type
            if (context.race){
                path = context.tokenOptions.dynamicImageRootLocation + context.race + "/" + context.gender + "/*"
            }
            else if (context.creatureTypeGraft){
                path = context.tokenOptions.dynamicImageRootLocation + context.creatureTypeGraft?.name + "/*"
            }
            if (path) {
                actorUpdate["token.img"] = path
                actorUpdate["token.randomImg"] = true
            }
        }

        actorUpdate["token.name"] = actor.name // Set token name to match actor name
        actorUpdate["token.actorLink"] = true
        actorUpdate["token.disposition"] = 0 // Neutral by default

        // Update actor
        await actor.update(actorUpdate);

        // Need to update the actor settings before actor.getTokenImages will function
        if (context.tokenOptions?.dynamicImage) {
            let images = await actor.getTokenImages();
            const image = images[Math.floor(Math.random() * images.length)];
            if (image) {
                actorUpdate["token.img"] = image;
                actorUpdate["img"] = image;
                actorUpdate["token.randomImg"] = false;
                await actor.update(actorUpdate);
            } else {
                context.log.push([
                    "Failed to set Image.",
                    "<font color='red'>Exception: Likely images not Found at " + path + "</font>"
                ]);
            }
        }
    }

    private static async setSenses(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ) {
        let actorUpdate = {}

        if (context.senses.length > 0) {
            actorUpdate["data.traits.senses"] = context.senses.join(", ")
        }

        await actor.update(actorUpdate)
    }

    private static async setAbout(actor: Actor<INPCData>, context: IContext) {
        let actorUpdate = {}

        // For creation flow we are creating a new NPC and need to generate a bio
        if (isNPCCreationContext(context)) {
            // biography
            var biography = BiographyFactory.makeBiography(actor, context)
            actorUpdate["data.details.biography.value"] = biography
        }

        // gm notes
        var gmNotes = ""
        for (let entry of context.log) {
            gmNotes += "<p>" + entry[0] + "</p>"

            if (entry[1] != "") {
                gmNotes += "<blockquote>" + entry[1] + "</blockquote>"
            }
        }

        actorUpdate["data.details.biography.gmNotes"] = gmNotes

        // Update actor
        await actor.update(actorUpdate)
    }

    private static async applyCreatureTypeGraft(
        actor: Actor<INPCData>,
        context: NPCCreationContext,
        graft: CreatureTypeGraft
    ) {
        let logEntries: [string, string][] = []
        let actorUpdate = {}

        if (graft === Grafts.creatureType.animal) {
            // Applies either a -4 or -5 (randomly) as intelligence score
            let intelligenceMods = [-4, -5]
            Utils.shuffleArray(intelligenceMods)

            let output = await apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.lowLightVision,
                // Applies a +2 to reflex & fortitude
                SharedAdjusters.Saves.reflexPlus2,
                SharedAdjusters.Saves.fortitudePlus2,
                // TODO: This has a chance of overwriting one of the randomly boosted ability scores, we should reassign the overwritten value to another stat
                new AbilityScoreAdjuster({
                    setAbilityScore: [
                        AbilityScore.intelligence,
                        intelligenceMods[0]
                    ]
                })
            )

            logEntries.push([
                "Applied <u>animal</u> type graft.",
                Grafts.creatureType.animal.description
            ])
            logEntries.push(...output)
        } else if (graft === Grafts.creatureType.construct) {
            const output: ApplyOutput = await apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.darkVision60ft,
                SharedAdjusters.Senses.lowLightVision,
                // Immunities
                SharedAdjusters.Immunities.constructImmunities,
                // Saves (-2 to all)
                SharedAdjusters.Saves.reflexMinus2,
                SharedAdjusters.Saves.willpowerMinus2,
                SharedAdjusters.Saves.fortitudeMinus2,
                // Abilities
                // NOTE: Should be no constitution but sfrpg doesn't yet support
                new AbilityScoreAdjuster({
                    setAbilityScore: [AbilityScore.constituion, 0]
                })
            )

            // Unliving
            await this.applyUniversalCreatureRule(
                actor,
                context,
                UniversalCreatureRules.unliving
            )

            // Attacks
            context.attackArrayRow.high += 1
            context.attackArrayRow.low += 1

            logEntries.push([
                "Applied <u>construct</u> type graft. +1 to all attacks, added unliving universal creature rule.",
                Grafts.creatureType.construct.description
            ])
            logEntries.push(...output)
        } else if (graft === Grafts.creatureType.humanoid) {
            // Applies a +2 to a random saving throw
            const saves = [Save.reflex, Save.fortitude, Save.willpower]
            Utils.shuffleArray(saves)
            let save = saves[0] // random save

            let output = await apply(
                actor,
                context,
                // Saves
                new SaveAdjuster({ mutateSave: [save, 2] })
            )

            logEntries.push([
                "Applied <u>humanoid</u> type graft.",
                Grafts.creatureType.humanoid.description
            ])
            logEntries.push(...output)
        } else if (graft === Grafts.creatureType.monstrousHumanoid) {
            await apply(
                actor,
                context,
                // Senses
                SharedAdjusters.Senses.darkVision60ft,
                // Applies a +2 to reflex & will
                SharedAdjusters.Saves.reflexPlus2,
                SharedAdjusters.Saves.willpowerPlus2
            )

            // Add +1 to all attacks
            context.attackArrayRow.high += 1
            context.attackArrayRow.low += 1

            logEntries.push([
                "Applied <u>monstrous humanoid</u> type graft. Added darkvision, +2 to reflex/will saves and +1 to all attacks.",
                Grafts.creatureType.monstrousHumanoid.description
            ])
        } else if (graft === Grafts.creatureType.ooze) {
            apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.blindsight,
                // Saves (+2 to fortitude save, -2 reflex save)
                SharedAdjusters.Saves.fortitudePlus2,
                SharedAdjusters.Saves.reflexMinus2,
                // Skills (No master or good skills, except perception which everything usually has)
                new SkillAdjuster({
                    setMonsterSkillCount: [MonsterSkillType.master, 0]
                }),
                new SkillAdjuster({
                    setMonsterSkillCount: [MonsterSkillType.good, 0]
                }),
                // Mindless - no intelligence
                // TODO: This has a chance of overwriting one of the randomly boosted ability scores, we should reassign the overwritten value to another stat
                new AbilityScoreAdjuster({
                    setAbilityScore: [AbilityScore.intelligence, 0]
                })
            )

            await this.applyUniversalCreatureRule(
                actor,
                context,
                UniversalCreatureRules.mindless
            )

            // Sightless
            await this.applyUniversalCreatureRule(
                actor,
                context,
                UniversalCreatureRules.sightless
            )

            logEntries.push([
                "Applied <u>ooze</u> type graft. Added blindsight, +2 to fort save, -2 to reflex save, set - as intelligence, added mindless and sightless universal creature rule, reduced good and master skills to 0 (except perception).",
                Grafts.creatureType.ooze.description
            ])
        } else if (graft === Grafts.creatureType.vermin) {
            await apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.darkVision60ft,
                // Saves (2 to fortitude saves)
                SharedAdjusters.Saves.fortitudePlus2
            )

            // Mindless, no intelligence
            // TODO: This has a chance of overwriting one of the randomly boosted ability scores, we should reassign the overwritten value to another stat
            context.abilities.push(["int", 0])

            await this.applyUniversalCreatureRule(
                actor,
                context,
                UniversalCreatureRules.mindless
            )

            logEntries.push([
                "Applied <u>vermin</u> type graft. Added darkvision, +2 to fort save, set - as intelligence, added mindless universal creature rule.",
                Grafts.creatureType.vermin.description
            ])
        }

        actorUpdate["data.details.raceAndGrafts"] =
            actor.data.data.details.raceAndGrafts + " " + graft.name

        // Update actor
        await actor.update(actorUpdate)

        // Update log
        context.log.push(...logEntries)
    }

    private static async applyCreatureSubtypeGraft(
        actor: Actor<INPCData>,
        context: NPCCreationContext,
        graft: CreatureSubtypeGraft
    ) {
        let logEntries: [string, string][] = []
        let actorUpdate = {}

        // Set as 1 per day
        function addOncePerDayInnateSpell(spell) {
            spell.system.uses.value = 1
            spell.system.uses.max = 1
            spell.system.uses.per = "day"
            spell.system.preparation.mode = "innate"
            context.itemsToAdd.push(spell)
        }

        function addAtWillInnateSpell(spell) {
            spell.system.preparation.mode = "innate"
            context.itemsToAdd.push(spell)
        }

        if (graft === Grafts.creatureSubtype.android) {
            //Senses
            await apply(
                actor,
                context,
                SharedAdjusters.Senses.darkVision60ft,
                SharedAdjusters.Senses.lowLightVision
            )

            logEntries.push([
                "Applied <u>android</u> subtype graft. Added darkvision 60ft. and low-light vision.",
                Grafts.creatureSubtype.android.description
            ])
        } else if (graft === Grafts.creatureSubtype.dwarf) {
            //Senses
            await apply(actor, context, SharedAdjusters.Senses.darkVision60ft)

            logEntries.push([
                "Applied <u>dwarf</u> subtype graft. Added darkvision 60ft.",
                Grafts.creatureSubtype.dwarf.description
            ])
        } else if (graft === Grafts.creatureSubtype.elf) {
            // Elves can be `drow`, `elven` or `half-elven` race
            // All elves:
            await new SkillAdjuster({
                // Perception as a master skill
                setSkillAsMonsterSkill: [
                    Skill.perception,
                    MonsterSkillType.master
                ]
            }).apply(actor, context)

            if (context.race == "elf") {
                await apply(
                    actor,
                    context,
                    // Senses
                    SharedAdjusters.Senses.lowLightVision,
                    // Mysticism as a master skill
                    new SkillAdjuster({
                        setSkillAsMonsterSkill: [
                            Skill.mysticism,
                            MonsterSkillType.master
                        ]
                    }),
                    // Add immunities
                    SharedAdjusters.Immunities.elvenImmunities
                )

                logEntries.push([
                    "Applied <u>elf</u> subtype graft. <u>elf</u> race selected so added elven immunities, and mysticism as a master skill.",
                    Grafts.creatureSubtype.elf.description
                ])
            }
            if (context.race == "drow") {
                await apply(
                    actor,
                    context,
                    //Senses
                    SharedAdjusters.Senses.darkVision60ft, // Replaces low-light vision
                    // Add immunities
                    SharedAdjusters.Immunities.drowImmunities
                )
                // Drow magic at will innate spells
                let dancingLights = await Utils.fuzzyFindSpellAsync(
                    "dancing lights"
                )
                let detectMagic = await Utils.fuzzyFindSpellAsync(
                    "detect magic"
                )
                addAtWillInnateSpell(dancingLights)
                addAtWillInnateSpell(detectMagic)

                logEntries.push([
                    "Applied <u>elf</u> subtype graft. <u>drow</u> race selected so added darkvision 60ft., perception as a master skill, dacing lights and detect magic as innate spells, added drow immunities.",
                    Grafts.creatureSubtype.elf.description
                ])
            } else if (context.race == "halfElf") {
                await apply(
                    actor,
                    context,
                    SharedAdjusters.Senses.lowLightVision
                )

                // Half-elves gain an extra good skill
                context.mainArrayRow.goodSkill.count += 1
                logEntries.push([
                    "Applied <u>elf</u> subtype graft. <u>half-elf</u> race selected so added low-light vision, perception as a master skill, and one additional good skill.",
                    Grafts.creatureSubtype.elf.description
                ])
            }
        } else if (graft === Grafts.creatureSubtype.gnoll) {
            // Senses
            await apply(
                actor,
                context,
                SharedAdjusters.Senses.darkVision60ft,
                new SenseAdjuster({ addSense: ["blindsense (scent) 30 ft."] }),
                // Survival as a master skill
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        Skill.survival,
                        MonsterSkillType.master
                    ]
                })
            )

            // Natural weapons
            context.naturalWeapons.enabled = true
            context.naturalWeapons.racial = true

            logEntries.push([
                "Applied <u>gnoll</u> subtype graft. Added blindsense (scent) 30 ft., darkvision 60ft., natural weapons, survival as a master skill.",
                Grafts.creatureSubtype.gnoll.description
            ])
        } else if (graft === Grafts.creatureSubtype.halfling) {
            await apply(
                actor,
                context,
                // Perception and Stealth as master skills
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        Skill.stealth,
                        MonsterSkillType.master
                    ]
                }),
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        Skill.perception,
                        MonsterSkillType.master
                    ]
                }),
                // Athletics and Acrobatics as good skills
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        Skill.acrobatics,
                        MonsterSkillType.good
                    ]
                }),
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        Skill.athletics,
                        MonsterSkillType.good
                    ]
                })
            )

            logEntries.push([
                "Applied <u>halfing</u> subtype graft. Added perception and stealth as master skills and acrobatics and athletics as good skills.",
                Grafts.creatureSubtype.halfling.description
            ])
        } else if (graft === Grafts.creatureSubtype.human) {
            if (context.race == Races.nonCombatantRaces.human.name) {
                context.mainArrayRow.specialAbilities += 1
                context.mainArrayRow.goodSkill.count += 1

                logEntries.push([
                    "Applied <u>human</u> subtype graft. Added an additional special ability and an additional good skill.",
                    Grafts.creatureSubtype.human.description
                ])
            }
            // For half-elf, half-orc, etc
            else {
                logEntries.push([
                    "Applied <u>human</u> subtype graft (no modifications).",
                    Grafts.creatureSubtype.human.description
                ])
            }
        } else if (graft === Grafts.creatureSubtype.gnome) {
            await apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.lowLightVision,
                // Culture as a master skill
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        Skill.culture,
                        MonsterSkillType.master
                    ]
                })
            )

            // Gnome magic once per day innate spells
            let dancingLights = await Utils.fuzzyFindSpellAsync(
                "dancing lights"
            )
            let ghostSound = await Utils.fuzzyFindSpellAsync("ghost sound")
            let tokenSpell = await Utils.fuzzyFindSpellAsync("token spell")
            addOncePerDayInnateSpell(dancingLights)
            addOncePerDayInnateSpell(ghostSound)
            addOncePerDayInnateSpell(tokenSpell)

            logEntries.push([
                "Applied <u>gnome</u> subtype graft. Added dancing lights, ghost sound, and token spell as once-per-day innate spells and added culture as a master skill.",
                Grafts.creatureSubtype.gnome.description
            ])
        } else if (graft === Grafts.creatureSubtype.goblinoid) {
            // NOTE: AA1 has a different definition of the goblinoid subtype, should handle either
            // TODO: Check if space goblin, hobgoblin or kanabo
            // NOTE: For now we assume hobgoblin
            await apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.darkVision60ft,
                // Intimidate and stealth as a master skill
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        [Skill.intimidate, Skill.stealth],
                        MonsterSkillType.master
                    ]
                })
            )
        } else if (graft === Grafts.creatureSubtype.orc) {
            // TODO: Check if race is half-orc, and only then apply
            await apply(
                actor,
                context,
                // Senses
                SharedAdjusters.Senses.darkVision60ft,
                // Intimidate and Survival are master skills
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        [Skill.intimidate, Skill.survival],
                        MonsterSkillType.master
                    ]
                })
            )

            logEntries.push([
                "Applied <u>orc</u> subtype graft. Added darkvision 60 ft and intimidate and survival as master skills.",
                Grafts.creatureSubtype.orc.description
            ])
        } else if (graft === Grafts.creatureSubtype.kasatha) {
            // Acrobatics and Athletics master skills
            await apply(
                actor,
                context,
                // Acrobatics and Athletics are master skills
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        [Skill.acrobatics, Skill.athletics],
                        MonsterSkillType.master
                    ]
                }),
                // Culture is a good skill
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        [Skill.culture],
                        MonsterSkillType.good
                    ]
                })
            )

            logEntries.push([
                "Applied <u>kasatha</u> subtype graft. Added acrobatics and atheletics as a master skill, culture as a good skill.",
                Grafts.creatureSubtype.kasatha.description
            ])
        } else if (graft === Grafts.creatureSubtype.lashunta) {
            // Languages
            actorUpdate["data.traits.languages.custom"] =
                "limited telepathy 30 ft."
            // Innate spells
            let detectThoughts = await Utils.fuzzyFindSpellAsync(
                "detect thoughts"
            )
            let daze = await Utils.fuzzyFindSpellAsync("daze")
            let psychokineticHand = await Utils.fuzzyFindSpellAsync(
                "psychokinetic hand"
            )
            addOncePerDayInnateSpell(detectThoughts)
            addAtWillInnateSpell(daze)
            addAtWillInnateSpell(psychokineticHand)

            logEntries.push([
                "Applied <u>lashunta</u> subtype graft. Added limited telepathy 30 ft., detect thoughts as a once per day innate spell and added daze and psychokinetic hand as innate spells.",
                Grafts.creatureSubtype.lashunta.description
            ])
        } else if (graft === Grafts.creatureSubtype.shirren) {
            await apply(
                actor,
                context,
                //Senses
                new SenseAdjuster({
                    addSense: "blindsense (vibration) 30 ft."
                }),
                // Culture and Diplomacy as good skills
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        [Skill.culture, Skill.diplomacy],
                        MonsterSkillType.good
                    ]
                })
            )

            // Languages
            actorUpdate["data.traits.languages.custom"] =
                "limited telepathy 30 ft."

            logEntries.push([
                "Applied <u>shirren</u> subtype graft. Added blindsense (vibration) 30 ft., limited telepathy 30 ft., culture and diplomacy as good skills.",
                Grafts.creatureSubtype.shirren.description
            ])
        } else if (graft === Grafts.creatureSubtype.skittermander) {
            //Senses
            await apply(actor, context, SharedAdjusters.Senses.lowLightVision)

            logEntries.push([
                "Applied <u>skittermander</u> subtype graft. Added low-light vision.",
                Grafts.creatureSubtype.skittermander.description
            ])
        } else if (graft === Grafts.creatureSubtype.technological) {
            // No modifications
            logEntries.push([
                "Applied <u>technological</u> subtype graft (no modifications).",
                Grafts.creatureSubtype.technological.description
            ])
        } else if (graft === Grafts.creatureSubtype.vesk) {
            await apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.lowLightVision
            )

            // Natural weapons
            context.naturalWeapons.enabled = true
            context.naturalWeapons.racial = true

            logEntries.push([
                "Applied <u>vesk</u> subtype graft. Added low-light vision and natural weapons.",
                Grafts.creatureSubtype.vesk.description
            ])
        } else if (graft === Grafts.creatureSubtype.ysoki) {
            await apply(
                actor,
                context,
                //Senses
                SharedAdjusters.Senses.darkVision60ft,
                // Skills (Engineering and stealth as master skills)
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        [Skill.engineering, Skill.stealth],
                        MonsterSkillType.master
                    ]
                }),
                // Survival as good skill
                new SkillAdjuster({
                    setSkillAsMonsterSkill: [
                        Skill.survival,
                        MonsterSkillType.good
                    ]
                })
            )

            logEntries.push([
                "Applied <u>ysoki</u> subtype graft. Added darkvision 60 ft., added engineering and stealth as master skills and added survival as a good skill.",
                Grafts.creatureSubtype.ysoki.description
            ])
        }

        // Append subtype graft to graft list
        actorUpdate["data.details.raceAndGrafts"] =
            actor.data.data.details.raceAndGrafts + ", " + graft.name

        // Update actor
        await actor.update(actorUpdate)

        // Update log
        context.log.push(...logEntries)
    }

    private static async applyUniversalCreatureRule(
        actor: Actor<INPCData>,
        context: NPCCreationContext,
        universalCreatureRule: UniversalCreatureRule
    ) {
        if (universalCreatureRule == UniversalCreatureRules.mindless) {
            await apply(
                actor,
                context,
                // Immunities
                SharedAdjusters.Immunities.mindAffectingEffects,
                // Skills - set 0 master skills
                new SkillAdjuster({
                    setMonsterSkillCount: [MonsterSkillType.master, 0]
                }),
                // Reduce good skills by 1
                new SkillAdjuster({
                    mutateMonsterSkill: [MonsterSkillType.good, -1]
                }),
                // No intelligence
                // TODO: This has a chance of overwriting one of the randomly boosted ability scores, we should reassign the overwritten value to another stat
                new AbilityScoreAdjuster({
                    setAbilityScore: [AbilityScore.intelligence, 0]
                })
            )

            // Update log
            context.log.push([
                "Applied <u>mindless</u> universal creature rule. Reduced good skills by 1, reduced master skills to 0, added <u>mind-affecting effects</u> to condition immunities.",
                UniversalCreatureRules.mindless.description
            ])
        } else if (universalCreatureRule == UniversalCreatureRules.sightless) {
            // Uses default implementation
            // TODO: Remove once all UCR can depend on default/subclass implementation
            let output = await universalCreatureRule.apply(actor, context)
            context.log.push(...output)
        } else if (universalCreatureRule == UniversalCreatureRules.unliving) {
            await apply(
                actor,
                context,
                // No constitution
                // TODO: This has a chance of overwriting one of the randomly boosted ability scores, we should reassign the overwritten value to another stat
                // TODO: Should support `-` in the future but not yet supported by SFRPG
                new AbilityScoreAdjuster({
                    setAbilityScore: [AbilityScore.constituion, 0]
                })
            )

            // Update log
            context.log.push([
                "Applied <u>unliving</u> universal creature rule, set constitution to `-` .",
                UniversalCreatureRules.unliving.description
            ])
        }
    }

    private static async applyAdjustmentSpecialAbility(
        actor: Actor<INPCData>,
        context: NPCCreationContext,
        adjustmentSpecialAbility
    ) {
        let logEntries: [string, string][] = []
        let actorUpdate = {}

        // Brute - Use the low attack value for the NPC’s main attack, but determine the attack’s damage as if the NPC’s CR were 2 higher (adding the extra damage from weapon specialization). This special ability has a greater impact at higher CRs.
        if (
            adjustmentSpecialAbility ===
            MonsterCreation.specialAbilities.adjustment.brute
        ) {
            context.attackArrayRow.high = context.attackArrayRow.low

            // Get attack rows higher
            let indexOfCR = CR.indexOf(context.CR)
            let indexOfCRPlus2 = indexOfCR + 2
            let CRPlus2 = CR[indexOfCRPlus2]

            if (CRPlus2 && context.monsterReferenceSymbol) {
                var monsterReferenceSymbol =
                MonsterReferenceSymbol[context.monsterReferenceSymbol]
                let attackArrayRowPlus2 =
                    MonsterCreation.arrays[monsterReferenceSymbol].attack[CRPlus2]

                // Buff all damage by 2 CRs
                context.attackArrayRow.kinetic = attackArrayRowPlus2.kinetic
                context.attackArrayRow.energy = attackArrayRowPlus2.energy
                context.attackArrayRow.standard = attackArrayRowPlus2.standard
                context.attackArrayRow.threeAttacks = attackArrayRowPlus2.threeAttacks
                context.attackArrayRow.fourAttacks = attackArrayRowPlus2.fourAttacks

                logEntries.push([
                    "Applied <U>brute</U> adjustment special ability. Set high attack bonus value to low attack bonus, increased damage by 2 rows in the array.",
                    MonsterCreation.specialAbilities.adjustment.brute.description
                ])              
            } else {
                logEntries.push([
                    "Failed to Apply <U>brute</U> adjustment special ability." ,
                    MonsterCreation.specialAbilities.adjustment.brute.description
                ])  
            }
        }
        //Increase all saving throw bonuses by 1 or one saving throw bonus by 3.
        else if (
            adjustmentSpecialAbility ===
            MonsterCreation.specialAbilities.adjustment.saveBoost
        ) {
            // Will we increase all 3 by 1 or 1 by 3
            var randomChoice = Math.random() < 0.5
            if (randomChoice) {
                // Applies a +1 to all saves
                await apply(
                    actor,
                    context,
                    new SaveAdjuster({ mutateSave: [Save.reflex, 1] }),
                    new SaveAdjuster({ mutateSave: [Save.willpower, 1] }),
                    new SaveAdjuster({ mutateSave: [Save.fortitude, 1] })
                )

                logEntries.push([
                    "Applied <U>save boost</U> adjustment special ability. +1 to all saves (chose this option at random).",
                    MonsterCreation.specialAbilities.adjustment.saveBoost
                        .description
                ])
            } else {
                // Apply +3 to one save
                let saves = [Save.reflex, Save.willpower, Save.fortitude]
                Utils.shuffleArray(saves)

                await apply(
                    actor,
                    context,
                    // Saves
                    new SaveAdjuster({ mutateSave: [saves[0], 3] })
                )

                logEntries.push([
                    "Applied <U>save boost</U> adjustment special ability. +3 to " +
                        saves[0] +
                        " save (chose this option at random).",
                    MonsterCreation.specialAbilities.adjustment.saveBoost
                        .description
                ])
            }
        }
        // Increase all master and good skill bonuses by 1
        else if (
            adjustmentSpecialAbility ===
            MonsterCreation.specialAbilities.adjustment.skillful
        ) {
            context.mainArrayRow.masterSkill.mod += 1
            context.mainArrayRow.goodSkill.mod += 1
            
            logEntries.push([
                "Applied <U>skillful</U> adjustment special ability. +1 to all master and good skills.",
                MonsterCreation.specialAbilities.adjustment.skillful.description
            ])
        }
        //Increase the NPC’s HP by 20%
        else if (
            adjustmentSpecialAbility ===
            MonsterCreation.specialAbilities.adjustment.extraHitPoints
        ) {
            context.mainArrayRow.HP = Math.floor(context.mainArrayRow.HP * 1.2)

            logEntries.push([
                "Applied <U>extra hit points</U> adjustment special ability. Added 20% more HP.",
                MonsterCreation.specialAbilities.adjustment.extraHitPoints
                    .description
            ])
        }

        // Update actor
        await actor.update(actorUpdate)

        // Log
        context.log.push(...logEntries)
    }

    private static async clean(item) {
        if (item["_id"]) {
            item["sourceId"] = item["_id"]
            delete item["_id"]
        }
    }
}
