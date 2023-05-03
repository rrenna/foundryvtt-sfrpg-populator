import { SpeciesList } from "../data/Species.js"
import { NPCFactory } from "../factories/NPCFactory.js"
import MonsterWizardPanel1Controller from "./MonsterWizardPanel1Controller.js"
import NPCCreationContext, {
    TokenOptions
} from "../models/NPCCreationContext.js"
import { Grafts } from "../data/Grafts.js"
import {
    MonsterCreation,
    MonsterReferenceSymbol
} from "../data/MonsterCreation.js"
import CreatureTypeGraft from "../models/CreatureTypeGraft.js"
import { CreatureTypeGenerationOptions } from "../data/Generator.js"
import { Subtype, Type } from "../data/Types.js"
import CreatureSubtypeGraft from "../models/CreatureSubtypeGraft.js"
import { CR } from "../data/CRs.js"
import { Randomizer } from "../Randomizer.js"
import Species from "../models/SpeciesModel.js"
import { Probabilities } from "../data/Probabilities.js"
import { Utils } from "../utils/Utils.js"

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
            template: "modules/sfrpg-populator/templates/PopulatorPanel.html",
            width: 400,
            height: 450,
            minimizable: true,
            resizable: true,
            title: "SFRPG - Populator",
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
            NPCSpeciesDistributions: Utils.sGet("locations"),
            NPCCR: CR,
            NPCSpecies: SpeciesList.humanoidSpecies,
            supportedCreatureTypes: CreatureTypeGenerationOptions,
            arrays: MonsterCreation.arrays
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
            .find(".monsterGenerationButton")
            .on("click", this.monsterGenerationButtonClicked.bind(this))
        ;(<JQuery>html).on(
            "change",
            ".npcSpeciesSelect",
            this.showSpeciesLocationDistribution.bind(this)
        )
        // listener for NPCCR value change
        ;(<JQuery>html).on(
            "change", 
            ".npcCR", 
            this.npcCRChanged.bind(this)
        )
        // listener for npcslider value change
        ;(<JQuery>html).on(
            "change",
            ".npcCRSlider",
            this.npcCRSliderChanged.bind(this)
        )

        tippy(".populatorInfo")
        tippy(".populatorButton")
    }

    /**
     * Click event when a users changes the CR slider. Updates the npcCRValue span to match the slider value.
     * @param {Event} e The click event
     * @returns {Promise<void>}
     * @private
     * @memberof PopulatorPanelController
     *  */
    private async npcCRSliderChanged(e: Event) {
        const npcCRSlider = e.target as HTMLInputElement
        const npcCRValue = document.getElementById("npcCRValue")
        if (npcCRValue) {
            npcCRValue.innerHTML = npcCRSlider.value
        }
    }

    /**
     * Click event when a users changes the CR option chosen. Hides the npcCRSlider if the user selects a value other than random.
     * @param {Event} e The click event
     * @returns {Promise<void>}
     */
    private async npcCRChanged(e: Event) {
        const npcCRSelect = e.target as HTMLSelectElement
        const npcCRSlider = document.getElementById("npcCRDiv")
        if (npcCRSlider) {
            if (npcCRSelect.value === "random") {
                npcCRSlider.style.display = "block"
            } else {
                npcCRSlider.style.display = "none"
            }
        }
    }

    /**
     * Click event when a user change the species option chosen.
     * @param {Event} e The click event
     */
    private async showSpeciesLocationDistribution(e: Event) {
        const npcSpeciesSelect = e.target as HTMLSelectElement
        const distributionDiv = document.getElementById(
            "speciesDistributionDiv"
        )
        if (distributionDiv) {
            if (npcSpeciesSelect.value === "random") {
                distributionDiv.style.display = "block"
            } else {
                distributionDiv.style.display = "none"
            }
        }
    }

    /**
     * Click event when a users clicks on the NPC button
     * @param {Event} e The click event
     */
    private async npcGenerationButtonClicked(e: Event) {
        let locationSelection = (<JQuery>this.element)
            .find("#npcLocation")
            .find(":selected")
            .val()
        let selectedLocation: string = locationSelection as string
        let npcSpeciesSelectValue = (<JQuery>this.element)
            .find("#npcSpeciesSelect")
            .find(":selected")
            .val()
        let selectedSpecies: string = npcSpeciesSelectValue as string
        let npcCRSelectValue = (<JQuery>this.element)
            .find("#npcCR")
            .find(":selected")
            .val()
        let selectedCR: string = npcCRSelectValue as string
        let arraySelection = (<JQuery>this.element)
            .find("#selectedArray")
            .find(":selected")
            .val()
        let selectedArray: string = arraySelection as string
        let npcCRSliderValue = (<JQuery>this.element)
            .find("#npcCRSlider")
            .val()
        let selectedCRSlider: string = npcCRSliderValue as string

        // Settings
        const dynamicTokenImages = game.settings.get(
            "sfrpg-populator",
            "dynamicTokenImages"
        )

        const dynamicTokenImagesLocation = game.settings.get(
            "sfrpg-populator",
            "dynamicTokenImagesLocation"
        )

        if (selectedArray === "random") {
            const arrayNames = Object.keys(MonsterCreation.arrays)
            selectedArray = Randomizer.getRandom(arrayNames)
        }

        if (selectedCR === "random") {
            let crRange = CR.slice(0, parseInt(selectedCRSlider) + 2)
            selectedCR = Randomizer.getRandom(crRange)
        }

        // Update Context options
        let context = new NPCCreationContext()
        context.npcLocation = selectedLocation
        context.monsterReferenceSymbol = MonsterReferenceSymbol[selectedArray]
        context.CR = selectedCR
        context.folderId = this.options["folderId"]
        context.species = selectedSpecies
        context.tokenOptions.dynamicImage = !!dynamicTokenImages
        context.tokenOptions.dynamicImageRootLocation = dynamicTokenImagesLocation

        await NPCFactory.makeNonHostile(context)
        ui.notifications.info(`NPC ${context.name} created.`, {
            permanent: false
        })
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
        const defaultCR = game.settings.get("sfrpg-populator", "defaultCR")
        const dynamicTokenImages = game.settings.get(
            "sfrpg-populator",
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
