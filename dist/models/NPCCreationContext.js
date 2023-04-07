import { CR } from "../data/CRs.js";
export function isNPCCreationContext(pet) {
    return pet.generatePersonality !== undefined;
}
export default class NPCCreationContext {
    constructor(npcCreationContext = {}) {
        this.CR = CR[0]; // defaults to lowest CR
        this.tokenOptions = new TokenOptions(false, 'populator/');
        // Skills - in addition to the array master/good skills
        this.masterSkills = [];
        this.goodSkills = [];
        // Abilities - locked ability modifiers from grafts/special abilities
        this.abilities = []; // `null` refers to no ability ie. mindless (not yet implemented in SFRPG)
        // Senses
        this.senses = [];
        // Immunities
        this.damageImmunities = [];
        this.conditionImmunities = [];
        // Special abilities
        this.universalCreatureRules = [];
        // Special abilities
        this.feats = [];
        this.rpSpecialAbility = false; // set to true if we add a special ability requiring RP
        // Item generation
        this.naturalWeapons = { enabled: false, racial: false };
        this.rangedWeapon = { enabled: false }; // NOTE: This will be fleshed out and expanded over time
        this.itemsToAdd = [];
        this.generateAdditionalItems = true; // Generates "junk" and character appropriate items
        // Biography
        this.generatePersonality = true; // Will try to generate a biography for the creature, generally only used for non-combat NPCs
        // Debugging / auditing
        this.log = []; // We record each mutation applied
        Object.assign(this, npcCreationContext);
    }
}
export class TokenOptions {
    constructor(dynamicImage, dynamicImageRootLocation) {
        this.dynamicImage = dynamicImage,
            this.dynamicImageRootLocation = dynamicImageRootLocation;
    }
}
//# sourceMappingURL=NPCCreationContext.js.map