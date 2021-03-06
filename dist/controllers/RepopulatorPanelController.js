import { NPCFactory } from "../factories/NPCFactory.js";
import { MonsterReferenceSymbol } from "../data/MonsterCreation.js";
import NPCMutationContext from "../models/NPCMutationContext.js";
import { CR } from "../data/CRs.js";
// Options provided to the Repopulator panel - adds actorId to default options
export class RepopulatorPanelOptions {
    constructor(actorId) {
        this.actorId = actorId;
    }
}
export default class RepopulatorPanelController extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "repopulator-panel",
            classes: ["sfrpg"],
            template: "modules/foundryvtt-sfrpg-populator/templates/MutatorPanel.html",
            width: 300,
            height: 300,
            minimizable: true,
            resizable: true,
            title: "Populator - Mutate existing NPC"
        });
    }
    /**
     * Retrieves Data to be used in rendering template.
     *
     * @param options
     * @returns {Promise<Object>}
     */
    getData(options = {}) {
        let actor = game.actors.get(this.options["actorId"]);
        return mergeObject(super.getData(), {
            options: options,
            actor: actor,
            isGM: game.user.isGM,
            CRs: CR
        });
    }
    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    activateListeners(html) {
        // Listener for when a day is clicked
        ;
        html
            .find(".npcMutateButton")
            .on("click", this.npcMutateButtonClicked.bind(this));
        tippy(".populatorInfo");
        tippy(".populatorButton");
    }
    /**
     * Click event when a users clicks on the (Re)Populate button
     * @param {Event} e The click event
     */
    async npcMutateButtonClicked(e) {
        let crRaceSelectValue = this.element
            .find("#crSelect")
            .find(":selected")
            .val();
        let selectedCRIndex = Number(crRaceSelectValue);
        let selectedCR = CR[selectedCRIndex];
        let actor = game.actors.get(this.options["actorId"]);
        const context = new NPCMutationContext({
            CR: selectedCR,
            monsterReferenceSymbol: MonsterReferenceSymbol.combatant
        });
        await NPCFactory.mutate(actor, context);
        ui.notifications.info("NPC upgraded.", { permanent: false });
        //await this.close()
    }
}
//# sourceMappingURL=RepopulatorPanelController.js.map