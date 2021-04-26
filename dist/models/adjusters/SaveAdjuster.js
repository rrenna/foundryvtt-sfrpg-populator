import Adjuster from "./Adjuster.js";
export default class SaveAdjuster extends Adjuster {
    // Set number of good / master skills
    constructor(saveAdjuster = {}) {
        super();
        Object.assign(this, saveAdjuster);
    }
    async apply(actor, context) {
        if (this.mutateSave) {
            let array = context.mainArrayRow;
            let currentSave = array[this.mutateSave[0]];
            array[this.mutateSave[0]] = currentSave + this.mutateSave[1];
        }
        // TODO: Construct log from individual adjustors
        return ["", ""];
    }
}
//# sourceMappingURL=SaveAdjuster.js.map