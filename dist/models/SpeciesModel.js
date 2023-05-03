import { Size } from "../data/Sizes.js";
export default class Species {
    constructor(name, size = [Size.medium], creatureTypeGraft, creatureSubtypeGrafts = [], languages, customLanguages, arms = [2], universalCreatureRules) {
        this.name = name;
        this.creatureTypeGraft = creatureTypeGraft;
        this.languages = languages;
        this.arms = arms;
        this.customLanguages = customLanguages; //#TODO pretty sure this isn't being used
        // Supports arrays and non-arrays
        if (Array.isArray(creatureSubtypeGrafts)) {
            this.creatureSubtypeGrafts = creatureSubtypeGrafts;
        }
        else {
            this.creatureSubtypeGrafts = [creatureSubtypeGrafts];
        }
        // Supports arrays and non-arrays
        if (Array.isArray(size)) {
            this.size = size;
        }
        else {
            this.size = [size];
        }
        // Supports arrays and non-arrays
        if (Array.isArray(universalCreatureRules)) {
            this.universalCreatureRules = universalCreatureRules;
        }
        else if (universalCreatureRules != undefined) {
            this.universalCreatureRules = [universalCreatureRules];
        }
    }
}
//# sourceMappingURL=SpeciesModel.js.map