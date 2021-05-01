export interface INPCDataDetails {
    cr: number
    raceAndGrafts: string
}

export interface INPCDataAttributes {
    hp: { max: number; value: number }
    kac: any
    eac: any
    fort: any
    reflex: any
    will: any
    init: any
}

export interface INPCData {
    details: INPCDataDetails
    abilities: { cha: any; con: any; dex: any; int: any; str: any; wis: any }
    attributes: INPCDataAttributes
}
