import Adjuster from "./Adjuster.js";
export default class AbilityScoreAdjuster extends Adjuster {
    // Set ability score value
    constructor(abilityScoreAdjuster = {}) {
        super();
        Object.assign(this, abilityScoreAdjuster);
    }
    async apply(actor, context) {
        if (this.setAbilityScore) {
            context.abilities.push([
                this.setAbilityScore[0],
                this.setAbilityScore[1]
            ]);
        }
        // TODO: Construct log from individual adjustors
        return ["", ""];
    }
}
//# sourceMappingURL=AbilityScoreAdjuster.js.map