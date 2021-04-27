import { Populator } from "../Populator.js"
import PopulatorPanelController, {
    PopulatorPanelOptions
} from "../controllers/PopulatorPanelController.js"

// MARK: Hooks
declare var Hooks

// Ensure the "Populate" button is visible.
Hooks.on("renderSidebarTab", async (app) => {
    if (app.options.id == "actors") {
        Populator.ensurePopulateVisible()
    }
})

//
Hooks.on("getActorDirectoryFolderContext", async (html, folderOptions) => {
    folderOptions = folderOptions.push({
        name: "Populator",
        icon: '<i class="fas fa-user-astronaut"></i>',
        condition: game.user.isGM,
        callback: (header) => {
            const li = header.parent()
            let folderId = li.data("folderId")

            // Open populator panel
            let populatorPanel = new PopulatorPanelController(
                new PopulatorPanelOptions(folderId)
            )
            populatorPanel.render(true)
        }
    })
})

// Adds options
Hooks.once("init", async function () {
    // Default CR
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
            "1": "CR 1",
            "2": "CR 2",
            "3": "CR 3",
            "4": "CR 4",
            "5": "CR 5"
        }
    })
    // Use dynamic token images (requires specific folder structure in foundry data)
    game.settings.register("foundryvtt-sfrpg-populator", "dynamicTokenImages", {
        name: "Dynamic token images (Experimental)",
        hint:
            "When enabled the token will be assigned a random image from \\populator\\<race name>\\<gender name> or \\populator\\<creature type>. See the README.md on Github for an example.",
        scope: "client",
        config: true,
        default: false,
        type: String,
        choices: {
            false: "No",
            true: "Yes"
        }
    })
})
