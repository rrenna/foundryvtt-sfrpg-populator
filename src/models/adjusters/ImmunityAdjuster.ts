import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import Adjuster from "./Adjuster.js"

type AddConditionImmunity = [immunity: string] | string

export default class ImmunityAdjuster extends Adjuster {
    addConditionImmunity: AddConditionImmunity | undefined

    // Set number of good / master skills
    constructor(immunityAdjuster: Partial<ImmunityAdjuster> = {}) {
        super()
        Object.assign(this, immunityAdjuster)
    }

    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        if (this.addConditionImmunity) {
            if (Array.isArray(this.addConditionImmunity)) {
                context.conditionImmunities.push(this.addConditionImmunity[0])
            } else {
                context.conditionImmunities.push(this.addConditionImmunity)
            }
        }
        // TODO: Construct log from individual adjustors
        return ["", ""]
    }
}
