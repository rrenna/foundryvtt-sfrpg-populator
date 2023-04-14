import CreatureTypeGraft from "../models/CreatureTypeGraft.js";
import CreatureSubtypeGraft from "../models/CreatureSubtypeGraft.js";
import { Subtype, Type } from "./Types.js";
// List of all supported grafts
export const Grafts = {
    // List of all creature type grafts
    creatureType: {
        animal: new CreatureTypeGraft(Type[Type.animal], "An animal is a living, nonhumanoid creature, usually a vertebrate with no magical abilities and no innate capacity for language or culture.\n" +
            "<br/><b>Traits:</b> Low-light vision; set Intelligence modifier to –4 or –5.\n" +
            "<br/><b>Adjustments:</b> +2 to Fortitude and Reflex saving throws.", false),
        construct: new CreatureTypeGraft(Type[Type.construct], "A construct is a magically animated object or an artificially created creature." +
            "<br/><b>Traits:</b> Darkvision 60 ft., low-light vision, construct immunities, unliving; set Constitution modifier to —; must have either the magical or technological subtype; if the construct is mindless, set Intelligence modifier to — and add mindless." +
            "<br/><b>Adjustments:</b> –2 to all saving throws, +1 to attack rolls."),
        humanoid: new CreatureTypeGraft(Type[Type.humanoid], "A humanoid usually has two arms, two legs, and one head, or it has a humanlike torso, arms, and a head. Humanoids have few or no supernatural or extraordinary abilities, but most can speak and usually have well-developed societies.\n" +
            "<br/><b>Traits:</b> Must have a subtype that matches its species (such as human, lashunta, or shirren) or that is related to its species (such as goblinoid).\n" +
            "<br/><b>Adjustments:</b> +2 to one type of saving throw."),
        monstrousHumanoid: new CreatureTypeGraft(Type[Type["monstrous humanoid"]], "Monstrous humanoids are similar to humanoids, but they have monstrous or animalistic features. They often have magical abilities as well.\n" +
            "<br/><b>Traits:</b> Darkvision 60 ft.\n" +
            "<br/><b>Adjustments:</b> +2 to Reflex and Will saving throws, +1 to attack rolls."),
        ooze: new CreatureTypeGraft(Type[Type.ooze], "An ooze is an amorphous or mutable creature.\n" +
            "<br/><b>Traits:</b> Blindsight, mindless, ooze immunities, sightless; set Intelligence modifier to —.\n" +
            "<br/><b>Adjustments:</b> +2 to Fortitude saving throws, –2 to Reflex and Will saving throws, no master or good skills unless the creature would have them naturally, rather than through training.", false),
        vermin: new CreatureTypeGraft(Type[Type.vermin], "This type includes insects, arachnids, other arthropods, worms, and similar invertebrates.\n" +
            "<br/><b>Traits:</b> Darkvision 60 ft., mindless; set Intelligence modifier to —.\n" +
            "<br/><b>Adjustments:</b> +2 to Fortitude saving throws.", false)
    },
    // List of all creature subtype grafts
    creatureSubtype: {
        android: new CreatureSubtypeGraft(Subtype[Subtype.android], "This subtype is applied to androids and creatures related to androids.\n" +
            "<br/><b>Traits:</b> Most creatures with this subtype gain darkvision 60 ft. and low-light vision; if the NPC is of the android species (Starfinder Core Rulebook 42), it also gains the constructed, flat affect, and upgrade slot racial traits."),
        dwarf: new CreatureSubtypeGraft(Subtype[Subtype.dwarf], "This subtype is applied to dwarves and creatures related to dwarves.\n" +
            "<br/><b>Traits:</b> Most creatures with this subtype gain darkvision 60 ft.; if the NPC is of the dwarven species (Starfinder Core Rulebook 506), it also gains the slow but steady, stonecunning, traditional enemies, and weapon familiarity racial traits."),
        elf: new CreatureSubtypeGraft(Subtype[Subtype.elf], "This subtype is applied to elves and creatures related to elves.\n" +
            "<br/><b>Traits:</b> Most creatures with this subtype gain low-light vision and gain Perception as an additional master skill; if the NPC is of the drow species (see page 42), it gains darkvision 60 ft. instead of low-light vision, as well as the drow immunities, drow magic, and light blindness racial traits; if the NPC is of the elven species (Starfinder Core Rulebook 507), it gains the elven immunities and elven magic racial traits and Mysticism as a master skill; if the NPC is of the half-elven species (Starfinder Core Rulebook 509), it gains the elven blood racial trait and an extra good skill.\n"),
        gnome: new CreatureSubtypeGraft(Subtype[Subtype.gnome], "This subtype is applied to gnomes and creatures related to gnomes.\n" +
            "<br/><b>Traits:</b> Low-light vision; if the NPC is of the gnome species (Starfinder Core Rulebook 508) it also gains the eternal hope and gnome magic racial traits\n" +
            "and Culture as a master skill."),
        gnoll: new CreatureSubtypeGraft(Subtype[Subtype.gnoll], "This subtype is applied to gnolls and creatures related to gnolls.\n" +
            "<br/><b>Traits:</b> Blindsense (scent) 30 ft., darkvision 60 ft.; if the NPC is of the gnoll species (see Starfinder Alien Character Cards), it also gains the natural weapons and rugged travel racial traits and Survival as a master skill."),
        goblinoid: new CreatureSubtypeGraft(Subtype[Subtype.goblinoid], "This subtype is applied to humanoids of various goblinoid subspecies, such as hobgoblins.\n" +
            "<br/><b>Traits:</b> Darkvision 60 ft.; if the NPC is of the hobgoblin species (see page 76), it also gains the battle hardened racial trait and Intimidate and Stealth as master skills; if the NPC is of the kanabo species (see page 89), it gains the armor savant and kanabo magic racial traits."),
        halfling: new CreatureSubtypeGraft(Subtype[Subtype.halfling], "This subtype is applied to halflings and creatures related to halflings.\n" +
            "<br/><b>Traits:</b> None; if the NPC is of the halfling species (Starfinder Core Rulebook 511), it gains the halfling luck and sneaky racial traits, Perception and Stealth as master skills, and Acrobatics and Athletics as good skills."),
        human: new CreatureSubtypeGraft(Subtype[Subtype.human], "This subtype is applied to humans and creatures related to humans.\n" +
            "<br/><b>Traits:</b> None; if the NPC is of the human species (Starfinder Core Rulebook 44), it gains an additional special ability of any type and an additional good skill."),
        kasatha: new CreatureSubtypeGraft(Subtype[Subtype.kasatha], "This subtype is applied to kasathas and creatures related to kasathas.\n" +
            "<br/><b>Traits:</b> None; if the NPC is of the kasatha species (Starfinder Core Rulebook 46), it gains the desert stride and four-armed racial traits, Acrobatics and Athletics as master skills, and Culture as a good skill."),
        lashunta: new CreatureSubtypeGraft(Subtype[Subtype.lashunta], "This subtype is applied to lashuntas and creatures related to lashuntas.\n" +
            "<br/><b>Traits:</b> None; if the NPC is of the lashunta species (Starfinder Core Rulebook 48), it gains the limited telepathy racial trait and can cast the following spells as spell-like abilities: 1/day— detect thoughts; at will—daze and psychokinetic hand."),
        orc: new CreatureSubtypeGraft(Subtype[Subtype.orc], "This subtype is applied to orcs and creatures who are related to orcs.\n" +
            "<br/><b>Traits:</b> Most creatures of this subtype gain darkvision 60 ft. and the ferocity universal creature rule; if the creature is of the half-orc species (Starfinder Core Rulebook 510), it also gains Intimidate and Survival as master skills."),
        shirren: new CreatureSubtypeGraft(Subtype[Subtype.shirren], "This subtype is applied to shirrens and creatures related to shirrens. <br/><b>Traits:</b> Blindsense (vibration) 30 ft.; if the NPC is of the shirren species (Starfinder Core Rulebook 50), it also gains the communalism and limited telepathy racial traits and Culture and Diplomacy as good skills."),
        skittermander: new CreatureSubtypeGraft(Subtype[Subtype.skittermander], "This subtype is applied to skittermanders and creatures related to skittermanders. <br/><b>Traits:</b>Traits:</b> Low-light vision; if the NPC is of the skittermander species (see page 106), it also gains the grappler, hyper, and six- armed racial traits."),
        technological: new CreatureSubtypeGraft(Subtype[Subtype.technological], "A number of subtypes don’t have full entries. Those that don’t grant additional abilities to creatures are listed below."),
        vesk: new CreatureSubtypeGraft(Subtype[Subtype.vesk], "This subtype is applied to vesk and creatures related to vesk. <br/><b>Traits:</b> Low-light vision; if the NPC is of the vesk species (Starfinder Core Rulebook 52), it also gains the armor savant, fearless, and natural weapons racial traits."),
        ysoki: new CreatureSubtypeGraft(Subtype[Subtype.ysoki], "This subtype is applied to ysoki and creatures related to ysoki. <br/><b>Traits</b>: Darkvision 60 ft.; if the NPC is of the ysoki species (Starfinder Core Rulebook 54), it also gains the cheek pouches and moxie racial traits, Engineering and Stealth as master skills, and Survival as a good skill.")
    }
};
//# sourceMappingURL=Grafts.js.map