export const CR = ["1/3", "1/2", "1", "2"]

export const MonsterCreation = {

    arrays: {
        // Expert Arrays
        expert: {
            name: "expert",
            main: {
                "1/3": {CR: CR[0], EAC: 10, KAC: 11, fort: 0, reflex: 0, will: 2, HP: 6, abilityMods: [3,1,0], masterSkill: {count: 3, mod: 7}, goodSkill: {count: 2, mod: 3} },
                "1/2": {CR: CR[1], EAC: 10, KAC: 11, fort: 0, reflex: 0, will: 3, HP: 12 , abilityMods: [3,2,1], masterSkill: {count: 3, mod: 9}, goodSkill: {count: 2, mod: 4} },
                "1": {CR: CR[2], EAC: 11, KAC: 12, fort: 1, reflex: 1, will: 4, HP: 17 , abilityMods: [4,2,1], masterSkill: {count: 3, mod: 10}, goodSkill: {count: 2, mod: 5} },
                "2": {CR: CR[3], EAC: 13, KAC: 14, fort: 1, reflex: 1, will: 5, HP: 23 , abilityMods: [4,2,1], masterSkill: {count: 3, mod: 12}, goodSkill: {count: 2, mod: 7} }
            },
            attack: {
                "1/3": {high: 2, low: 0, energy: "1d4", kinetic: "1d4", standard: "1d4 + @abilities.str.mod" },
                "1/2": {high: 4, low: 2, energy: "1d4", kinetic: "1d4", standard: "1d4 + @abilities.str.mod" },
                "1": {high: 6, low: 4, energy: "1d4+1", kinetic: "1d4+1", standard: "1d4 + 1 + @abilities.str.mod" },
                "2": {high: 8, low: 6, energy: "1d4+2", kinetic: "1d4+2", standard: "1d4 + 2 + @abilities.str.mod" }
            }
        },
        combatant: {
            name: "combatant",
            main: {
                "1/3": {CR: CR[0], EAC: 10, KAC: 12, fort: 1, reflex: 1, will: 0, HP: 6, abilityMods: [3,1,0], masterSkill: {count: 1, mod: 7}, goodSkill: {count: 2, mod: 3} },
                "1/2": {CR: CR[1], EAC: 10, KAC: 12, fort: 2, reflex: 2, will: 0, HP: 13 , abilityMods: [3,2,1], masterSkill: {count: 1, mod: 9}, goodSkill: {count: 2, mod: 4} },
                "1": {CR: CR[2], EAC: 11, KAC: 13, fort: 3, reflex: 3, will: 1, HP: 20 , abilityMods: [4,2,1], masterSkill: {count: 1, mod: 10}, goodSkill: {count: 2, mod: 5} },
                "2": {CR: CR[3], EAC: 13, KAC: 15, fort: 4, reflex: 4, will: 1, HP: 25 , abilityMods: [4,2,1], masterSkill: {count: 1, mod: 12}, goodSkill: {count: 2, mod: 7} }
            },
            attack: {
                "1/3": {high: 4, low: 1, energy: "1d4", kinetic: "1d4", standard: "1d6 + @abilities.str.mod" },
                "1/2": {high: 6, low: 3, energy: "1d4", kinetic: "1d6", standard: "1d6 + @abilities.str.mod" },
                "1": {high: 8, low: 5, energy: "1d4+1", kinetic: "1d6+1", standard: "1d6 + 1 + @abilities.str.mod" },
                "2": {high: 10, low: 7, energy: "1d4+2", kinetic: "1d6+2", standard: "1d6 + 2 + @abilities.str.mod" }
            }
        }
    }
};