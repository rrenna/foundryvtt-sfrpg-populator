// Weapon Templates
// Some weapons are easier to store as template which are modified/customized rather than searching compendiums
export const unarmedStrikeTemplate = {
    name: "Unarmed strike",
    type: "weapon",
    system: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value: "<p>An unarmed strike can be dealt with any limb or appendage. Unarmed strikes deal nonlethal damage, and the damage from an unarmed strike is considered weapon damage for the purposes of effects that give you a bonus to weapon damage rolls.</p>",
            unidentified: ""
        },
        source: "CRB pg. 190",
        type: "",
        quantity: null,
        bulk: "-",
        price: 0,
        level: 0,
        attuned: false,
        equipped: true,
        equippable: false,
        identified: true,
        attributes: {
            sturdy: false,
            customBuilt: false,
            size: "medium",
            dex: {
                mod: ""
            },
            hp: {
                value: 6,
                max: "6"
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        activation: {
            type: "action",
            cost: 1,
            condition: ""
        },
        duration: {
            value: "",
            units: ""
        },
        target: {
            value: "",
            type: ""
        },
        area: {
            value: null,
            units: "none",
            shape: "",
            effect: ""
        },
        range: {
            value: null,
            units: "touch",
            additional: "",
            per: ""
        },
        uses: {
            value: null,
            max: null,
            per: ""
        },
        isActive: null,
        ability: "",
        actionTarget: "kac",
        actionType: "mwak",
        attackBonus: 0,
        chatFlavor: "",
        critical: {
            parts: [],
            effect: ""
        },
        damage: {
            parts: [{
                    "name": "",
                    "formula": "1d3",
                    "operator": "",
                    "types": {
                        "acid": false,
                        "bludgeoning": true,
                        "cold": false,
                        "electricity": false,
                        "fire": false,
                        "healing": false,
                        "piercing": false,
                        "slashing": false,
                        "sonic": false
                    }
                }]
        },
        formula: "",
        save: {
            type: "",
            dc: "",
            descriptor: "negate"
        },
        descriptors: [],
        capacity: {
            value: null,
            max: null
        },
        usage: {
            value: null,
            per: ""
        },
        modifiers: [],
        container: {
            contents: [],
            storage: [],
            isOpen: true,
            includeContentsInWealthCalculation: true
        },
        weaponType: "basicM",
        weaponCategory: "uncategorized",
        special: "",
        properties: {
            aeon: false,
            amm: false,
            analog: false,
            antibiological: false,
            archaic: true,
            aurora: false,
            automatic: false,
            blast: false,
            block: false,
            boost: false,
            breach: false,
            breakdown: false,
            bright: false,
            buttressing: false,
            cluster: false,
            conceal: false,
            deconstruct: false,
            deflect: false,
            disarm: false,
            double: false,
            drainCharge: false,
            echo: false,
            entangle: false,
            explode: false,
            extinguish: false,
            feint: false,
            fiery: false,
            firstArc: false,
            flexibleLine: false,
            force: false,
            freeHands: false,
            fueled: false,
            gearArray: false,
            grapple: false,
            gravitation: false,
            guided: false,
            harrying: false,
            holyWater: false,
            hybrid: false,
            ignite: false,
            indirect: false,
            injection: false,
            integrated: false,
            line: false,
            living: false,
            lockdown: false,
            "mind-affecting": false,
            mine: false,
            mire: false,
            modal: false,
            necrotic: false,
            nonlethal: true,
            one: false,
            operative: false,
            penetrating: false,
            polarize: false,
            polymorphic: false,
            powered: false,
            professional: false,
            propel: false,
            punchGun: false,
            qreload: false,
            radioactive: false,
            reach: false,
            recall: false,
            regrowth: false,
            relic: false,
            reposition: false,
            scramble: false,
            shape: false,
            shatter: false,
            shells: false,
            shield: false,
            sniper: false,
            stun: false,
            subtle: false,
            sunder: false,
            swarm: false,
            tail: false,
            teleportive: false,
            thought: false,
            throttle: false,
            thrown: false,
            thruster: false,
            trip: false,
            two: false,
            unbalancing: false,
            underwater: false,
            unwieldy: false,
            variantBoost: false,
            wideLine: false
        },
        proficient: true,
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img: "icons/skills/melee/unarmed-punch-fist.webp",
    effects: []
};
export const naturalWeaponsTemplate = {
    name: "Unarmed strike (natural weapons)",
    type: "weapon",
    system: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value: "<p>Natural weapons (and natural attacks) such as acid spit, bite, claw, or slam don’t require ammunition and can’t be disarmed or sundered.\n" +
                "In addition, a player character with this ability can attack with a special unarmed strike that deals lethal damage, doesn’t count as archaic, and threatens squares. They also gain a special version of the Weapon Specialization feat with this unarmed strike at 3rd level, allowing them to add 1–1/2 × their character level to their damage rolls for this unarmed strike (instead of just adding their character level as usual).</p>",
            unidentified: ""
        },
        source: "CRB pg. 190",
        type: "",
        quantity: null,
        bulk: "-",
        price: 0,
        level: 0,
        attuned: false,
        equipped: true,
        equippable: false,
        identified: true,
        attributes: {
            sturdy: false,
            customBuilt: false,
            size: "medium",
            dex: {
                mod: ""
            },
            hp: {
                value: 15,
                max: "15"
            },
            hardness: {
                value: "0"
            },
            ac: {
                value: "5"
            }
        },
        activation: {
            type: "action",
            cost: 1,
            condition: ""
        },
        duration: {
            value: "",
            units: ""
        },
        target: {
            value: "",
            type: ""
        },
        area: {
            value: null,
            units: "none",
            shape: "",
            effect: ""
        },
        range: {
            value: null,
            units: "touch",
            additional: "",
            per: ""
        },
        uses: {
            value: null,
            max: null,
            per: ""
        },
        isActive: null,
        ability: "",
        actionTarget: "kac",
        actionType: "mwak",
        attackBonus: 0,
        chatFlavor: "",
        critical: {
            parts: [],
            effect: ""
        },
        damage: {
            parts: [{
                    "name": "",
                    "formula": "1d3",
                    "operator": "",
                    "types": {
                        "acid": false,
                        "bludgeoning": false,
                        "cold": false,
                        "electricity": false,
                        "fire": false,
                        "healing": false,
                        "piercing": false,
                        "slashing": true,
                        "sonic": false
                    }
                }]
        },
        formula: "",
        save: {
            type: "",
            dc: "",
            descriptor: "negate"
        },
        descriptors: [],
        capacity: {
            value: null,
            max: null
        },
        usage: {
            value: null,
            per: ""
        },
        modifiers: [],
        container: {
            contents: [],
            storage: [],
            isOpen: true,
            includeContentsInWealthCalculation: true
        },
        weaponType: "basicM",
        weaponCategory: "uncategorized",
        special: "",
        properties: {
            aeon: false,
            amm: false,
            analog: false,
            antibiological: false,
            archaic: false,
            aurora: false,
            automatic: false,
            blast: false,
            block: false,
            boost: false,
            breach: false,
            breakdown: false,
            bright: false,
            buttressing: false,
            cluster: false,
            conceal: false,
            deconstruct: false,
            deflect: false,
            disarm: false,
            double: false,
            drainCharge: false,
            echo: false,
            entangle: false,
            explode: false,
            extinguish: false,
            feint: false,
            fiery: false,
            firstArc: false,
            flexibleLine: false,
            force: false,
            freeHands: false,
            fueled: false,
            gearArray: false,
            grapple: false,
            gravitation: false,
            guided: false,
            harrying: false,
            holyWater: false,
            hybrid: false,
            ignite: false,
            indirect: false,
            injection: false,
            integrated: false,
            line: false,
            living: false,
            lockdown: false,
            "mind-affecting": false,
            mine: false,
            mire: false,
            modal: false,
            necrotic: false,
            nonlethal: false,
            one: false,
            operative: false,
            penetrating: false,
            polarize: false,
            polymorphic: false,
            powered: false,
            professional: false,
            propel: false,
            punchGun: false,
            qreload: false,
            radioactive: false,
            reach: false,
            recall: false,
            regrowth: false,
            relic: false,
            reposition: false,
            scramble: false,
            shape: false,
            shatter: false,
            shells: false,
            shield: false,
            sniper: false,
            stun: false,
            subtle: false,
            sunder: false,
            swarm: false,
            tail: false,
            teleportive: false,
            thought: false,
            throttle: false,
            thrown: false,
            thruster: false,
            trip: false,
            two: false,
            unbalancing: false,
            underwater: false,
            unwieldy: false,
            variantBoost: false,
            wideLine: false
        },
        proficient: true,
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img: "icons/skills/melee/blood-slash-foam-red.webp",
    effects: []
};
//# sourceMappingURL=Weapons.js.map