import { Subtype, Type } from "./Types.js";
import { MonsterCreation } from "./MonsterCreation.js";
/// Used to store mapping between
export class CreatureTypeGenerationOption {
    constructor(type, subtypes, 
    // We've hard coded the first creature rule to be natural weapons
    // TODO: Only spend one special ability on natural weapons if no other weapon profile generation option is selected
    universalCreatureRules = [
        MonsterCreation.specialAbilities.universalCreatureRule
            .naturalWeapons
    ]) {
        this.type = type;
        this.subtypes = subtypes;
        this.universalCreatureRules = universalCreatureRules;
    }
}
/// Generator Settings
export const CreatureTypeGenerationOptions = {
    animal: new CreatureTypeGenerationOption(Type.animal),
    ooze: new CreatureTypeGenerationOption(Type.ooze),
    vermin: new CreatureTypeGenerationOption(Type.vermin),
    construct: new CreatureTypeGenerationOption(Type.construct, [Subtype.technological], [
        MonsterCreation.specialAbilities.universalCreatureRule
            .integratedWeapons
    ])
};
//# sourceMappingURL=Generator.js.map