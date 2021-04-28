import { IContext } from "./Interfaces/IContext.js"
import { MonsterReferenceSymbol } from "../data/MonsterCreation.js"
import { CR } from "../data/CRs.js"

export default class NPCMutationContext implements IContext {
    public CR: string = CR[0] // defaults to lowest CR
    public monsterReferenceSymbol: MonsterReferenceSymbol =
        MonsterReferenceSymbol.combatant // defaults to combatant
    // Debugging / auditing
    public log: [string, string][] = []

    constructor(npcMutationContext: Partial<NPCMutationContext> = {}) {
        Object.assign(this, npcMutationContext)
    }
}
