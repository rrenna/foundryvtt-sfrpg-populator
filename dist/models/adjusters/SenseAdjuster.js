import Adjuster from "./Adjuster.js";
export default class SenseAdjuster extends Adjuster {
    // Set number of good / master skills
    constructor(senseAdjuster = {}) {
        super();
        Object.assign(this, senseAdjuster);
    }
    async apply(actor, context) {
        if (this.addSense) {
            if (Array.isArray(this.addSense)) {
                context.senses.push(this.addSense[0]);
            }
            else {
                context.senses.push(this.addSense);
            }
        }
        // TODO: Construct log from individual adjustors
        return ["", ""];
    }
}
//# sourceMappingURL=SenseAdjuster.js.map