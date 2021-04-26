import SenseAdjuster from "../../models/adjusters/SenseAdjuster.js";
import ImmunityAdjuster from "../../models/adjusters/ImmunityAdjuster.js";
export const CommonAdjusters = {
    Immunities: {
        constructImmunities: new ImmunityAdjuster({
            addConditionImmunity: ["construct immunities"]
        }),
        drowImmunities: new ImmunityAdjuster({
            addConditionImmunity: ["drow immunities"]
        }),
        elvenImmunities: new ImmunityAdjuster({
            addConditionImmunity: ["elven immunities"]
        })
    },
    Senses: {
        darkVision60ft: new SenseAdjuster({ addSense: ["darkvision 60 ft."] }),
        lowLightVision: new SenseAdjuster({ addSense: ["low-light vision"] })
    }
};
//# sourceMappingURL=CommonAdjusters.js.map