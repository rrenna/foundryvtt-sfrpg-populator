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

        // Set new CR
        actorUpdate["data.details.cr"] = context.CR
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
        const kacDiff = this.diffOf(
            "KAC",
            approximateCurrentMainRow,
            targetMainRow
        )
        const newKACValue = actor.data.data.attributes.kac.value + kacDiff
        actorUpdate["data.attributes.kac.value"] = newKACValue
        output.push([
            "Set KAC to " +
                newKACValue +
                " (from " +
                actor.data.data.attributes.kac.value +
                ")",
            ""
        ])

        // Set new EAC
        const eacDiff = this.diffOf(
            "EAC",
            approximateCurrentMainRow,
            targetMainRow
        )
        const newEACValue = actor.data.data.attributes.eac.value + eacDiff
        actorUpdate["data.attributes.eac.value"] = newEACValue
        output.push([
            "Set EAC to " +
                newEACValue +
                " (from " +
                actor.data.data.attributes.eac.value +
                ")",
            ""
        ])

        // Fort
        const fortDiff = this.diffOf(
            "fort",
            approximateCurrentMainRow,
            targetMainRow
        )
        const newFortValue = actor.data.data.attributes.fort.bonus + fortDiff
        actorUpdate["data.attributes.fort.bonus"] = newFortValue
        output.push([
            "Set fort to " +
                newFortValue +
                " (from " +
                actor.data.data.attributes.fort.value +
                ")",
            ""
        ])

        // Reflex
        const reflexDiff = this.diffOf(
            "reflex",
            approximateCurrentMainRow,
            targetMainRow
        )
        const newReflexValue =
            actor.data.data.attributes.reflex.bonus + reflexDiff
        actorUpdate["data.attributes.reflex.bonus"] = newReflexValue
        output.push([
            "Set reflex to " +
                newReflexValue +
                " (from " +
                actor.data.data.attributes.reflex.value +
                ")",
            ""
        ])

        // Will
        const willDiff = this.diffOf(
            "will",
            approximateCurrentMainRow,
            targetMainRow
        )
        const newWillValue = actor.data.data.attributes.will.bonus + willDiff
        actorUpdate["data.attributes.will.bonus"] = newWillValue
        output.push([
            "Set will to " +
                newWillValue +
                " (from " +
                actor.data.data.attributes.will.value +
                ")",
            ""
        ])

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
}
