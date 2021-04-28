import { apply, ApplyOutput, IApplyable } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import { INPCData } from "../Interfaces/actors/INPCData.js"

export default abstract class CreationAdjuster implements IApplyable {
    // Children IApplyables
    children: CreationAdjuster[] = []

    async apply(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ): Promise<ApplyOutput> {
        // Applies children - if set
        let output: ApplyOutput = await apply(actor, context, ...this.children)
        return output
    }
}
