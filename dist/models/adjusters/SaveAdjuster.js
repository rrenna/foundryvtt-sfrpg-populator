import CreationAdjuster from "./CreationAdjuster.js";
export default class SaveAdjuster extends CreationAdjuster {
    // Set number of good / master skills
    constructor(saveAdjuster = {}) {
        super();
        Object.assign(this, saveAdjuster);
    }
    async apply(actor, context) {
        let output = [];
        if (this.mutateSave) {
            let array = context.mainArrayRow;
            let currentSave = array[this.mutateSave[0]];
            const newSaveValue = currentSave + this.mutateSave[1];
            array[this.mutateSave[0]] = newSaveValue;
            output.push([
                "Set " + this.mutateSave[0] + " to " + newSaveValue + ".",
                ""
            ]);
        }
        return output;
    }
}
//# sourceMappingURL=SaveAdjuster.js.map