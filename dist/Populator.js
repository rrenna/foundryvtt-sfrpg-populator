import { NPCFactory } from './NPCFactory.js';
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
            const createEntityButton = actorFooter.getElementsByClassName("create-entity")[0];
            actorFooter.insertBefore(populatorButton, createEntityButton);
        }
    }
    static async createNPCTapped() {
        const defaultCR = game.settings.get("foundryvtt-sfrpg-populator", "defaultCR");
        let options = { CR: defaultCR, race: null };
        // Debug
        //options.race = Races.nonCombatantRaces["android"];
        await NPCFactory.makeNPC(options);
        ui.notifications.info("NPC created.", { permanent: false });
    }
}
//# sourceMappingURL=Populator.js.map