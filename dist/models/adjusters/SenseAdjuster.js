import CreationAdjuster from "./CreationAdjuster.js";
export default class SenseAdjuster extends CreationAdjuster {
    // Set number of good / master skills
    constructor(senseAdjuster = {}) {
        super();
        Object.assign(this, senseAdjuster);
    }
    async apply(actor, context) {
        let output = [];
        if (this.addSense) {
            let senseToAdd = "";
            if (Array.isArray(this.addSense)) {
                senseToAdd = this.addSense[0];
            }
            else {
                senseToAdd = this.addSense;
            }
            context.senses.push(senseToAdd);
            output.push(["Added " + senseToAdd + ".", ""]);
        }
        return output;
    }
}
//# sourceMappingURL=SenseAdjuster.js.map