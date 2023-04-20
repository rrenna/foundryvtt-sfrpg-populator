import { SpeciesList } from "../data/Species.js";
import { NPCFactory } from "../factories/NPCFactory.js";
import NPCCreationContext from "../models/NPCCreationContext.js";
import { Grafts } from "../data/Grafts.js";
import { MonsterCreation, MonsterReferenceSymbol } from "../data/MonsterCreation.js";
import { CreatureTypeGenerationOptions } from "../data/Generator.js";
import { Subtype, Type } from "../data/Types.js";
import { CR } from "../data/CRs.js";
import { Randomizer } from "../Randomizer.js";
import { Utils } from "../utils/Utils.js";
// Options provided to the Populator panel - adds folderId to default options
export class PopulatorPanelOptions {
    constructor(folderId) {
        this.folderId = folderId;
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
        });
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
        });
    }
    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    activateListeners(html) {
        // Listener for when a day is clicked
        ;
        html
            .find(".npcGenerationButton")
            .on("click", this.npcGenerationButtonClicked.bind(this));
        html
            .find(".monsterGenerationButton")
            .on("click", this.monsterGenerationButtonClicked.bind(this));
        html.on("change", ".npcSpeciesSelect", this.showSpeciesLocationDistribution.bind(this));
        html.on("change", ".npcCR", this.npcCRChanged.bind(this));
        html.on("change", ".npcCRSlider", this.npcCRSliderChanged.bind(this));
        tippy(".populatorInfo");
        tippy(".populatorButton");
    }
    /**
     * Click event when a users changes the CR slider. Updates the npcCRValue span to match the slider value.
     * @param {Event} e The click event
     * @returns {Promise<void>}
     * @private
     * @memberof PopulatorPanelController
     *  */
    async npcCRSliderChanged(e) {
        const npcCRSlider = e.target;
        const npcCRValue = document.getElementById("npcCRValue");
        if (npcCRValue) {
            npcCRValue.innerHTML = npcCRSlider.value;
        }
    }
    /**
     * Click event when a users changes the CR option chosen. Hides the npcCRSlider if the user selects a value other than random.
     * @param {Event} e The click event
     * @returns {Promise<void>}
     */
    async npcCRChanged(e) {
        const npcCRSelect = e.target;
        const npcCRSlider = document.getElementById("npcCRDiv");
        if (npcCRSlider) {
            if (npcCRSelect.value === "random") {
                npcCRSlider.style.display = "block";
            }
            else {
                npcCRSlider.style.display = "none";
            }
        }
    }
    /**
     * Click event when a user change the species option chosen.
     * @param {Event} e The click event
     */
    async showSpeciesLocationDistribution(e) {
        const npcSpeciesSelect = e.target;
        const distributionDiv = document.getElementById("speciesDistributionDiv");
        if (distributionDiv) {
            if (npcSpeciesSelect.value === "random") {
                distributionDiv.style.display = "block";
            }
            else {
                distributionDiv.style.display = "none";
            }
        }
    }
    /**
     * Click event when a users clicks on the NPC button
     * @param {Event} e The click event
     */
    async npcGenerationButtonClicked(e) {
        let locationSelection = this.element
            .find("#npcLocation")
            .find(":selected")
            .val();
        let selectedLocation = locationSelection;
        let npcSpeciesSelectValue = this.element
            .find("#npcSpeciesSelect")
            .find(":selected")
            .val();
        let selectedSpecies = npcSpeciesSelectValue;
        let npcCRSelectValue = this.element
            .find("#npcCR")
            .find(":selected")
            .val();
        let selectedCR = npcCRSelectValue;
        let arraySelection = this.element
            .find("#selectedArray")
            .find(":selected")
            .val();
        let selectedArray = arraySelection;
        let npcCRSliderValue = this.element
            .find("#npcCRSlider")
            .val();
        let selectedCRSlider = npcCRSliderValue;
        // Settings
        const dynamicTokenImages = game.settings.get("sfrpg-populator", "dynamicTokenImages");
        const dynamicTokenImagesLocation = game.settings.get("sfrpg-populator", "dynamicTokenImagesLocation");
        if (selectedArray === "random") {
            const arrayNames = Object.keys(MonsterCreation.arrays);
            selectedArray = Randomizer.getRandom(arrayNames);
        }
        if (selectedCR === "random") {
            let crRange = CR.slice(0, parseInt(selectedCRSlider) + 2);
            selectedCR = Randomizer.getRandom(crRange);
        }
        // Update Context options
        let context = new NPCCreationContext();
        context.npcLocation = selectedLocation;
        context.monsterReferenceSymbol = MonsterReferenceSymbol[selectedArray].toString();
        context.CR = selectedCR;
        context.folderId = this.options["folderId"];
        context.species = selectedSpecies;
        context.tokenOptions.dynamicImage = !!dynamicTokenImages;
        context.tokenOptions.dynamicImageRootLocation = dynamicTokenImagesLocation;
        await NPCFactory.makeNonHostile(context);
        ui.notifications.info(`NPC ${context.name} created.`, {
            permanent: false
        });
    }
    /**
     * Click event when a users clicks on the Monster button
     * @param {Event} e The click event
     */
    async monsterGenerationButtonClicked(e) {
        var _a;
        let monsterTypeSelectValue = this.element
            .find("#monsterTypeSelect")
            .find(":selected")
            .val();
        let selectedType = monsterTypeSelectValue;
        // Settings
        const defaultCR = game.settings.get("sfrpg-populator", "defaultCR");
        const dynamicTokenImages = game.settings.get("sfrpg-populator", "dynamicTokenImages");
        // Context
        let context = new NPCCreationContext();
        // Location
        context.folderId = this.options["folderId"];
        // CR
        context.CR = defaultCR;
        // Validates selected type
        if (Grafts.creatureType[selectedType]) {
            let generatorOption = CreatureTypeGenerationOptions[selectedType];
            let typeKey = Type[generatorOption.type];
            context.creatureTypeGraft = Grafts.creatureType[typeKey];
            // TODO: For now we just use the 1st (and only) subttype associated with type
            if (((_a = generatorOption.subtypes) === null || _a === void 0 ? void 0 : _a.length) == 1) {
                let subtypeKey = Subtype[generatorOption.subtypes[0]];
                context.creatureSubtypeGrafts = [
                    Grafts.creatureSubtype[subtypeKey]
                ];
            }
            context.universalCreatureRules =
                generatorOption.universalCreatureRules;
        }
        await NPCFactory.makeHostile(context);
        ui.notifications.info("NPC created.", { permanent: false });
        // Open monster wizard panel
        //let monsterWizardPanelController = new MonsterWizardPanel1Controller(new NPCCreationContext());
        //monsterWizardPanelController.render(true);
    }
}
//# sourceMappingURL=PopulatorPanelController.js.map