import { Utils } from "../utils/Utils.js";
export default class UniversalCreatureRule {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    async apply(actor, context) {
        // By default when applied will add the appropriate feature to npc
        let feature = await Utils.fuzzyFindUniversalCreatureRule(this.name);
        if (feature)
            context.itemsToAdd.push(feature);
        // Default is just a basic log indicating no modifications
        return [
            [
                "Applied <u>" +
                    this.name +
                    "</u> universal creature rule (no modifications).",
                this.description
            ]
        ];
    }
}
//# sourceMappingURL=UniversalCreatureRule.js.map