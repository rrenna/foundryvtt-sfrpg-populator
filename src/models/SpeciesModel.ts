import { Size } from "../data/Sizes.js"
import CreatureTypeGraft from "./CreatureTypeGraft.js"
import CreatureSubtypeGraft from "./CreatureSubtypeGraft.js"

export default class Species {
    name: string
    size: Size
    arms: number
    creatureTypeGraft: CreatureTypeGraft
    creatureSubtypeGrafts: CreatureSubtypeGraft[] | undefined
    languages: string[] | undefined
    customLanguages: string[] | undefined

    constructor(
        name: string,
        size: Size,
        creatureTypeGraft: CreatureTypeGraft,
        creatureSubtypeGrafts:
            | CreatureSubtypeGraft[]
            | CreatureSubtypeGraft = [],
        languages?: string[],
        customLanguages?: [string],
        arms: number = 2
    ) {
        this.name = name
        this.size = size
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
    }
}
