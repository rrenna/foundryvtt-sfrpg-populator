import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import Adjuster from "./Adjuster.js"
import { Save } from "../../data/MonsterCreation.js"

type MutateSave = [saveType: Save, amount: number]

export default class SaveAdjuster extends Adjuster {
    mutateSave: MutateSave | undefined

    // Set number of good / master skills
    constructor(saveAdjuster: Partial<SaveAdjuster> = {}) {
        super()
        Object.assign(this, saveAdjuster)
    }

    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        if (this.mutateSave) {
            let array = context.mainArrayRow
            let currentSave = array[this.mutateSave[0]]
            array[this.mutateSave[0]] = currentSave + this.mutateSave[1]
        }

        // TODO: Construct log from individual adjustors
        return ["", ""]
    }
}
