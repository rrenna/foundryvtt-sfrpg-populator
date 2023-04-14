import ISpecialAbility from "./Interfaces/ISpecialAbility.js"
import NPCCreationContext from "./NPCCreationContext.js"
import { Utils } from "../utils/Utils.js"
import { ApplyOutput } from "./Interfaces/IApplyable.js"

export default class UniversalCreatureRule implements ISpecialAbility {
    name: string
    description: string

    constructor(name: string, description: string) {
        this.name = name
        this.description = description
    }

    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        // By default when applied will add the appropriate feature to npc
        let feature = await Utils.fuzzyFindUniversalCreatureRule(this.name)
        if (feature) context.itemsToAdd.push(feature)

        // Default is just a basic log indicating no modifications
        return [
            [
                "Applied <u>" +
                    this.name +
                    "</u> universal creature rule (no modifications).",
                this.description
            ]
        ]
    }
}
