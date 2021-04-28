import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import CreationAdjuster from "./CreationAdjuster.js"
import { INPCData } from "../Interfaces/actors/INPCData.js"

type AddSense = [sense: string] | string

export default class SenseAdjuster extends CreationAdjuster {
    addSense: AddSense | undefined

    // Set number of good / master skills
    constructor(senseAdjuster: Partial<SenseAdjuster> = {}) {
        super()
        Object.assign(this, senseAdjuster)
    }

    async apply(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ): Promise<ApplyOutput> {
        let output: ApplyOutput = []

        if (this.addSense) {
            let senseToAdd: string = ""
            if (Array.isArray(this.addSense)) {
                senseToAdd = this.addSense[0]
            } else {
                senseToAdd = this.addSense
            }

            context.senses.push(senseToAdd)

            output.push(["Added " + senseToAdd + ".", ""])
        }

        return output
    }
}
