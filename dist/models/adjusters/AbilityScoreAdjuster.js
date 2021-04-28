import CreationAdjuster from "./CreationAdjuster.js";
export default class AbilityScoreAdjuster extends CreationAdjuster {
    // Set ability score value
    constructor(abilityScoreAdjuster = {}) {
        super();
        Object.assign(this, abilityScoreAdjuster);
    }
    async apply(actor, context) {
        let output = [];
        if (this.setAbilityScore) {
            context.abilities.push([
                this.setAbilityScore[0],
                this.setAbilityScore[1]
            ]);
            output.push([
                "Set <u>" +
                    this.setAbilityScore[0] +
                    "</u> to " +
                    this.setAbilityScore[1] +
                    ".",
                ""
            ]);
        }
        return output;
    }
}
//# sourceMappingURL=AbilityScoreAdjuster.js.map