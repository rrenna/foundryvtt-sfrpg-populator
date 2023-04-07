import { Populator } from "../Populator.js"
import PopulatorPanelController, {
    PopulatorPanelOptions
} from "../controllers/PopulatorPanelController.js"
import MutatePanelController, {
    MutatePanelOptions
} from "../controllers/MutatePanelController.js"
import NPCMutationContext from "../models/NPCMutationContext.js"
import { MonsterReferenceSymbol } from "../data/MonsterCreation.js"
import { NPCFactory } from "../factories/NPCFactory.js"
import { INPCData } from "../models/Interfaces/actors/INPCData.js"

// MARK: Hooks
declare var Hooks

// Ensure the "Populate" button is visible.
Hooks.on("renderSidebarTab", async (app) => {
    if (app.options.id == "actors") {
        Populator.ensurePopulateVisible()
    }
})

// Settup right-click option for NPCs
Hooks.on("getActorDirectoryEntryContext", (az, items) => {
    items.push({
        name: "Populator",
        icon: '<i class="fas fa-user-astronaut"></i>',
        condition: game.user.isGM,
        callback: (target) => {
            const actorId = target.attr("data-document-id")
            const actor = game.actors.get(actorId) as Actor<INPCData>

            // We only allow populator operations on npcs
            if (actor.data.type == "npc" || actor.data.type == "npc2") {
                // Open populator panel
                let repopulatorPanel = new MutatePanelController(
                    new MutatePanelOptions(actorId)
                )
                repopulatorPanel.render(true)
            } else {
                ui.notifications.warn("NPC not selected", { permanent: false })
            }
        }
    })
})

Hooks.on("renderActorDirectory", (a, b, c) => {
    return // Do nothing for now
    // TODO: Attempt to filter out populator from non-npcs
})

// Setup right-click option for folders
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
    game.settings.register("sfrpg-populator", "defaultCR", {
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
    game.settings.register("sfrpg-populator", "dynamicTokenImages", {
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

    game.settings.register("sfrpg-populator", "dynamicTokenImagesLocation", {
        name: "Root folder location for images",
        hint:
            "When dynamic images are enabled this will be the root folder where we pull from.",
        scope: "client",
        config: true,
        default: 'populator/',
        type: String
    })  

    // Use dynamic token images (requires specific folder structure in foundry data)
    game.settings.register("sfrpg-populator", "includeNonBinary", {
        name: "Enable Non-Binary Gender",
        hint:
            "This will add a small percentage of tokens be generated as non-binary and look for images if enabled in the appropriate species folder \"non-binary\".",
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
