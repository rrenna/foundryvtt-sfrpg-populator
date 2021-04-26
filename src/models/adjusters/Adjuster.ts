import { ApplyOutput, IApplyable } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"

export default abstract class Adjuster implements IApplyable {
    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        // stub
        return ["", ""]
    }
}
