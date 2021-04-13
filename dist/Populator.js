import { NPCFactory } from './NPCFactory.js';
// MARK: Hooks
/** Ensure the "Parse Statblock" button is visible. */
Hooks.on("renderSidebarTab", async (app, html) => {
    if (app.options.id == "actors") {
        Populator.ensureParseStatblockVisible();
    }
});
export class Populator {
    static ensureParseStatblockVisible() {
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
        // Debug
        //let options = { CR: "1/2", race: null };
        //options.race = Races.Races.nonCombatantRaces["vesk"];
        await NPCFactory.makeNPC();
        ui.notifications.info("NPC created.", { permanent: false });
    }
}
//# sourceMappingURL=Populator.js.map