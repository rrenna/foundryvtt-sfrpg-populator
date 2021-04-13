import { Randomizer } from "./Randomizer.js";
import { Items } from "./data/Items.js";

export class ItemFactory {

    // Default is 3
    static makeItemCollection(size = 3) {

        var itemCollection = [];
        // Every NPC has 2 random items (for now, may change)
        for(var i = 0; i < size; i++) {

            let items = [
                {item: Items.credStickTemplate, percentage: 0.05},
                {item: Items.upbTemplate, percentage: 0.05},
                {item: Items.lighterTemplate, percentage: 0.05},
                {item: Items.purfumeTemplate, percentage: 0.05},
                {item: Items.intoxicantMinorTemplate, percentage: 0.05},
                {item: ItemFactory.makeJunk(), percentage: 0.75}
            ]

            itemCollection.push(Randomizer.pickWinningItem(items).item );
        }
        return itemCollection;
    }

    static makeJunk() {

        var junkItem = Items.junk[Math.floor(Math.random() * Items.junk.length)];

        return {
            "name": junkItem.name,
            "type": "goods",
            "data": {
                "description": {
                    "chat": "",
                    "gmnotes": "",
                    "short": "",
                    "value": "<p>" + junkItem.description + "</p>",
                    "unidentified": ""
                },
                "source": "Populator",
                "type": "",
                "quantity": 1,
                "bulk": "L",
                "price": 0,
                "level": 1,
                "attuned": false,
                "equipped": false,
                "equippable": false,
                "identified": true,
                "attributes": {
                    "sturdy": false,
                    "customBuilt": false,
                    "size": "medium",
                    "dex": {
                        "mod": ""
                    },
                    "hp": {
                        "value": 6,
                        "max": ""
                    },
                    "hardness": {
                        "value": ""
                    },
                    "ac": {
                        "value": ""
                    }
                },
                "modifiers": [],
                "damage": {
                    "parts": []
                },
                "critical": {
                    "parts": []
                },
                "abilityMods": {
                    "parts": []
                }
            },
            "flags": {},
            "effects": []
        }
    }
}