interface IDamage {
    parts: [any]
}

interface IWeaponData {
    description: any
    source: string
    type: string
    quantity: number | null
    bulk: string
    price: number
    level: number
    attuned: boolean
    equipped: boolean
    equippable: boolean
    identified: boolean
    attributes: any
    activation: any
    duration: any
    target: any
    area: any
    range: any
    uses: any
    isActive: any
    ability: string
    actionType: string
    attackBonus: number
    chatFlavor: string
    critical: any
    damage: IDamage
    formula: string
    save: any
    descriptors: any[]
    capacity: any
    usage: any
    modifiers: any[]
    container: any
    weaponType: string
    weaponCategory: string
    special: string
    properties: any
    proficient: boolean
    abilityMods: any
}

interface IWeapon extends IItem {
    data: IWeaponData
}
