import NPCCreationContext from "../models/NPCCreationContext.js"

export default class MonsterWizardPanel2Controller extends FormApplication {
    constructor(context: NPCCreationContext) {
        super()
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "populator-panel",
            classes: ["sfrpg"],
            template:
                "modules/sfrpg-populator/templates/MonsterWizardPanel_2.html",
            width: 300,
            height: 300,
            minimizable: true,
            resizable: true,
            title: "Create Monster (2/2)"
        })
    }

    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    public activateListeners(html: JQuery<HTMLElement>) {}

    /**
     * Retrieves Data to be used in rendering template.
     *
     * @param options
     * @returns {Promise<Object>}
     */
    getData(options = {}) {
        return mergeObject(super.getData(), {
            options: options,
            isGM: game.user.isGM
        })
    }
}
