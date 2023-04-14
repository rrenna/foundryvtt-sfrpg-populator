import { SpeciesList } from "./data/Species.js"
import { Probabilities } from "./data/Probabilities.js"
import { Names } from "./data/Names.js"
import { StringFormat } from "./utils/StringFormat.js"
import Species from "./models/SpeciesModel.js"
import NPCCreationContext from "./models/NPCCreationContext.js"
import { Gender } from "./data/Genders.js"
import { Utils } from "./utils/Utils.js"

export class Randomizer {
    static randomSpecies(locationName: string = "Absalom"): Species {
        const locationPopulations = Utils.sGet("locations");
        let species = Randomizer.pickWinningItem(
            locationPopulations.find(location => location.name === locationName)?.population
        )
        return species
    }

    static randomGender(distribution?: string): Gender {
        let genderDistribution = Randomizer.pickWinningItem(
            distribution ? Probabilities.genderDistributions[distribution] : Probabilities.genderDistributions.default
        )
        let gender = genderDistribution.name
        return gender
    }

    static randomAlignment() {
        let alignmentDistribution = Randomizer.pickWinningItem(
            Probabilities.alignmentDistributions.default
        )
        return alignmentDistribution.name
    }

    // NOTE: For now we assume male if no gender provided
    static randomName(context: NPCCreationContext) {
        let species: string | undefined = context.species
        let creatureType = context.creatureTypeGraft?.name
        let gender: string = context.gender ?? "male"

        var format = Names.default.format
        var names = Names.default // Default is human sounding names

        // If a species is specified and we have special names for that species
        if (species && Names[species] != undefined) {
            names = Names[species]
        }
        // Otherwise use creature type to generate name
        else if (Names[creatureType] != undefined) {
            names = Names[creatureType]
        }

        //
        var first = names.male.first // Default is male sounding names
        var last = names.last

        // Gender specific first names
        if (gender == "male") {
        } // do nothing
        else if (gender == "female" && names.female != undefined) {
            first = names.female.first
        } else if (names.other != undefined) {
            // If any other gender, and we have `other` defined for the species
            first = names.other.first
        }

        let firstName = first[Math.floor(Math.random() * first.length)]
        let lastName = last[Math.floor(Math.random() * last.length)]

        // If the name style has a unique format use it instead
        if (names.format) {
            format = names.format
        }
        // Generate the full name with the name format
        let fullName = StringFormat.stringFormat(format, firstName, lastName)

        // Denominators get appended to the end of names regardless of name format (ie. "Jordo-6" has the "-6" denominator)
        if (names.denominator) {
            let denominator =
                names.denominator[
                    Math.floor(Math.random() * names.denominator.length)
                ]
            fullName = fullName + denominator
        }

        return fullName
    }

    static pickWinningItem(data) {
        var winner = Math.random() * 100;
        var threshold = 0; 
        for (let i = 0; i < data.length; i++) {
            threshold += data[i].percentage
            if (threshold >= winner) {
                return data[i]
            }
        }
    }

    static getRandom(data: string[]) {
        let shuffleArray = data.slice()
        Utils.shuffleArray(shuffleArray)
        return shuffleArray[0]
    }
}
