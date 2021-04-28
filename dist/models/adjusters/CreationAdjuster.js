import { apply } from "../Interfaces/IApplyable.js";
export default class CreationAdjuster {
    constructor() {
        // Children IApplyables
        this.children = [];
    }
    async apply(actor, context) {
        // Applies children - if set
        let output = await apply(actor, context, ...this.children);
        return output;
    }
}
//# sourceMappingURL=CreationAdjuster.js.map