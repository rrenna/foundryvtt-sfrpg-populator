import UniversalCreatureRule from "../models/UniversalCreatureRule.js"
import { UniversalCreatureRules } from "./universal creature rules/UniversalCreatureRules.js"
import AdjustmentSpecialAbility from "../models/AdjustmentSpecialAbility.js"

/// List of creature combat ratings
export const CR = [
    "1/3",
    "1/2",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
]

// List of creature save types
export enum Save {
    fortitude = "fort",
    reflex = "reflex",
    willpower = "will"
}

/// List of creature gender identities
export enum Gender {
    male = "male",
    female = "female",
    nonBinary = "non-binary"
}

/// List of creature sizes
export enum Size {
    small,
    medium,
    large
}

/// List of Monster Reference Symbols
export enum MonsterReferenceSymbol {
    combatant,
    expert,
    spellcaster
}

export enum MonsterSkillType {
    good,
    master
}

/// Collection of monster creation statistics and special abilities used to generate new creatures
export const MonsterCreation = {
    arrays: {
        // Expert Arrays
        expert: {
            name: MonsterReferenceSymbol.expert,
            main: {
                "1/3": {
                    CR: CR[0],
                    EAC: 10,
                    KAC: 11,
                    fort: 0,
                    reflex: 0,
                    will: 2,
                    HP: 6,
                    abilityMods: [3, 1, 0],
                    specialAbilities: 1,
                    masterSkill: { count: 3, mod: 7 },
                    goodSkill: { count: 2, mod: 3 }
                } as IMainArrayRow,
                "1/2": {
                    CR: CR[1],
                    EAC: 10,
                    KAC: 11,
                    fort: 0,
                    reflex: 0,
                    will: 3,
                    HP: 12,
                    abilityMods: [3, 2, 1],
                    specialAbilities: 1,
                    masterSkill: { count: 3, mod: 9 },
                    goodSkill: { count: 2, mod: 4 }
                } as IMainArrayRow,
                "1": {
                    CR: CR[2],
                    EAC: 11,
                    KAC: 12,
                    fort: 1,
                    reflex: 1,
                    will: 4,
                    HP: 17,
                    abilityMods: [4, 2, 1],
                    specialAbilities: 1,
                    masterSkill: { count: 3, mod: 10 },
                    goodSkill: { count: 2, mod: 5 }
                } as IMainArrayRow,
                "2": {
                    CR: CR[3],
                    EAC: 13,
                    KAC: 14,
                    fort: 1,
                    reflex: 1,
                    will: 5,
                    HP: 23,
                    abilityMods: [4, 2, 1],
                    specialAbilities: 1,
                    masterSkill: { count: 3, mod: 12 },
                    goodSkill: { count: 2, mod: 7 }
                } as IMainArrayRow,
                "3": {
                    CR: CR[4],
                    EAC: 14,
                    KAC: 15,
                    fort: 2,
                    reflex: 2,
                    will: 6,
                    HP: 35,
                    abilityMods: [4, 2, 1],
                    specialAbilities: 2,
                    masterSkill: { count: 3, mod: 13 },
                    goodSkill: { count: 2, mod: 8 }
                } as IMainArrayRow,
                "4": {
                    CR: CR[5],
                    EAC: 16,
                    KAC: 17,
                    fort: 3,
                    reflex: 3,
                    will: 7,
                    HP: 45,
                    abilityMods: [5, 3, 1],
                    specialAbilities: 2,
                    masterSkill: { count: 3, mod: 15 },
                    goodSkill: { count: 2, mod: 10 }
                } as IMainArrayRow,
                "5": {
                    CR: CR[6],
                    EAC: 17,
                    KAC: 18,
                    fort: 4,
                    reflex: 4,
                    will: 8,
                    HP: 65,
                    abilityMods: [5, 3, 2],
                    specialAbilities: 2,
                    masterSkill: { count: 3, mod: 16 },
                    goodSkill: { count: 2, mod: 11 }
                } as IMainArrayRow
            },
            attack: {
                "1/3": {
                    high: 2,
                    low: 0,
                    energy: "1d4",
                    kinetic: "1d4",
                    standard: "1d4 + @abilities.str.mod"
                } as IMainArrayRow,
                "1/2": {
                    high: 4,
                    low: 2,
                    energy: "1d4",
                    kinetic: "1d4",
                    standard: "1d4 + @abilities.str.mod"
                } as IMainArrayRow,
                "1": {
                    high: 6,
                    low: 4,
                    energy: "1d4+1",
                    kinetic: "1d4+1",
                    standard: "1d4 + 1 + @abilities.str.mod"
                } as IMainArrayRow,
                "2": {
                    high: 8,
                    low: 6,
                    energy: "1d4+2",
                    kinetic: "1d4+2",
                    standard: "1d4 + 2 + @abilities.str.mod"
                } as IMainArrayRow,
                "3": {
                    high: 9,
                    low: 7,
                    energy: "1d4+3",
                    kinetic: "1d4+3",
                    standard: "1d4 + 3 + @abilities.str.mod"
                } as IMainArrayRow,
                "4": {
                    high: 10,
                    low: 8,
                    energy: "1d4+4",
                    kinetic: "1d4+4",
                    standard: "1d4 + 4 + @abilities.str.mod"
                } as IMainArrayRow,
                "5": {
                    high: 12,
                    low: 10,
                    energy: "1d4+5",
                    kinetic: "1d6+5",
                    standard: "1d4 + 5 + @abilities.str.mod"
                } as IMainArrayRow,
                "6": {
                    high: 14,
                    low: 12,
                    energy: "1d6+6",
                    kinetic: "1d8+6",
                    standard: "1d6 + 6 + @abilities.str.mod"
                } as IMainArrayRow,
                "7": {
                    high: 15,
                    low: 13,
                    energy: "1d8+7",
                    kinetic: "1d12+7",
                    standard: "1d8 + 7 + @abilities.str.mod"
                } as IMainArrayRow
            }
        },
        combatant: {
            name: MonsterReferenceSymbol.combatant,
            main: {
                "1/3": {
                    CR: CR[0],
                    EAC: 10,
                    KAC: 12,
                    fort: 1,
                    reflex: 1,
                    will: 0,
                    HP: 6,
                    abilityMods: [3, 1, 0],
                    specialAbilities: 1,
                    masterSkill: { count: 1, mod: 7 },
                    goodSkill: { count: 2, mod: 3 }
                } as IMainArrayRow,
                "1/2": {
                    CR: CR[1],
                    EAC: 10,
                    KAC: 12,
                    fort: 2,
                    reflex: 2,
                    will: 0,
                    HP: 13,
                    abilityMods: [3, 2, 1],
                    specialAbilities: 1,
                    masterSkill: { count: 1, mod: 9 },
                    goodSkill: { count: 2, mod: 4 }
                } as IMainArrayRow,
                "1": {
                    CR: CR[2],
                    EAC: 11,
                    KAC: 13,
                    fort: 3,
                    reflex: 3,
                    will: 1,
                    HP: 20,
                    abilityMods: [4, 2, 1],
                    specialAbilities: 1,
                    masterSkill: { count: 1, mod: 10 },
                    goodSkill: { count: 2, mod: 5 }
                } as IMainArrayRow,
                "2": {
                    CR: CR[3],
                    EAC: 13,
                    KAC: 15,
                    fort: 4,
                    reflex: 4,
                    will: 1,
                    HP: 25,
                    abilityMods: [4, 2, 1],
                    specialAbilities: 2,
                    masterSkill: { count: 1, mod: 12 },
                    goodSkill: { count: 2, mod: 7 }
                } as IMainArrayRow,
                "3": {
                    CR: CR[4],
                    EAC: 14,
                    KAC: 16,
                    fort: 5,
                    reflex: 5,
                    will: 2,
                    HP: 40,
                    abilityMods: [4, 2, 1],
                    specialAbilities: 2,
                    masterSkill: { count: 1, mod: 13 },
                    goodSkill: { count: 2, mod: 8 }
                } as IMainArrayRow,
                "4": {
                    CR: CR[5],
                    EAC: 16,
                    KAC: 18,
                    fort: 6,
                    reflex: 6,
                    will: 3,
                    HP: 50,
                    abilityMods: [5, 3, 1],
                    specialAbilities: 2,
                    masterSkill: { count: 1, mod: 15 },
                    goodSkill: { count: 2, mod: 10 }
                } as IMainArrayRow,
                "5": {
                    CR: CR[6],
                    EAC: 17,
                    KAC: 19,
                    fort: 7,
                    reflex: 7,
                    will: 4,
                    HP: 70,
                    abilityMods: [5, 3, 2],
                    specialAbilities: 2,
                    masterSkill: { count: 1, mod: 16 },
                    goodSkill: { count: 2, mod: 11 }
                } as IMainArrayRow
            },
            attack: {
                "1/3": {
                    high: 4,
                    low: 1,
                    energy: "1d4",
                    kinetic: "1d4",
                    standard: "1d6 + @abilities.str.mod"
                } as IMainArrayRow,
                "1/2": {
                    high: 6,
                    low: 3,
                    energy: "1d4",
                    kinetic: "1d6",
                    standard: "1d6 + @abilities.str.mod"
                } as IMainArrayRow,
                "1": {
                    high: 8,
                    low: 5,
                    energy: "1d4+1",
                    kinetic: "1d6+1",
                    standard: "1d6 + 1 + @abilities.str.mod"
                } as IMainArrayRow,
                "2": {
                    high: 10,
                    low: 7,
                    energy: "1d4+2",
                    kinetic: "1d6+2",
                    standard: "1d6 + 2 + @abilities.str.mod"
                } as IMainArrayRow,
                "3": {
                    high: 11,
                    low: 8,
                    energy: "1d4+3",
                    kinetic: "1d6+3",
                    standard: "1d6 + 3 + @abilities.str.mod"
                } as IMainArrayRow,
                "4": {
                    high: 12,
                    low: 9,
                    energy: "1d4+4",
                    kinetic: "1d6+4",
                    standard: "1d6 + 4 + @abilities.str.mod"
                } as IMainArrayRow,
                "5": {
                    high: 14,
                    low: 11,
                    energy: "1d6+5",
                    kinetic: "1d8+5",
                    standard: "1d6 + 5 + @abilities.str.mod"
                } as IMainArrayRow,
                "6": {
                    high: 16,
                    low: 13,
                    energy: "1d10+6",
                    kinetic: "2d6+6",
                    standard: "1d8 + 6 + @abilities.str.mod"
                } as IMainArrayRow,
                "7": {
                    high: 17,
                    low: 14,
                    energy: "2d6+7",
                    kinetic: "2d8+7",
                    standard: "2d6 + 7 + @abilities.str.mod"
                } as IMainArrayRow
            }
        }
    },
    specialAbilities: {
        universalCreatureRule: {
            ferocity: UniversalCreatureRules.ferocity,
            naturalWeapons: UniversalCreatureRules.naturalWeapons,
            integratedWeapons: UniversalCreatureRules.integratedWeapons
        },
        adjustment: {
            brute: new AdjustmentSpecialAbility(
                "brute",
                "Use the low attack value for the NPC’s main attack, but determine the attack’s damage as if the NPC’s CR were 2 higher (adding the extra damage from weapon specialization). This special ability has a greater impact at higher CRs."
            ),
            extraHitPoints: new AdjustmentSpecialAbility(
                "extra hit points",
                "Increase the NPC’s HP by 20%."
            ),
            saveBoost: new AdjustmentSpecialAbility(
                "save boost",
                "Increase all saving throw bonuses by 1 or one saving throw bonus by 3."
            ),
            //TODO: Secondary Magic
            skillful: new AdjustmentSpecialAbility(
                "skillful",
                "Increase all master and good skill bonuses by 1."
            )
        }
    }
}
