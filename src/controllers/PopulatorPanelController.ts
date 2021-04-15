import { Races } from "../data/Races.js";
import { NPCFactory } from "../NPCFactory.js";
import MonsterWizardPanel1Controller from "./MonsterWizardPanel1Controller.js";
import NPCCreationContext from "../models/NPCCreationContext.js";

export default class PopulatorPanelController extends Application {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions,  {
            id: "populator-panel",
            template: "modules/foundryvtt-sfrpg-populator/templates/PopulatorPanel.html",
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
    public activateListeners(html: JQuery<HTMLElement>) {
        // Listener for when a day is clicked
        (<JQuery>html).find(".npcGenerationButton").on('click', this.npcGenerationButtonClicked.bind(this));
        (<JQuery>html).find(".monsterGenerationButton").on('click', this.monsterGenerationButtonClicked.bind(this));
    }
    /**
     * Click event when a users clicks on a test button
     * @param {Event} e The click event
     */
    private async npcGenerationButtonClicked(e: Event) {

        let npcRaceSelectValue = (<JQuery>this.element).find('#npcRaceSelect').find(":selected").val();
        let selectedRace: string = npcRaceSelectValue as string;

        // Settings
        const defaultCR = game.settings.get("foundryvtt-sfrpg-populator", "defaultCR");
        const dynamicTokenImages = game.settings.get("foundryvtt-sfrpg-populator", "dynamicTokenImages");

        let options = { CR: defaultCR, dynamicTokenImages: dynamicTokenImages, race: null, gender: null};

        // Quickly creates a specific race - as selected by user
        options.race = Races.nonCombatantRaces[selectedRace];

        await NPCFactory.makeNonHostile(options);
        ui.notifications.info("NPC created.", { permanent: false });
    }

    private monsterGenerationButtonClicked(e: Event) {
        // Open monster wizard panel
        let monsterWizardPanelController = new MonsterWizardPanel1Controller(new NPCCreationContext());
        monsterWizardPanelController.render(true);
    }
}