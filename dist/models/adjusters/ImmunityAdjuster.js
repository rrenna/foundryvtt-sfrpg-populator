import CreationAdjuster from "./CreationAdjuster.js";
export default class ImmunityAdjuster extends CreationAdjuster {
    // Set number of good / master skills
    constructor(immunityAdjuster = {}) {
        super();
        Object.assign(this, immunityAdjuster);
    }
    async apply(actor, context) {
        if (this.addConditionImmunity) {
            if (Array.isArray(this.addConditionImmunity)) {
                context.conditionImmunities.push(this.addConditionImmunity[0]);
            }
            else {
                context.conditionImmunities.push(this.addConditionImmunity);
            }
        }
        // TODO: Construct log from individual adjustors
        return [];
    }
}
//# sourceMappingURL=ImmunityAdjuster.js.map