import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import Adjuster from "./Adjuster.js"
import { AbilityScore } from "../../data/AbilityScores.js"

type SetAbilityScore = [abilityScore: AbilityScore, amount: number]

export default class AbilityScoreAdjuster extends Adjuster {
    setAbilityScore: SetAbilityScore | undefined

    // Set ability score value
    constructor(abilityScoreAdjuster: Partial<AbilityScoreAdjuster> = {}) {
        super()
        Object.assign(this, abilityScoreAdjuster)
    }

    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        if (this.setAbilityScore) {
            context.abilities.push([
                this.setAbilityScore[0],
                this.setAbilityScore[1]
            ])
        }
        // TODO: Construct log from individual adjustors
        return ["", ""]
    }
}
