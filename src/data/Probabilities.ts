import { Gender } from "./Genders.js"

export const Probabilities = {
    // This distribution is based on my assumption that 50% of characters are good, 40% are bad and 10% are evil.
    // TODO: Allow customization of these values
    alignmentDistributions: {
        default: [
            // Good
            { name: "LG", percentage: 20 },
            { name: "NG", percentage: 20 },
            { name: "CG", percentage: 16 },
            // Neutral
            { name: "LN", percentage: 14 },
            { name: "N", percentage: 10 },
            { name: "CN", percentage: 10 },
            // Evil
            { name: "LE", percentage: 4 },
            { name: "NE", percentage: 3 },
            { name: "CE", percentage: 3 }
        ]
    },
    // The default distribution of species in a neutral environment when generating a humanoid
    // NOTE: Currently based on Absalom Station settlement distribution
    // NOTE: Distribution arrays' total percentage must never exceed 100
    // TODO: Allow customization of these values
    locationPopulations: [
        {
            name: "Absalom",
            totalPercentage: 100,
            population: [
                { name: "android", percentage: 9 },
                { name: "dwarf", percentage: 4 },
                { name: "other", percentage: 6 },
                { name: "kasatha", percentage: 4 },
                { name: "gnome", percentage: 2 },
                { name: "halfling", percentage: 4 },
                { name: "human", percentage: 46 },
                { name: "lashunta", percentage: 7 },
                { name: "nuar", percentage: 1 },
                { name: "shirren", percentage: 5 },
                { name: "ysoki", percentage: 9 },
                { name: "vesk", percentage: 3 }
            ]
        },
        {
            name: "Locus1",
            totalPercentage: 100,
            population: [
                { name: "android", percentage: 7 },
                { name: "dwarf", percentage: 2 },
                { name: "other", percentage: 8 }, 
                { name: "kasatha", percentage: 2 },
                { name: "gnome", percentage: 4 },
                { name: "halfling", percentage: 5 },
                { name: "human", percentage: 40 },
                { name: "lashunta", percentage: 7 },
                { name: "nuar", percentage: 1 },
                { name: "shirren", percentage: 10 },
                { name: "ysoki", percentage: 9 },
                { name: "vesk", percentage: 5 }
            ]
        }
    ],
    // NOTE: Extrapolated from 2019 Canadian census: https://www12.statcan.gc.ca/census-recensement/2021/ref/98-20-0002/982000022020002-eng.cfm
    // TODO: Allow customization if your world has a different distribution
    // NOTE: Should consider gender distributions by species, ie. Drow is a matriarchal society
    genderDistributions: {
        default: [
            { name: Gender.male, percentage: 50 },
            { name: Gender.female, percentage: 50 }
        ],
        nonBinary: [
            { name: Gender.male, percentage: 49 },
            { name: Gender.female, percentage: 49 },
            { name: Gender.nonBinary, percentage: 2 }
        ]
    }
}
