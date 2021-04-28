import { MonsterReferenceSymbol } from "../data/MonsterCreation.js";
import { CR } from "../data/CRs.js";
export default class NPCMutationContext {
    constructor(npcMutationContext = {}) {
        this.CR = CR[0]; // defaults to lowest CR
        this.monsterReferenceSymbol = MonsterReferenceSymbol.combatant; // defaults to combatant
        // Debugging / auditing
        this.log = [];
        Object.assign(this, npcMutationContext);
    }
}
//# sourceMappingURL=NPCMutationContext.js.map