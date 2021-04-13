// MARK: Hooks
import { Populator } from "../Populator.js";
// Ensure the "Populate" button is visible.
Hooks.on("renderSidebarTab", async (app) => {
    if (app.options.id == "actors") {
        Populator.ensurePopulateVisible();
    }
});
// Adds options
Hooks.once('init', async function () {
    game.settings.register("foundryvtt-sfrpg-populator", "defaultCR", {
        name: "Default CR",
        hint: "The default CR of NPCs created by Populator.",
        scope: "client",
        config: true,
        default: "1/3",
        type: String,
        choices: {
            "1/3": "CR 1/3",
            "1/2": "CR 1/2",
            "1": "CR 1"
        }
    });
});
//# sourceMappingURL=Setup.js.map