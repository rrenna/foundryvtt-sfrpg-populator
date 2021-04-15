import { CR, MonsterCreation } from "../data/MonsterCreation.js";
import { Grafts } from "../data/Grafts.js";
export default class MonsterWizardPanelController extends FormApplication {
    constructor(context) {
        super();
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "populator-panel",
            template: "modules/foundryvtt-sfrpg-populator/templates/MonsterWizardPanel_1.html",
            width: 300,
            height: 300,
            minimizable: true,
            resizable: true,
            title: "Create Monster (1/2)"
        });
    }
    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    activateListeners(html) {
        // Listener for when a day is clicked
        //(<JQuery>html).find(".testButton").on('click', this.testButtonClicked.bind(this));
        html.find('select[name="selectedArray"]').change(this.onSelectedArrayChanged.bind(this));
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
            arrays: MonsterCreation.arrays,
            CRs: CR,
            creatureTypes: Grafts.creatureType,
            //creatureSubtypes: Grafts.creatureSubtype
        });
    }
    //
    async onSelectedArrayChanged(e) {
        //e.target.value
        //this.selectedArray = ((HTMLSelectElement) e.target).val;
        //this.render(true);
        //
    }
}
//# sourceMappingURL=MonsterWizardPanelController.js.map