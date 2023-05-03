import CreatureTypeGraft from "./CreatureTypeGraft.js"
import CreatureSubtypeGraft from "./CreatureSubtypeGraft.js"
import { MonsterReferenceSymbol } from "../data/MonsterCreation.js"
import { IContext } from "./Interfaces/IContext.js"
import { Gender } from "../data/Genders.js"
import { CR } from "../data/CRs.js"
import { Size } from "../data/Sizes.js"

export function isNPCCreationContext(
    pet: NPCCreationContext | IContext
): pet is NPCCreationContext {
    return (pet as NPCCreationContext).generatePersonality !== undefined
}

export default class NPCCreationContext implements IContext {
    // Locations
    public folderId: string | undefined
    //
    public species: string | undefined
    public name: string | undefined
    public gender: Gender | undefined
    public CR: string = CR[0] // defaults to lowest CR
    public creatureTypeGraft: CreatureTypeGraft | undefined
    public creatureSubtypeGrafts: CreatureSubtypeGraft[] | undefined
    public monsterReferenceSymbol: MonsterReferenceSymbol | undefined
    public npcLocation:  string | undefined
    public tokenOptions: TokenOptions = new TokenOptions(false,'populator/')
    // Array rows
    public mainArrayRow: any
    public attackArrayRow: any
    // Skills - in addition to the array master/good skills
    public masterSkills: string[] = []
    public goodSkills: string[] = []
    // Abilities - locked ability modifiers from grafts/special abilities
    public abilities: [string, number | null][] = [] // `null` refers to no ability ie. mindless (not yet implemented in SFRPG)
    // Senses
    public senses: string[] = []
    // Size
    public size: Size = Size.medium
    // Immunities
    public damageImmunities: string[] = []
    public conditionImmunities: string[] = []
    // Special abilities
    public universalCreatureRules: any[] = []
    // Special abilities
    public feats: any[] = []
    public rpSpecialAbility = false // set to true if we add a special ability requiring RP
    // Item generation
    public naturalWeapons = { enabled: false, racial: false }
    public rangedWeapon = { enabled: false } // NOTE: This will be fleshed out and expanded over time
    public itemsToAdd: any[] = []
    public generateAdditionalItems = true // Generates "junk" and character appropriate items
    // Biography
    public generatePersonality = true // Will try to generate a biography for the creature, generally only used for non-combat NPCs
    // Debugging / auditing
    public log: [string, string][] = [] // We record each mutation applied

    constructor(npcCreationContext: Partial<NPCCreationContext> = {}) {
        Object.assign(this, npcCreationContext)
    }
}

export class TokenOptions {
    public dynamicImage: boolean
    public dynamicImageRootLocation: string
    constructor(dynamicImage: boolean, dynamicImageRootLocation: string) {
        this.dynamicImage = dynamicImage,
        this.dynamicImageRootLocation = dynamicImageRootLocation
    }
}
