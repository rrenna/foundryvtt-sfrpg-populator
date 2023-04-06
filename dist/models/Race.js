export default class Race {
    constructor(name, size, creatureTypeGraft, creatureSubtypeGrafts = [], languages, customLanguages, arms = 2) {
        this.name = name;
        this.size = size;
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
    }
}
//# sourceMappingURL=Race.js.map