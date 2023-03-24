/// List of creature combat ratings
import { Utils } from "../utils/Uils.js"

export const CR = [
    "1/3",
    "1/2",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25"
]

/* CR Helpers */
declare module "../utils/uils" {
    namespace Utils {
        function CRforNumber(number: number): string
        function numberForCR(CR: string): number
    }
}

Utils.CRforNumber = (number: number): string => {
    let cr: string
    if (number === 1 / 3) {
        cr = "1/3"
    } else if (number === 1 / 2) {
        cr = "1/2"
    } else {
        cr = number.toString()
    }
    return cr
}

Utils.numberForCR = (CR: string): number => {
    if (CR === "1/3") {
        return 1 / 3
    } else if (CR === "1/2") {
        return 1 / 2
    }

    return Number(CR)
}
