import NPCCreationContext from "../NPCCreationContext.js"
import CreationAdjuster from "../adjusters/CreationAdjuster.js"
import { IContext } from "./IContext.js"
import { INPCData } from "./actors/INPCData.js"

// The output (a string tuple of an apply action, usually describing what was done)
export type ApplyOutput = [string, string][]

export async function apply(
    actor: Actor<INPCData>,
    context: IContext,
    ...applyables: IApplyable[]
): Promise<ApplyOutput> {
    let output: ApplyOutput = []
    for (let applyable of applyables) {
        let applyableOutput = await applyable.apply(actor, context)
        output.push(...applyableOutput)
    }
    // Return all output
    return output
}

export interface IApplyable {
    children?: IApplyable[] // sub-applyables which are applied within the parent
    apply(actor, context: IContext): Promise<ApplyOutput>
}
