import { Races } from "../data/Races.js";
import { NPCFactory } from "../NPCFactory.js";
export default class PopulatePanelController extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "populator-panel",
            template: "modules/foundryvtt-sfrpg-populator/templates/PopulatePanel.html",
            width: 300,
            height: 300,
            minimizable: true,
            resizable: true,
            title: "Populator",
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }
    /**
     * Retrieves Data to be used in rendering template.
     *
     * @param options
     * @returns {Promise<Object>}
     */
    getData(options = {}) {
        return mergeObject(super.getData(), {
            options: options,
            isGM: game.user.isGM,
            NPCRaces: Races.nonCombatantRaces
        });
    }
    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    activateListeners(html) {
        // Listener for when a day is clicked
        html.find(".generateSpecificRaceButton").on('click', this.generateSpecificRaceButtonClicked.bind(this));
    }
    /**
     * Click event when a users clicks on a test button
     * @param {Event} e The click event
     */
    async generateSpecificRaceButtonClicked(e) {
        let npcRaceSelectValue = this.element.find('#npcRaceSelect').find(":selected").val();
        let selectedRace = npcRaceSelectValue;
        // Settings
        const defaultCR = game.settings.get("foundryvtt-sfrpg-populator", "defaultCR");
        const dynamicTokenImages = game.settings.get("foundryvtt-sfrpg-populator", "dynamicTokenImages");
        let options = { CR: defaultCR, dynamicTokenImages: dynamicTokenImages, race: null, gender: null };
        // Quickly creates a specific race - currently hardcoded to Drow
        options.race = Races.nonCombatantRaces[selectedRace];
        await NPCFactory.makeNPC(options);
        ui.notifications.info("NPC created.", { permanent: false });
    }
}
//# sourceMappingURL=PopulatePanelController.js.map