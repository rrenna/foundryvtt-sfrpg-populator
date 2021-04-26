// The Adjustment Special Abilitites outlined in Alien Archive 1 pg. 142
import NPCCreationContext from "./NPCCreationContext.js"
import ISpecialAbility from "./Interfaces/ISpecialAbility.js"
import { ApplyOutput } from "./Interfaces/IApplyable.js"

export default class AdjustmentSpecialAbility implements ISpecialAbility {
    name: string
    description: string

    constructor(name: string, description: string) {
        this.name = name
        this.description = description
    }

    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        // Stub
        return ["", ""]
    }
}
