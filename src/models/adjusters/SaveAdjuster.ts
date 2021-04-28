import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import CreationAdjuster from "./CreationAdjuster.js"
import { Save } from "../../data/Saves.js"
import { INPCData } from "../Interfaces/actors/INPCData.js"

type MutateSave = [saveType: Save, amount: number]

export default class SaveAdjuster extends CreationAdjuster {
    mutateSave: MutateSave | undefined

    // Set number of good / master skills
    constructor(saveAdjuster: Partial<SaveAdjuster> = {}) {
        super()
        Object.assign(this, saveAdjuster)
    }

    async apply(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ): Promise<ApplyOutput> {
        let output: ApplyOutput = []

        if (this.mutateSave) {
            let array = context.mainArrayRow
            let currentSave = array[this.mutateSave[0]]
            const newSaveValue = currentSave + this.mutateSave[1]
            array[this.mutateSave[0]] = newSaveValue

            output.push([
                "Set " + this.mutateSave[0] + " to " + newSaveValue + ".",
                ""
            ])
        }

        return output
    }
}
