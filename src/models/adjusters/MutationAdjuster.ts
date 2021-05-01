import { ApplyOutput, IApplyable } from "../Interfaces/IApplyable.js"
import NPCMutationContext from "../NPCCreationContext.js"
import { INPCData } from "../Interfaces/actors/INPCData.js"
import { Utils } from "../../utils/Uils.js"
import {
    MonsterCreation,
    MonsterReferenceSymbol
} from "../../data/MonsterCreation.js"

/// Used to mutate an actor by increasing or decreasing it's CR by
// intelligently adjusting it's object (changing values, adding items)
export default class MutationAdjuster implements IApplyable {
    async apply(
        actor: Actor<INPCData>,
        context: NPCMutationContext
    ): Promise<ApplyOutput> {
        let output: ApplyOutput = []
        let actorUpdate = {}
        const monsterReferenceSymbol =
            MonsterReferenceSymbol[context.monsterReferenceSymbol]
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
        this.applyAbilityScoreDiff(
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

    private applyAbilityScoreDiff(
        actor: Actor<INPCData>,
        currrentRow: IMainArrayRow,
        targetRow: IMainArrayRow,
        actorUpdate: any,
        output: any
    ) {
        // Find diffs
        let firstAbilityDiff =
            targetRow.abilityMods[0] - currrentRow.abilityMods[0]
        let secondAbilityDiff =
            targetRow.abilityMods[1] - currrentRow.abilityMods[1]
        let thirdAbilityDiff =
            targetRow.abilityMods[2] - currrentRow.abilityMods[2]

        // Apply diffs to top three ability scores
        //actor.data.
        console.log("")
    }
}
