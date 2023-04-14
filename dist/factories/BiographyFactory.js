import { Utils } from "../utils/Utils.js";
import { Biography } from "../data/Biography.js";
export class BiographyFactory {
    // NOTE: Consider refactoring to only provide needed parameters and remove dependancy on `NPCCreationContext`
    static makeBiography(actor, context) {
        var biography = "";
        if (context.generatePersonality) {
            let personalityTraits = Biography.personalityTraits;
            Utils.shuffleArray(personalityTraits);
            biography +=
                "<p>" +
                    actor.name +
                    " is a " +
                    personalityTraits[0] +
                    " " +
                    context.species +
                    " who identifies as " +
                    context.gender +
                    ".</p>";
        }
        biography += "<p><b>Created by Populator.</b></p>";
        return biography;
    }
}
//# sourceMappingURL=BiographyFactory.js.map