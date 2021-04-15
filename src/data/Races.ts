import { Grafts } from "./Grafts.js";

export const Races = {
    // A list of humanoid type races which will randomly be generated (generally for non-combat NPCs)
    nonCombatantRaces: {
        "android": {name:"android", size: "medium", creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.android},
        "dwarf": {name:"dwarf", size: "medium", languages: ["dwarven"], creatureTypeGraft: Grafts.creatureType.humanoid , creatureSubtypeGraft: Grafts.creatureSubtype.dwarf},
        "drow": {name:"drow", size: "medium", languages: ["drow"], creatureTypeGraft: Grafts.creatureType.humanoid , creatureSubtypeGraft: Grafts.creatureSubtype.elf},
        "gnome": {name:"gnome", size: "small", languages: ["gnome"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.gnome},
        "gnoll": {name:"gnoll", size: "medium", customLanguages: ["gnoll"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.gnoll},
        "human": {name:"human", size: "medium", creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.human},
        "halfling": {name:"halfling", size: "small", languages: ["halfling"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.halfling},
        "kasatha": {name:"kasatha", size: "medium", arms: 4, languages: ["kasatha"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.kasatha},
        "lashunta": {name:"lashunta", size: "medium", languages: ["castrovelian"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.lashunta},
        "nuar": {name:"nuar", size: "medium", creatureTypeGraft: Grafts.creatureType.monstrousHumanoid},
        "skittermander": {name: "skittermander", size: "small", arms: 6, creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.skittermander},
        "shirren": {name: "shirren", size: "medium", languages: ["shirren"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.shirren},
        "vesk": {name:"vesk", size: "medium", languages: ["vesk"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.vesk},
        "ysoki": {name:"ysoki", size: "small", languages: ["akiton", "ysoki"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.ysoki}
    }
};

// The version of sfrpg the player is using may not have the new races included in the Alien Races Cards
// I've bundled them here temporarily, will be removed when this module migrates to 0.8.X as a minimum Foundry version
// (as the version of sfrpg which is compatible with 0.8.X will have these races)
export const BundledRaces = {
    gnoll: {
        "name": "Gnoll",
        "type": "race",
        "data": {
            "description": {
                "chat": "",
                "gmnotes": "",
                "short": "",
                "value": "<p>Gnolls are hyena-headed humanoids with reputation as bloodthirsty raiders, scavengers, and cannibals. They are capable hunters who respect pwoer and strength over station or role, and most gnolls would believe their own survival takes precedence over any kind of morality.</p>\n<p><strong>Ability Adjustments </strong>+2 Str, +2 Con, -2 Int<br /><strong>Hit Points&nbsp;</strong>6</p>\n<h2>Size and Type</h2>\n<p>Gnolls are Medium humanoids with the gnoll subtype.</p>\n<h2>Self-Sufficient</h2>\n<p>Gnolls receive a +2 racial bonus to Surival checks.</p>\n<h2>Blindsense</h2>\n<p>Gnolls have blindsense (scent) with a range of 30 feet.</p>\n<h2>Darkvision</h2>\n<p>Gnolls can see up to 60 feet in the dark. See page 263 for more information.</p>\n<h2>Rugged Travel</h2>\n<p>Each time they move, gnolls can move through the first square of nonmagical difficult terrain at their normal speed.</p>\n<h2>Natural Weapons</h2>\n<p>Gnolls can attack with a special unarmed strike that deals lethal damage, doesn&rsquo;t count as archaic, and threatens squares. Gnoll gain a special version of the Weapon Specialization feat with this unarmed strike at 3rd level, allowing them to add 1&ndash;1/2 &times; their character level to their damage rolls for this unarmed strike (instead of just adding their character level, as usual).</p>\n<p>&nbsp;</p>",
                "unidentified": ""
            },
            "source": "ACD",
            "type": "humanoid",
            "modifiers": [
                {
                    "name": "Self-sufficient",
                    "modifier": "2",
                    "type": "racial",
                    "effectType": "skill",
                    "valueAffected": "sur",
                    "enabled": true,
                    "source": "Racial",
                    "notes": "Gnolls gain a +2 racial bonus to Survival checks.",
                    "modifierType": "constant",
                    "condition": "",
                    "subtab": "misc",
                    "max": 2,
                    "_id": "58a26466-6333-4d6b-91f0-49ef03c52fb6"
                }
            ],
            "hp": {
                "value": 6,
                "min": 1
            },
            "abilityMods": {
                "parts": [
                    [
                        2,
                        "str"
                    ],
                    [
                        2,
                        "con"
                    ],
                    [
                        -2,
                        "int"
                    ]
                ]
            },
            "size": "medium",
            "subtype": "gnoll",
            "damage": {
                "parts": []
            },
            "critical": {
                "parts": []
            }
        },
        "flags": {},
        "effects": []
    }
}
