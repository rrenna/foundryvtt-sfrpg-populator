import { Races } from "../data/Races.js"
import { NPCFactory } from "../factories/NPCFactory.js"
import MonsterWizardPanel1Controller from "./MonsterWizardPanel1Controller.js"
import NPCCreationContext, {
    TokenOptions
} from "../models/NPCCreationContext.js"
import { Grafts } from "../data/Grafts.js"
import { MonsterCreation } from "../data/MonsterCreation.js"
import CreatureTypeGraft from "../models/CreatureTypeGraft.js"
import { CreatureTypeGenerationOptions } from "../data/Generator.js"
import { Subtype, Type } from "../data/Types.js"
import CreatureSubtypeGraft from "../models/CreatureSubtypeGraft.js"
import { npcCR } from "../data/CRs.js"
import { Randomizer } from "../Randomizer.js"
import Race from "../models/Race.js"

// Options provided to the Populator panel - adds folderId to default options
export class PopulatorPanelOptions implements Application.Options {
    folderId: string | undefined
    constructor(folderId: string | undefined) {
        this.folderId = folderId
    }
}

export default class PopulatorPanelController extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "populator-panel",
            classes: ["sfrpg"],
            template:
                "modules/foundryvtt-sfrpg-populator/templates/PopulatorPanel.html",
            width: 400,
            height: 450,
            minimizable: true,
            resizable: true,
            title: "Populator",
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description"
                }
            ]
        })
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
            NPCCR: npcCR,
            NPCRaces: Races.nonCombatantRaces,
            supportedCreatureTypes: CreatureTypeGenerationOptions
        })
    }

    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    public activateListeners(html: JQuery<HTMLElement>) {
        // Listener for when a day is clicked
        ;(<JQuery>html)
            .find(".npcGenerationButton")
            .on("click", this.npcGenerationButtonClicked.bind(this))
        ;(<JQuery>html)
            .find(".npcRandomGenerationButton")
            .on("click", this.npcRandomGenerationButtonClicked.bind(this))
        ;(<JQuery>html)
            .find(".monsterGenerationButton")
            .on("click", this.monsterGenerationButtonClicked.bind(this))

        tippy(".populatorInfo")
        tippy(".populatorButton")
    }
        /**
     * Click event when a users clicks on the NPC button
     * @param {Event} e The click event
     */
    private async npcRandomGenerationButtonClicked(e: Event) {
        let npcCRSelectValue = (<JQuery>this.element)
            .find("#npcCR")
            .find(":selected")
            .val()            
        let selectedCR: string = npcCRSelectValue as string

        let selectedRace: string = Randomizer.randomRace().name

        const dynamicTokenImages = game.settings.get(
            "foundryvtt-sfrpg-populator",
            "dynamicTokenImages"
        )
        
        // Context
        let context = new NPCCreationContext()

        // CR
        context.CR = selectedCR

        // Location
        context.folderId = this.options["folderId"]

        // Validates selected race name
        if (Races.nonCombatantRaces[selectedRace]) {
            context.race = selectedRace
        }
        context.tokenOptions.dynamicImage = dynamicTokenImages

        await NPCFactory.makeNonHostile(context)
        ui.notifications.info("NPC created.", { permanent: false })
    }
    /**
     * Click event when a users clicks on the NPC button
     * @param {Event} e The click event
     */
    private async npcGenerationButtonClicked(e: Event) {
        let npcRaceSelectValue = (<JQuery>this.element)
            .find("#npcRaceSelect")
            .find(":selected")
            .val()
        let selectedRace: string = npcRaceSelectValue as string
        let npcCRSelectValue = (<JQuery>this.element)
            .find("#npcCR")
            .find(":selected")
            .val()            
        let selectedCR: string = npcCRSelectValue as string

        // Settings
        const dynamicTokenImages = game.settings.get(
            "foundryvtt-sfrpg-populator",
            "dynamicTokenImages"
        )

        // Context
        let context = new NPCCreationContext()

        // CR
        context.CR = selectedCR

        // Location
        context.folderId = this.options["folderId"]

        // Validates selected race name
        if (Races.nonCombatantRaces[selectedRace]) {
            context.race = selectedRace
        }
        context.tokenOptions.dynamicImage = dynamicTokenImages

        await NPCFactory.makeNonHostile(context)
        ui.notifications.info("NPC created.", { permanent: false })
    }
    /**
     * Click event when a users clicks on the Monster button
     * @param {Event} e The click event
     */
    private async monsterGenerationButtonClicked(e: Event) {
        let monsterTypeSelectValue = (<JQuery>this.element)
            .find("#monsterTypeSelect")
            .find(":selected")
            .val()
        let selectedType: string = monsterTypeSelectValue as string

        // Settings
        const defaultCR = game.settings.get(
            "foundryvtt-sfrpg-populator",
            "defaultCR"
        )
        const dynamicTokenImages = game.settings.get(
            "foundryvtt-sfrpg-populator",
            "dynamicTokenImages"
        )

        // Context
        let context = new NPCCreationContext()

        // Location
        context.folderId = this.options["folderId"]

        // CR
        context.CR = defaultCR

        // Validates selected type
        if (Grafts.creatureType[selectedType]) {
            let generatorOption = CreatureTypeGenerationOptions[selectedType]
            let typeKey = Type[generatorOption.type]

            context.creatureTypeGraft = Grafts.creatureType[typeKey]

            // TODO: For now we just use the 1st (and only) subttype associated with type
            if (generatorOption.subtypes?.length == 1) {
                let subtypeKey = Subtype[generatorOption.subtypes[0]]
                context.creatureSubtypeGrafts = [
                    Grafts.creatureSubtype[subtypeKey]
                ]
            }

            context.universalCreatureRules =
                generatorOption.universalCreatureRules
        }

        await NPCFactory.makeHostile(context)
        ui.notifications.info("NPC created.", { permanent: false })

        // Open monster wizard panel
        //let monsterWizardPanelController = new MonsterWizardPanel1Controller(new NPCCreationContext());
        //monsterWizardPanelController.render(true);
    }
}
