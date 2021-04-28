import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import CreationAdjuster from "./CreationAdjuster.js"
import { INPCData } from "../Interfaces/actors/INPCData.js"

type AddConditionImmunity = [immunity: string] | string

export default class ImmunityAdjuster extends CreationAdjuster {
    addConditionImmunity: AddConditionImmunity | undefined

    // Set number of good / master skills
    constructor(immunityAdjuster: Partial<ImmunityAdjuster> = {}) {
        super()
        Object.assign(this, immunityAdjuster)
    }

    async apply(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ): Promise<ApplyOutput> {
        if (this.addConditionImmunity) {
            if (Array.isArray(this.addConditionImmunity)) {
                context.conditionImmunities.push(this.addConditionImmunity[0])
            } else {
                context.conditionImmunities.push(this.addConditionImmunity)
            }
        }
        // TODO: Construct log from individual adjustors
        return []
    }
}
