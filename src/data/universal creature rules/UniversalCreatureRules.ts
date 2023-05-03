/// Collection of universal creature rules which are applied by various means (creature type grafts, special abilities, etc)
import UniversalCreatureRule from "../../models/UniversalCreatureRule.js"

export const UniversalCreatureRules = {
    ferocity: new UniversalCreatureRule(
        "ferocity",
        "When the creature is brought to 0 Hit Points, it can fight on for 1 more round. It can act normally until the end of its next turn; if it has 0 HP at that point, it dies. If it would lose further Hit Points before this, it ceases to be able to act and dies."
    ),
    integratedWeapons: new UniversalCreatureRule(
        "integrated weapons",
        "The creature’s weapons are manufactured weapons, not natural weapons, and they are integrated into its frame. A creature can’t be disarmed of these weapons, though they can be removed and used if the creature is dead."
    ),
    integratedEquipment: new UniversalCreatureRule(
        "integrated equipment",
        "An SRO has an internal, integrated Datajack, Standard and Comm Unit. If an SRO is helpless, these can be removed or destroyed without damaging the SRO. They can be replaced or upgraded for the normal price of this equipment. An SRO has an additional built-in cybernetic component with an item level no greater than half the SRO’s character level (minimum item level 1). Each time the SRO gains a level, they can swap out this piece of equipment at no additional cost to represent internal reconfigurations. These pieces of equipment don’t count against the systems in which an SRO can install cybernetics."
    ),
    mindless: new UniversalCreatureRule(
        "mindless",
        "The creature has no Intelligence score or modifier and is immune to mind-affecting effects. Any DCs or other statistics that rely on an Intelligence score treat the creature as having a score of 10 (+0).\n" +
            "Guidelines: Mindless creatures usually have fewer good skills and no master skills. Their skills should be based on inborn abilities, since they’re incapable of training."
    ),
    naturalWeapons: new UniversalCreatureRule(
        "natural weapons",
        "Natural weapons (and natural attacks), such as acid spit, bite, claw, or slam don’t require ammunition and can’t be disarmed or sundered."
    ),
    sightless: new UniversalCreatureRule(
        "sightless",
        "The creature does not use any visual senses and is thus never subject to any effect that requires the creature to see a target or effect. Sightless creatures normally have some form of blindsight to compensate for their sightlessness, but if not, they are assumed to be able to operate as well as a creature with normal vision unless the creature’s description says otherwise."
    ),
    unliving: new UniversalCreatureRule(
        "unliving",
        "The creature has no Constitution score or modifier. Any DCs or other statistics that rely on a Constitution score treat the creature as having a score of 10 (+0). The creature is immediately destroyed when it reaches 0 Hit Points. An unliving creature doesn’t heal damage naturally, but a construct can be repaired with the right tools. Spells such as make whole can heal constructs, and magic effects can heal undead. An unliving creature with fast healing (see page 154) still benefits from that ability. Unliving creatures don’t breathe, eat, or sleep. They can’t be raised or resurrected, except through the use of miracle, wish, or a similar effect that specifically works on unliving creatures."
    )
}
