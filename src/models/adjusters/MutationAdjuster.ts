import { ApplyOutput, IApplyable } from "../Interfaces/IApplyable.js"
import NPCMutationContext from "../NPCCreationContext.js"
import { INPCData } from "../Interfaces/actors/INPCData.js"
import { Utils } from "../../utils/Utils.js"
import {
    MonsterCreation,
    MonsterReferenceSymbol
} from "../../data/MonsterCreation.js"
import { AbilityScore } from "../../data/AbilityScores.js"

/// Used to mutate an actor by increasing or decreasing it's CR by
// intelligently adjusting it's object (changing values, adding items)
export default class MutationAdjuster implements IApplyable {
    async apply(
        actor: Actor<INPCData>,
        context: NPCMutationContext
    ): Promise<ApplyOutput> {
        let output: ApplyOutput = []
        let actorUpdate = {}
        
        // default to combatant #TODO maybe just fail instead?
        let monsterReferenceSymbol = "combatant"
        if (context.monsterReferenceSymbol) {
            monsterReferenceSymbol = MonsterReferenceSymbol[context.monsterReferenceSymbol]
        }        

        // Current CR (`number`, 1/3 = `0.3333~`, 1/2 = `0.5`, etc)
        const currentCRNumber = actor.data.data.details.cr
        let currentCR = Utils.CRforNumber(currentCRNumber)
        let targetCR = context.CR

        const approximateCurrentMainRow = MonsterCreation.arrays[
            monsterReferenceSymbol
        ].main[currentCR] as IMainArrayRow
        const targetMainRow = MonsterCreation.arrays[monsterReferenceSymbol]
            .main[targetCR] as IMainArrayRow

        // Set new name
        actorUpdate["name"] = "Mutated " + actor.name

        // Set new CR
        actorUpdate["data.details.cr"] = Utils.numberForCR(context.CR)
        output.push(["Set CR to " + context.CR, ""])

        // Set new HP
        const hpDiff = this.diffOf(
            "HP",
            approximateCurrentMainRow,
            targetMainRow
        )
        const newHPValue = actor.data.data.attributes.hp.max + hpDiff
        actorUpdate["data.attributes.hp.max"] = newHPValue
        actorUpdate["data.attributes.hp.value"] = newHPValue
        output.push(["Set HP to " + newHPValue, ""])

        // Set new KAC
        this.applyDiffForKey(
            "KAC",
            actor.data.data.attributes.kac.value,
            "data.attributes.kac.value",
            approximateCurrentMainRow,
            targetMainRow,
            actorUpdate,
            output
        )

        // Set new EAC
        this.applyDiffForKey(
            "EAC",
            actor.data.data.attributes.eac.value,
            "data.attributes.eac.value",
            approximateCurrentMainRow,
            targetMainRow,
            actorUpdate,
            output
        )

        // Fort
        this.applyDiffForKey(
            "fort",
            actor.data.data.attributes.fort.bonus,
            "data.attributes.fort.bonus",
            approximateCurrentMainRow,
            targetMainRow,
            actorUpdate,
            output
        )

        // Reflex
        this.applyDiffForKey(
            "reflex",
            actor.data.data.attributes.reflex.bonus,
            "data.attributes.reflex.bonus",
            approximateCurrentMainRow,
            targetMainRow,
            actorUpdate,
            output
        )

        // Will
        this.applyDiffForKey(
            "will",
            actor.data.data.attributes.will.bonus,
            "data.attributes.will.bonus",
            approximateCurrentMainRow,
            targetMainRow,
            actorUpdate,
            output
        )

        // Ability Scores
        this.applyAbilityScoreDiffAndInit(
            actor,
            approximateCurrentMainRow,
            targetMainRow,
            actorUpdate,
            output
        )

        // Update actor
        await actor.update(actorUpdate)

        return output
    }

    // Private Methods
    // Helper which finds the diff between two main array rows on a specific key
    private diffOf(key: string, from: IMainArrayRow, to: IMainArrayRow) {
        const toValue = to[key]
        const fromValue = from[key]
        return toValue - fromValue
    }

    private applyDiffForKey(
        key: string,
        existingValue: number,
        saveKeyPath: string,
        currrentRow: IMainArrayRow,
        targetRow: IMainArrayRow,
        actorUpdate: any,
        output: any
    ) {
        const diff = this.diffOf(key, currrentRow, targetRow)
        const newValue = existingValue + diff
        actorUpdate[saveKeyPath] = newValue
        output.push([
            "Set " + key + " to " + newValue + " (from " + existingValue + ")",
            ""
        ])
    }

    private applyAbilityScoreDiffAndInit(
        actor: Actor<INPCData>,
        currrentRow: IMainArrayRow,
        targetRow: IMainArrayRow,
        actorUpdate: any,
        output: any
    ) {
        // Find diffs
        let abilityDiffs: number[] = [
            targetRow.abilityMods[0] - currrentRow.abilityMods[0],
            targetRow.abilityMods[1] - currrentRow.abilityMods[1],
            targetRow.abilityMods[2] - currrentRow.abilityMods[2]
        ]

        // Apply diffs to top three ability scores
        let abilityTuples: [abilityScore: string, value: number][] = []
        for (const abilityScore in AbilityScore) {
            let abilityScoreKey: string = AbilityScore[abilityScore]

            abilityTuples.push([
                abilityScoreKey,
                actor.data.data.abilities[abilityScoreKey].mod
            ])
        }

        // Sort ability scores
        abilityTuples.sort((first, second) => {
            if (first[1] < second[1]) return 1
            return -1
        })

        // Applied to top three abilities
        for (let i = 0; i < 3; i++) {
            const abilityKey = abilityTuples[i][0]
            const existingMod = actor.data.data.abilities[abilityKey].mod
            const newAbilityMod = existingMod + abilityDiffs[i]

            // Apply new initiative
            // If we've touched dex mod, set init to match
            if (abilityKey === AbilityScore.dexterity) {
                const currentInitiative = actor.data.data.attributes.init.total
                const newInititatve = currentInitiative + abilityDiffs[i]
                actorUpdate["data.attributes.init.total"] = newInititatve
                output.push([
                    "Set initiative to " +
                        newInititatve +
                        " (to match increase or decrease of the dexterity modifier)",
                    "Unless you increase it with the Improved Initiative feat, a graft, or an ad hoc adjustment, the NPC’s\n" +
                        "initiative bonus is equal to its Dexterity modifier."
                ])
            }

            // New values applied
            actorUpdate["data.abilities." + abilityKey + ".mod"] = newAbilityMod
            output.push([
                "Set " +
                    abilityKey +
                    " mod to " +
                    newAbilityMod +
                    " (from " +
                    existingMod +
                    ")",
                ""
            ])
        }
    }
}
