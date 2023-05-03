import { Size } from "../data/Sizes.js"
import CreatureTypeGraft from "./CreatureTypeGraft.js"
import CreatureSubtypeGraft from "./CreatureSubtypeGraft.js"
import UniversalCreatureRule from "./UniversalCreatureRule.js"

export default class Species {
    name: string
    size: Size[]
    arms: number[]
    creatureTypeGraft: CreatureTypeGraft
    creatureSubtypeGrafts: CreatureSubtypeGraft[] | undefined
    languages: string[] | undefined
    customLanguages: string[] | undefined
    universalCreatureRules: UniversalCreatureRule[] | undefined

    constructor(
        name: string,
        size: Size [] | Size = [Size.medium],
        creatureTypeGraft: CreatureTypeGraft,
        creatureSubtypeGrafts:
            | CreatureSubtypeGraft[]
            | CreatureSubtypeGraft = [],
        languages?: string[],
        customLanguages?: [string],
        arms: number[] = [2],
        universalCreatureRules?: UniversalCreatureRule[] | UniversalCreatureRule
    ) {
        this.name = name
        this.creatureTypeGraft = creatureTypeGraft
        this.languages = languages
        this.arms = arms
        this.customLanguages = customLanguages //#TODO pretty sure this isn't being used

        // Supports arrays and non-arrays
        if (Array.isArray(creatureSubtypeGrafts)) {
            this.creatureSubtypeGrafts = creatureSubtypeGrafts
        } else {
            this.creatureSubtypeGrafts = [creatureSubtypeGrafts]
        }

        // Supports arrays and non-arrays
        if (Array.isArray(size)) {
            this.size = size
        } else {
            this.size = [size]
        }
        
        // Supports arrays and non-arrays
        if (Array.isArray(universalCreatureRules)) {
            this.universalCreatureRules = universalCreatureRules
        } else if (universalCreatureRules != undefined) {
            this.universalCreatureRules = [universalCreatureRules]
        }
    }
}
