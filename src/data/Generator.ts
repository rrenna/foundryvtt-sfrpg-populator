import { Grafts } from "./Grafts.js"
import CreatureTypeGraft from "../models/CreatureTypeGraft.js"
import CreatureSubtypeGraft from "../models/CreatureSubtypeGraft.js"
import { Subtype, Type } from "./Types.js"
import UniversalCreatureRule from "../models/UniversalCreatureRule.js"
import { MonsterCreation } from "./MonsterCreation.js"

/// Used to store mapping between
export class CreatureTypeGenerationOption {
    type: Type
    subtypes: Subtype[] | undefined
    universalCreatureRules: any[]

    constructor(
        type: Type,
        subtypes?: Subtype[] | undefined,
        // We've hard coded the first creature rule to be natural weapons
        // TODO: Only spend one special ability on natural weapons if no other weapon profile generation option is selected
        universalCreatureRules: UniversalCreatureRule[] = [
            MonsterCreation.specialAbilities.universalCreatureRule
                .naturalWeapons
        ]
    ) {
        this.type = type
        this.subtypes = subtypes
        this.universalCreatureRules = universalCreatureRules
    }
}

/// Generator Settings
export const CreatureTypeGenerationOptions = {
    animal: new CreatureTypeGenerationOption(Type.animal),
    ooze: new CreatureTypeGenerationOption(Type.ooze),
    vermin: new CreatureTypeGenerationOption(Type.vermin),
    construct: new CreatureTypeGenerationOption(
        Type.construct,
        [Subtype.technological],
        [
            MonsterCreation.specialAbilities.universalCreatureRule
                .integratedWeapons
        ]
    )
}
