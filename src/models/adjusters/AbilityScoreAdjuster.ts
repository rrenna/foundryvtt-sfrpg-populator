import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import CreationAdjuster from "./CreationAdjuster.js"
import { AbilityScore } from "../../data/AbilityScores.js"
import { INPCData } from "../Interfaces/actors/INPCData.js"

type SetAbilityScore = [abilityScore: AbilityScore, amount: number]

export default class AbilityScoreAdjuster extends CreationAdjuster {
    setAbilityScore: SetAbilityScore | undefined

    // Set ability score value
    constructor(abilityScoreAdjuster: Partial<AbilityScoreAdjuster> = {}) {
        super()
        Object.assign(this, abilityScoreAdjuster)
    }

    async apply(
        actor: Actor<INPCData>,
        context: NPCCreationContext
    ): Promise<ApplyOutput> {
        let output: ApplyOutput = []

        if (this.setAbilityScore) {
            context.abilities.push([
                this.setAbilityScore[0],
                this.setAbilityScore[1]
            ])

            output.push([
                "Set <u>" +
                    this.setAbilityScore[0] +
                    "</u> to " +
                    this.setAbilityScore[1] +
                    ".",
                ""
            ])
        }

        return output
    }
}
