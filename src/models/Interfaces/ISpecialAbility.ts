import NPCCreationContext from "../NPCCreationContext.js"
import { ApplyOutput, IApplyable } from "./IApplyable.js"

export default interface ISpecialAbility extends IApplyable {
    name: string
    apply(actor, context: NPCCreationContext): Promise<ApplyOutput>
}
