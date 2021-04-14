import { Races }  from "./data/Races.js";
import { NPCFactory } from './NPCFactory.js'
declare var game;

export class Populator {

    static ensurePopulateVisible() {
        if (!game.user.isGM) {
            return;
        }
        let populatorButton = document.getElementById("populator-button");
        if (populatorButton != null) {
            return;
        }
        const actorsPanel = document.getElementById("actors");
        const actorFooter = actorsPanel.getElementsByClassName("directory-footer")[0];
        if (actorFooter) {
            populatorButton = document.createElement("button");
            populatorButton.innerHTML = `<i id="populator-button" class="fas fa-user-astronaut"></i>Populate`;
            populatorButton.onclick = ev => Populator.createNPCTapped();
            populatorButton.oncontextmenu = ev => Populator.createSpecificNPCTapped();
            const createEntityButton = actorFooter.getElementsByClassName("create-entity")[0];
            actorFooter.insertBefore(populatorButton, createEntityButton);
        }
    }

    static async createNPCTapped() {

        const defaultCR = game.settings.get("foundryvtt-sfrpg-populator", "defaultCR");
        let options = { CR: defaultCR, race: null };

        await NPCFactory.makeNPC(options);
        ui.notifications.info("NPC created.", { permanent: false });
    }
    // Currently a convenience for debugging, but will be expanded into a "quick create" option
    // and the main tap would open an options window
    static async createSpecificNPCTapped() {

        const defaultCR = game.settings.get("foundryvtt-sfrpg-populator", "defaultCR");
        let options = { CR: defaultCR, race: null };

        // Quickly creates a specific race - currently hardcoded to Drow
        options.race = Races.nonCombatantRaces["drow"];

        await NPCFactory.makeNPC(options);
        ui.notifications.info("NPC created.", { permanent: false });
    }
}