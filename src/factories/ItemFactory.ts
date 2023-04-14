import { Randomizer } from "../Randomizer.js"
import {
    backpackTemplate,
    canteenTemplate,
    credStickTemplate,
    intoxicantMinorTemplate,
    Items,
    lighterTemplate,
    purfumeTemplate,
    religiousSymbolTemplate,
    ropeTemplate,
    upbTemplate
} from "../data/Items.js"
import { Utils } from "../utils/Utils.js"

export class ItemFactory {
    // Default size is 3
    public static makeItemCollection(size = 3): IItem[] {
        var itemCollection: IItem[] = [] as IItem[]
        // Every NPC has 2 random items (for now, may change)
        for (var i = 0; i < size; i++) {
            let items = [
                { item: backpackTemplate, percentage: 3 },
                { item: canteenTemplate, percentage: 3 },
                { item: credStickTemplate, percentage: 3 },
                { item: upbTemplate, percentage: 3 },
                { item: lighterTemplate, percentage: 3 },
                { item: ropeTemplate, percentage: 3 },
                { item: purfumeTemplate, percentage: 3 },
                { item: intoxicantMinorTemplate, percentage: 3 },
                { item: ItemFactory.makeReligiousSymbol(), percentage: 6 },
                { item: ItemFactory.makeJunk(), percentage: 70 }
            ]

            let winning = Randomizer.pickWinningItem(items).item
            itemCollection.push(winning)
        }
        return itemCollection
    }

    private static makeReligiousSymbol(): IGoods {
        let religiousSymbol = Object.assign({}, religiousSymbolTemplate)
        var gods = [
            "Abadar",
            "Angradd",
            "Arshea",
            "Asmodeus",
            "Besmara",
            "Calistria",
            "Damoritosh",
            "Desna",
            "Eldest",
            "Eloritu",
            "Groetus",
            "Hylax",
            "Ibra",
            "Iomedae",
            "Lamashtu",
            "Lao Shu Po",
            "Lissala",
            "Nyarlathotep",
            "Oras",
            "Pharasma",
            "Sarenrae",
            "Talavet",
            "The Devourer",
            "Urgathoa",
            "Weydan",
            "Yaraesa",
            "Zon-Kuthon"
        ]
        Utils.shuffleArray(gods)
        religiousSymbol.name += " (" + gods[0] + ")"
        return religiousSymbol
    }

    private static makeJunk(): IGoods {
        var junkItem = Items.junk[Math.floor(Math.random() * Items.junk.length)]
        return {
            name: junkItem.name,
            type: "goods",
            data: {
                description: {
                    chat: "",
                    gmnotes: "",
                    short: "",
                    value: "<p>" + junkItem.description + "</p>",
                    unidentified: ""
                },
                source: "Populator",
                type: "",
                quantity: 1,
                bulk: "L",
                price: 0,
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
            effects: []
        } as IGoods
    }
}
