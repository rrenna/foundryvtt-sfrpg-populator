import { Populator } from "../Populator.js"
import PopulatorPanelController, {
    PopulatorPanelOptions
} from "../controllers/PopulatorPanelController.js"
import RepopulatorPanelController, {
    RepopulatorPanelOptions
} from "../controllers/RepopulatorPanelController.js"
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
            const actorId = target.attr("data-entity-id")
            const actor = game.actors.get(actorId) as Actor<INPCData>

            // We only allow populator operations on npcs
            if (actor.data.type == "npc") {
                // Open populator panel
                /*
                let repopulatorPanel = new RepopulatorPanelController(
                    new RepopulatorPanelOptions(actorId)
                )
                repopulatorPanel.render(true)*/

                // NOTE: For now we upgrade the NPC to CR 5 for faster development/debugging
                const context = new NPCMutationContext({
                    CR: "5",
                    monsterReferenceSymbol: MonsterReferenceSymbol.combatant
                })

                NPCFactory.mutate(actor, context)
                ui.notifications.info("NPC upgraded.", { permanent: false })
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
