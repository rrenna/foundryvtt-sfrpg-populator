import { Utils } from "../utils/Utils.js"
import {
    naturalWeaponsTemplate,
    unarmedStrikeTemplate
} from "../data/Weapons.js"

export class WeaponFactory {
    public static makeUnarmedStrike() {
        return unarmedStrikeTemplate
    }

    public static makeNaturalWeapons() {
        return naturalWeaponsTemplate
    }

    // Generates a CR appropriate laser pistol
    public static async makeLaserPistol(
        forCR: string
    ): Promise<IWeapon | undefined> {
        var pistolName = "laser pistol, azimuth" // level 1 laser pistol
        switch (forCR) {
            // CR 1/3 to 5 covered by default value
            case "6":
            case "7":
            case "8":
                pistolName = "laser pistol, corona"
                break
            case "9":
            case "10":
            case "11":
                pistolName = "laser pistol, aphelion"
                break
            case "12":
            case "13":
                pistolName = "laser pistol, perihelion"
                break
            case "14":
            case "15":
            case "16":
                pistolName = "laser pistol, parallax"
                break
            case "17":
            case "18":
            case "19":
            case "20":
            case "21":
            case "22":
            case "23":
            case "24":
            case "25":
                pistolName = "laser pistol, zenith"
        }

        let laserPistol = await Utils.fuzzyFindItemAsync(pistolName)
        if (laserPistol) {
            return laserPistol as IWeapon
        }
    }
}
