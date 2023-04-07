import { NPCFactory } from "./factories/NPCFactory.js"
import PopulatorPanelController from "./controllers/PopulatorPanelController.js"
import MonsterWizardPanel1Controller from "./controllers/MonsterWizardPanel1Controller.js"
import NPCCreationContext from "./models/NPCCreationContext.js"
declare var game

export class Populator {
    static ensurePopulateVisible() {
        if (!game.user.isGM) {
            return
        }
        let populatorButton = document.getElementById("populator-button")
        if (populatorButton != null) {
            return
        }
        const actorsPanel = document.getElementById("actors")
        const actorFooter = actorsPanel?.getElementsByClassName(
            "directory-footer"
        )[0]
        if (actorFooter) {
            populatorButton = document.createElement("button")
            populatorButton.innerHTML = `<i id="populator-button" class="fas fa-user-astronaut"></i>Populator`
            populatorButton.onclick = (ev) => Populator.populateClicked()
            populatorButton.oncontextmenu = (ev) =>
                Populator.populateRightClicked()
            const createEntityButton = actorFooter.getElementsByClassName(
                "create-entity"
            )[0]
            actorFooter.insertBefore(populatorButton, createEntityButton)
        }
    }

    static async populateClicked() {
        // Open monster wizard panel
        //let monsterWizardPanelController = new MonsterWizardPanel1Controller(new NPCCreationContext());
        //monsterWizardPanelController.render(true);

        // Open populator panel
        let populatorPanel = new PopulatorPanelController()
        populatorPanel.render(true)
    }

    static async populateRightClicked() {
        // Settings
        const defaultCR = game.settings.get(
            "sfrpg-populator",
            "defaultCR"
        )
        const dynamicTokenImages = game.settings.get(
            "sfrpg-populator",
            "dynamicTokenImages"
        )
        const dynamicTokenImagesLocation = game.settings.get(
            "sfrpg-populator",
            "dynamicTokenImagesLocation"
        )

        let context = new NPCCreationContext()
        context.CR = defaultCR
        context.tokenOptions.dynamicImage = dynamicTokenImages
        context.tokenOptions.dynamicImageRootLocation = dynamicTokenImagesLocation

        await NPCFactory.makeNonHostile(context)
        ui.notifications.info("NPC created.", { permanent: false })
    }
}
