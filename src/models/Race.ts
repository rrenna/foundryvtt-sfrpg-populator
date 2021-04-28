import { Size } from "../data/Sizes.js"
import CreatureTypeGraft from "./CreatureTypeGraft.js"
import CreatureSubtypeGraft from "./CreatureSubtypeGraft.js"

export default class Race {
    name: string
    size: Size
    arms: number = 2
    creatureTypeGraft: CreatureTypeGraft
    creatureSubtypeGrafts: CreatureSubtypeGraft[] | undefined
    languages: string[] | undefined

    constructor(
        name: string,
        size: Size,
        creatureTypeGraft: CreatureTypeGraft,
        creatureSubtypeGrafts:
            | CreatureSubtypeGraft[]
            | CreatureSubtypeGraft = [],
        languages?: string[],
        customLanguages?: [string],
        arms?: number
    ) {
        this.name = name
        this.size = size
        this.creatureTypeGraft = creatureTypeGraft
        this.languages = languages

        // Supports arrays and non-arrays
        if (Array.isArray(creatureSubtypeGrafts)) {
            this.creatureSubtypeGrafts = creatureSubtypeGrafts
        } else {
            this.creatureSubtypeGrafts = [creatureSubtypeGrafts]
        }
    }
}
