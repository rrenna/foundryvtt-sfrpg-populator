export default class CreatureTypeGraft {
    name: string
    description: string
    // Options
    capicityForLanguage: boolean // Some creature grafts have no innate capacity for language (very low or no intelligence)

    constructor(
        name: string,
        description: string,
        capicityForLanguage: boolean = true
    ) {
        this.name = name
        this.description = description
        this.capicityForLanguage = capicityForLanguage
    }
}
