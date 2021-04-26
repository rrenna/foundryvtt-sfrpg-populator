import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import Adjuster from "./Adjuster.js"

type AddSense = [sense: string] | string

export default class SenseAdjuster extends Adjuster {
    addSense: AddSense | undefined

    // Set number of good / master skills
    constructor(senseAdjuster: Partial<SenseAdjuster> = {}) {
        super()
        Object.assign(this, senseAdjuster)
    }

    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        if (this.addSense) {
            if (Array.isArray(this.addSense)) {
                context.senses.push(this.addSense[0])
            } else {
                context.senses.push(this.addSense)
            }
        }

        // TODO: Construct log from individual adjustors
        return ["", ""]
    }
}
