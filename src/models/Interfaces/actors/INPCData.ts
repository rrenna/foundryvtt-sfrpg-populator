export interface INPCDataDetails {
    cr: number
    raceAndGrafts: string
}

export interface INPCDataAttributesHP {
    max: number
    value: number
}
export interface INPCDataAttributes {
    hp: INPCDataAttributesHP
    kac: any
    eac: any
    fort: any
    reflex: any
    will: any
}

export interface INPCData {
    details: INPCDataDetails
    attributes: INPCDataAttributes
}
