export const Probabilities = {
    // This distribution is based on my assumption that 50% of characters are good, 40% are bad and 10% are evil.
    // TODO: Allow customization of these values
    alignmentDistributions: {
        default: [
            // Good
            { name: "LG", percentage: 0.17 },
            { name: "NG", percentage: 0.17 },
            { name: "CG", percentage: 0.16 },
            // Neutral
            { name: "LN", percentage: 0.14 },
            { name: "N", percentage: 0.13 },
            { name: "CN", percentage: 0.13 },
            // Evil
            { name: "LE", percentage: 0.4 },
            { name: "NE", percentage: 0.3 },
            { name: "CE", percentage: 0.3 }
        ]
    },
    // The default distribution of races in a neutral environment when generating a humanoid
    // NOTE: Currently based on Absalom Station settlement distribution
    // NOTE: Distribution arrays' total percentage must never exceed 1.0
    // TODO: Allow customization of these values
    raceDistributions: {
        default: [
            { name: "android", percentage: 0.09 },
            { name: "dwarf", percentage: 0.04 },
            { name: "drow", percentage: 0.03 },
            { name: "human", percentage: 0.46 },
            { name: "kasatha", percentage: 0.04 },
            { name: "gnome", percentage: 0.02 },
            { name: "halfling", percentage: 0.04 },
            { name: "lashunta", percentage: 0.07 },
            { name: "nuar", percentage: 0.01 },
            { name: "shirren", percentage: 0.05 },
            { name: "skittermander", percentage: 0.03 },
            { name: "ysoki", percentage: 0.09 },
            { name: "vesk", percentage: 0.03 }
        ]
    },
    // NOTE: Extrapolated from 2019 Canadian census: https://www12.statcan.gc.ca/census-recensement/2021/ref/98-20-0002/982000022020002-eng.cfm
    // TODO: Allow customization if your world has a different distribution
    // NOTE: Should consider gender distributions by race, ie. Drow is a matriarchal society
    genderDistributions: {
        default: [
            { name: "male", percentage: 0.49 },
            { name: "female", percentage: 0.50 },
            { name: "non-binary", percentage: 0.01 }
        ]
    }
};
//# sourceMappingURL=Probabilities.js.map