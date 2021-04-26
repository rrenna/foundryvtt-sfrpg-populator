import { Randomizer } from "../Randomizer.js";
import { backpackTemplate, canteenTemplate, credStickTemplate, intoxicantMinorTemplate, Items, lighterTemplate, purfumeTemplate, religiousSymbolTemplate, ropeTemplate, upbTemplate } from "../data/Items.js";
import { Utils } from "../utils/Uils.js";
export class ItemFactory {
    // Default size is 3
    static makeItemCollection(size = 3) {
        var itemCollection = [];
        // Every NPC has 2 random items (for now, may change)
        for (var i = 0; i < size; i++) {
            let items = [
                { item: backpackTemplate, percentage: 0.03 },
                { item: canteenTemplate, percentage: 0.03 },
                { item: credStickTemplate, percentage: 0.03 },
                { item: upbTemplate, percentage: 0.03 },
                { item: lighterTemplate, percentage: 0.03 },
                { item: ropeTemplate, percentage: 0.03 },
                { item: purfumeTemplate, percentage: 0.03 },
                { item: intoxicantMinorTemplate, percentage: 0.03 },
                { item: ItemFactory.makeReligiousSymbol(), percentage: 0.06 },
                { item: ItemFactory.makeJunk(), percentage: 0.7 }
            ];
            let winning = Randomizer.pickWinningItem(items).item;
            itemCollection.push(winning);
        }
        return itemCollection;
    }
    static makeReligiousSymbol() {
        let religiousSymbol = Object.assign({}, religiousSymbolTemplate);
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
        ];
        Utils.shuffleArray(gods);
        religiousSymbol.name += " (" + gods[0] + ")";
        return religiousSymbol;
    }
    static makeJunk() {
        var junkItem = Items.junk[Math.floor(Math.random() * Items.junk.length)];
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
        };
    }
}
//# sourceMappingURL=ItemFactory.js.map