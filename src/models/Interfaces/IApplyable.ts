import NPCCreationContext from "../NPCCreationContext.js"
import Adjuster from "../adjusters/Adjuster.js"

// The output (a string tuple of an apply action, usually describing what was done)
export type ApplyOutput = [string, string]

export async function apply(
    actor,
    context: NPCCreationContext,
    ...applyables: IApplyable[]
): Promise<ApplyOutput> {
    for (let applyable of applyables) {
        await applyable.apply(actor, context)
    }

    // TODO: Collect output
    return ["", ""]
}

export interface IApplyable {
    apply(actor, context: NPCCreationContext): Promise<ApplyOutput>
}
