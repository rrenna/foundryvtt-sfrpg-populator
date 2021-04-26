import SenseAdjuster from "../../models/adjusters/SenseAdjuster.js"
import ImmunityAdjuster from "../../models/adjusters/ImmunityAdjuster.js"
import SaveAdjuster from "../../models/adjusters/SaveAdjuster.js"
import { Save } from "../MonsterCreation.js"

export const SharedAdjusters = {
    Immunities: {
        constructImmunities: new ImmunityAdjuster({
            addConditionImmunity: "construct immunities"
        }),
        drowImmunities: new ImmunityAdjuster({
            addConditionImmunity: "drow immunities"
        }),
        elvenImmunities: new ImmunityAdjuster({
            addConditionImmunity: "elven immunities"
        }),
        mindAffectingEffects: new ImmunityAdjuster({
            addConditionImmunity: "mind-affecting effects"
        })
    },
    Saves: {
        // Quickly add 2 to saves
        fortitudePlus2: new SaveAdjuster({ mutateSave: [Save.fortitude, 2] }),
        reflexPlus2: new SaveAdjuster({ mutateSave: [Save.reflex, 2] }),
        willpowerPlus2: new SaveAdjuster({ mutateSave: [Save.willpower, 2] }),
        // Quickly removes 2 to saves
        fortitudeMinus2: new SaveAdjuster({ mutateSave: [Save.fortitude, -2] }),
        reflexMinus2: new SaveAdjuster({ mutateSave: [Save.reflex, -2] }),
        willpowerMinus2: new SaveAdjuster({ mutateSave: [Save.willpower, -2] })
    },
    Senses: {
        blindsight: new SenseAdjuster({ addSense: ["blindsight"] }),
        darkVision60ft: new SenseAdjuster({ addSense: ["darkvision 60 ft."] }),
        lowLightVision: new SenseAdjuster({ addSense: ["low-light vision"] })
    }
}
