// Collection of items used to generate random inventory of NPCs
export const Items = {
    junk: [
        { name: "Old ticket to see Strawberry Machine Cake", description: "" },
        {
            name: "EJ Corp branded stapler",
            description:
                "'Take it to the EJ' is written on the bottom of this red stapler."
        },
        { name: "Paper folder covered by random stickers", description: "" },
        { name: "Small hand mirror", description: "A smudged mirror." },
        { name: "Duct tape", description: "" },
        { name: "Personal datapad", description: "" },
        { name: "Walking stick", description: "" },
        {
            name: "Bottle of water",
            description: "Water in a plastic bottle. Mostly empty."
        },
        {
            name: "Stylus",
            description: "A stylus for an unrecognized technological device."
        },
        {
            name: "Memory card",
            description:
                "A memory card for an unrecognized technological device."
        },
        { name: "Black marker", description: "A slightly used marker." },
        { name: "Red marker", description: "A slightly used marker." },
        { name: "Blue marker", description: "A slightly used marker." },
        { name: "Blank paper", description: "A sheet of blank paper." },
        {
            name: "Broken battery cell",
            description: "A battery cell in need of repair and out of power."
        },
        {
            name: "Keychain",
            description:
                "A keychain holding keys for a series of unknown archaic locks."
        },
        { name: "Headphones", description: "A wired set of headphones." },
        {
            name: "A faux-gold ring",
            description: "Some strange elven script is written inside the band."
        },
        {
            name: "Lint",
            description: "An accumulation of fibers and other materials."
        },
        {
            name: "ID card",
            description:
                "A semi-official ID card proving membership in a local club."
        },
        {
            name: "Candy",
            description: "Wrapped candy which appears to be from a restaurant."
        },
        { name: "Paper clips", description: "Two paper clips." },
        { name: "Onyx hair comb", description: "A jet black hair comb." },
        {
            name: "Jar of dried seeds",
            description: "A jar containing a few dried seeds."
        }
    ]
}

// Templates
// Some Items are easier to store as template which are modified/customized rather than searching compendiums
// NOTE: Various items used to generate inventory for NPCs
export const backpackTemplate = {
    name: "Backpack, Consumer",
    type: "container",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                '<p><span id="ctl00_MainContent_DataListOtherItems_ctl00_LabelName">When wearing a properly fitted consumer backpack, you treat your Strength score as 1 higher for the purpose of determining your carrying capacity.&nbsp;</span></p>',
            unidentified: ""
        },
        source: "Core Rulebook, pg 230",
        type: "",
        quantity: 1,
        bulk: "1",
        price: 3,
        level: 1,
        attuned: false,
        equipped: true,
        equippable: true,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [
            {
                name: "Backpack, Consumer",
                modifier: 1,
                type: "enhancement",
                effectType: "bulk",
                valueAffected: "",
                enabled: true,
                source: "Core Rulebook, pg 230",
                notes: "",
                modifierType: "constant",
                condition: "",
                subtab: "misc",
                _id: "395f0b72-1b0a-4845-ac86-f5dc5ce847f8"
            }
        ],
        container: {
            contents: [],
            storage: [
                {
                    type: "bulk",
                    subtype: "",
                    amount: 2,
                    acceptsType: [
                        "weapon",
                        "equipment",
                        "goods",
                        "consumable",
                        "container",
                        "technological",
                        "fusion",
                        "upgrade",
                        "augmentation",
                        "magic"
                    ],
                    affectsEncumbrance: true,
                    weightProperty: "bulk"
                }
            ],
            isOpen: true
        },
        equippedBulkMultiplier: 0,
        damage: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/backpack-consumer.webp",
    effects: []
}
export const canteenTemplate = {
    name: "Canteen",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                '<p><span id="ctl00_MainContent_DataListOtherItems_ctl00_LabelName">This hollow plastic or metal container can hold up to a half gallon of liquid.&nbsp;</span></p>',
            unidentified: ""
        },
        source: "Armory",
        type: "",
        quantity: 1,
        bulk: "L",
        price: 1,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        },
        critical: {
            parts: []
        },
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/canteen.webp",
    effects: []
} as IGoods
export const credStickTemplate = {
    name: "Credstick (25 credits)",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                '<p><span class="fontstyle0">Fortunately, the widespread use of the credstick circumvents<br>issues related to spending and storing currency. Flat and roughly<br>the size of a @Compendium[sfrpg.races.AMBcyDZDtJ1OOzh3]{Human} finger, ranging from cheap and disposable to<br>elaborate works of art, credsticks are a convenient way to carry<br>and spend money.</span></p>',
            unidentified: ""
        },
        source: "CRB pg. 166",
        type: "",
        quantity: 1,
        bulk: "L",
        price: 25,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        },
        critical: {
            parts: []
        },
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/credstick.webp",
    effects: []
} as IGoods
export const upbTemplate = {
    name: "UPB (25)",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                "<p>A universal polymer base, or UPB, is the basis for most technology in the Pact Worlds, the Veskarium, and many other systems. Each UPB is a tiny multifunction component, not much larger than a grain of rice, capable of being configured to act as a brace, capacitor, circuit, diode, fastener, insulator, lens, modulator, pipe, resistor, and dozens of other constituent parts. UPBs can even be spun out into fabric, broken down into component chemicals, reconstituted into new chemicals, or supplemented with base materials (such as dirt or sand) to form massive braces or walls. The right combination of hundreds or even thousands of UPBs can create everything from a comm unit to a laser weapon to powered armor. In their raw form, UPBs have a bulk of 1 per 1,000 UPBs, though when aligned and configured they can easily take up less bulk, and when configured for a specific purpose that calls for a minimum size and bracing (possibly combining them with inert materials), they can have a higher bulk.<br /><br />UPBs are so ubiquitous that they are usable as currency in many major settlements and trade hubs. While credsticks are a more convenient and secure way to carry value, UPBs have the advantage of direct utility and untraceability. They are a popular way to pay smugglers and criminals, but they are also useful for trade missions to systems with UPB technology that don&rsquo;t use credits as currency. The value of the Pact Worlds&rsquo; credit is based on the economic utility of a single UPB.</p>",
            unidentified: ""
        },
        source: "CRB pg. 233",
        type: "",
        quantity: 1,
        bulk: "1",
        price: 25,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        },
        critical: {
            parts: []
        },
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/upb.webp",
    effects: []
} as IGoods
export const lighterTemplate = {
    name: "Lighter",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                '<p><span id="ctl00_MainContent_DataListOtherItems_ctl00_LabelName">A lighter is a small canister containing a pressurized flammable liquid gas. When the lighter is activated, an electric arc ignites the gas, creating a tiny flame. You can light a small flame (such as a candle) as a swift action. Lighting a full fire is at least a full action or more, depending on the size and fuel of the fire.&nbsp;</span></p>',
            unidentified: ""
        },
        source: "Armory",
        type: "",
        quantity: 1,
        bulk: "L",
        price: 1,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        },
        critical: {
            parts: []
        },
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/lighter.webp",
    effects: []
} as IGoods
export const purfumeTemplate = {
    name: "Perfume, Standard",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                "<h1>Perfume</h1>\n<p>There is an immeasurable variety of perfumes and colognes in the galaxy, most tailored to the aesthetics of specific races with olfactory senses. A single dose of perfume lasts 1 hour, and a typical bottle of perfume contains 10 doses.</p>\n<p>&nbsp;</p>\n<p><strong>Standard aromas have a pleasant smell and can convey an air of hygiene, status, and wealth.</strong></p>",
            unidentified: ""
        },
        source: "AR pg. 131",
        type: "",
        quantity: 1,
        bulk: "L",
        price: 50,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        },
        critical: {
            parts: []
        },
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img:
        "systems/sfrpg/icons/equipment/magic%20items/serum-of-appearance-change.webp",
    effects: []
} as IGoods
export const intoxicantMinorTemplate = {
    name: "Intoxicant, Minor",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                '<p><span id="ctl00_MainContent_DataListOtherItems_ctl00_LabelName">The price and bulk listed here is of a single serving of an intoxicating beverage or inhaled substance, which in the Pact Worlds is most often alcohol or tobacco. An intoxicant’s potency can be minor or superior. A minor intoxicant might be beer or wine, which takes a few servings to cause any physiological effects. A superior intoxicant is usually a strong spirit, such as whiskey, that can start producing effects after a single serving. Unlike @Compendium[sfrpg.rules.aKqRtg165rAly1Cc]{Drugs}, intoxicants are usually not addictive, although a GM might rule that a PC who partakes of too much of an intoxicant on a regular basis might begin to suffer the effects of an addictive @Compendium[sfrpg.rules.aKqRtg165rAly1Cc]{Drug} (as described in @Compendium[sfrpg.rules.JaRMioj4isNp7r1P]{Afflictions} on page 417).&nbsp;</span></p>',
            unidentified: ""
        },
        source: "Core Rulebook",
        type: "",
        quantity: 1,
        bulk: "L",
        price: 1,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        },
        critical: {
            parts: []
        },
        abilityMods: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/intoxicant.webp",
    effects: []
} as IGoods
export const religiousSymbolTemplate = {
    name: "Religious Symbol",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                '<p><span id="ctl00_MainContent_DataListOtherItems_ctl00_LabelName">A religious symbol is a physical representation of a sacred image associated with a specific deity or religion, often worn as an amulet or badge. Each deity and religion has its own unique religious symbol. Religious symbols are usually mass-produced from cheap materials, such as plastic or thin metal, but they can be crafted out of other materials as well, with prices dependent on the material used. This item can also be used to represent badges or symbols of nonreligious organizations and groups.&nbsp;</span></p>',
            unidentified: ""
        },
        source: "Armory",
        type: "",
        quantity: 1,
        bulk: "L",
        price: 2,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/religious-symbol.webp",
    effects: []
} as IGoods
export const ropeTemplate = {
    name: "Rope",
    type: "goods",
    data: {
        description: {
            chat: "",
            gmnotes: "",
            short: "",
            value:
                '<p><span id="ctl00_MainContent_DataListOtherItems_ctl00_LabelName">Synthetic rope is exceptionally durable, elastic, and specifically designed to be easy to grip and climb. Although it lacks the strength and durability of cable lines, synthetic rope is significantly cheaper and lighter than those alternatives.&nbsp;</span></p>',
            unidentified: ""
        },
        source: "AR pg. 131",
        type: "",
        quantity: 1,
        bulk: "L",
        price: 1,
        level: 1,
        attuned: false,
        equipped: false,
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
                max: ""
            },
            hardness: {
                value: ""
            },
            ac: {
                value: ""
            }
        },
        modifiers: [],
        damage: {
            parts: []
        }
    },
    flags: {},
    img: "systems/sfrpg/icons/equipment/goods/rope.webp",
    effects: []
} as IGoods
