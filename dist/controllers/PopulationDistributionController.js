import { Probabilities } from "../data/Probabilities.js";
import { Races } from "../data/Races.js";
export default class PopulatorDistributionController extends FormApplication {
    constructor(context) {
        super();
        this.locationSelect = document.getElementById('npcLocation');
        this.context = context;
        // if (this.locationSelect) {
        //   this.locationSelect.addEventListener('change', this.onLocationChange);
        // }
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "population-panel",
            classes: ["sfrpg"],
            template: "modules/sfrpg-populator/templates/PopulationDistribution.html",
            width: 400,
            height: 450,
            minimizable: true,
            resizable: true,
            title: "Create Location Species Distribution"
        });
    }
    /**
     * Adds any event listeners to the application DOM
     * @param {JQuery<HTMLElement>} html The root HTML of the application window
     * @protected
     */
    activateListeners(html) {
        // Listener for when add a row is clicked
        ;
        html
            .find(".addSpecies")
            .on("click", this.addSpecies.bind(this));
        html
            .find(".npcLocation")
            .on("change", this.onLocationChange.bind(this));
    }
    onLocationChange() {
        if (this.locationSelect) {
            const selectedLocation = this.locationSelect.value;
            const selectedDistribution = Probabilities.raceDistributions[selectedLocation];
            const tableRows = selectedDistribution.map(({ name, percentage }) => `<tr><td>${name}</td><td>${percentage}</td></tr>`);
            const tableBody = tableRows.join('');
            const tableHtml = `<table><thead><tr><th>Race</th><th>Percentage</th></tr></thead><tbody>${tableBody}</tbody></table>`;
            let raceDistributionTable = document.getElementById("raceDistributionTable");
            if (raceDistributionTable) {
                raceDistributionTable.innerHTML = tableHtml;
            }
        }
    }
    addSpecies() {
        var _a, _b;
        let species = (_a = this.element.find("#species").val()) === null || _a === void 0 ? void 0 : _a.toString();
        let percentage = (_b = this.element.find("#percentage").val()) === null || _b === void 0 ? void 0 : _b.toString();
        let table = this.element.find("#speciesTable");
        let newRow = $("<tr>");
        if (species && percentage) {
            let speciesCell = $("<td>").text(species);
            let percentageCell = $("<td>").text(percentage);
            newRow.append(speciesCell);
            newRow.append(percentageCell);
            table.append(newRow);
        }
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
            species: Races.nonCombatantRaces,
            NPCRacesDistributions: Probabilities.raceDistributions
        });
    }
}
//# sourceMappingURL=PopulationDistributionController.js.map