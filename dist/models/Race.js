export default class Race {
    constructor(name, size, creatureTypeGraft, creatureSubtypeGrafts = [], languages, customLanguages, arms) {
        this.arms = 2;
        this.name = name;
        this.size = size;
        this.creatureTypeGraft = creatureTypeGraft;
        this.languages = languages;
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