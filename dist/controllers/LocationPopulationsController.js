import { Utils } from "../utils/Utils.js";
class LocationPopulationsController extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);
        this.path = "";
    }
    /**
     * Default Options for this FormApplication
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["form", "populationLocations"],
            width: 640,
            height: "fit-content",
            closeOnSubmit: true
        });
    }
    prepSelection(key) {
        const path = `${this.path}.${key}`;
        let data = Utils.settingData(path);
        let result = {
            select: [],
            name: data.name,
            hint: data.hint,
            selected: Utils.sGet(path)
        };
        for (let [key, value] of Object.entries(data.choices)) {
            result.select.push({ key, value });
        }
        return result;
    }
    prepSetting(key) {
        const path = this.path + `.${key}`;
        let data = Utils.settingData(path);
        return {
            value: Utils.sGet(path),
            name: data.name,
            hint: data.hint
        };
    }
    /**
     * Executes on form submission
     * @param {Event} event - the form submission event
     * @param {Object} formData - the form data
     */
    async _updateObject(event, formData) {
        var _a;
        const iterableSettings = Object.keys(formData);
        for (let key of iterableSettings) {
            await Utils.sSet(`${key}`, formData[key]);
        }
        (_a = canvas.scene) === null || _a === void 0 ? void 0 : _a.tokens.forEach((token) => token.object.refresh());
    }
}
export class PopulationSettings extends LocationPopulationsController {
    constructor(object, options = {}) {
        super(object, options);
        this.locations = Utils.deepClone(Utils.sGet("locations"));
        this.changeTabs = 0;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: `SFRPG : Population Locations`,
            template: "./modules/sfrpg-populator/templates/PopulationSettings.hbs",
            classes: [
                "form",
                "populationLocations",
                "populationLocationSettings"
            ],
            height: "auto",
            tabs: [
                {
                    navSelector: ".tabs",
                    contentSelector: ".content",
                    initial: "behavior"
                }
            ]
        });
    }
    getData(options) {
        return {
            locations: this.locations
        };
    }
    /**
     * This is the earliest method called after render() where changing tabs can be called
     * @param {*} html
     */
    _activateCoreListeners(html) {
        super._activateCoreListeners(html);
        if (this.changeTabs) {
            const tabName = this.changeTabs.toString();
            if (tabName !== this._tabs[0].active) {
                this._tabs[0].activate(tabName);
            }
            this.changeTabs = 0;
        }
    }
    async activateListeners(html) {
        super.activateListeners(html);
        html.find("button[name=reset]").on("click", async (event) => {
            async function resetToDefault(key) {
                const path = `${key}`;
                await Utils.sSet(path, Utils.settingData(path).default);
            }
            await resetToDefault("locations");
            this.locations = Utils.deepClone(Utils.sGet("locations"));
            this.render();
        });
        // Handle all changes to tables
        html.find("a[data-action=add-table]").on("click", (event) => {
            this.changeTabs = this.locations.length;
            this.locations.push({
                name: "New Location",
                totalPercentage: 100,
                population: [
                    {
                        name: "android",
                        percentage: 100
                    }
                ]
            });
            this.render();
        });
        html.find("button[data-action=table-delete]").on("click", (event) => {
            var _a;
            const idx = Number((_a = event.target) === null || _a === void 0 ? void 0 : _a.dataset.idx);
            this.locations.splice(idx, 1);
            this.changeTabs = this.locations.length - 1;
            this.render();
        });
        html.find("button[data-action=change-prio]").on("click", (event) => {
            var _a, _b;
            const prio = ((_a = event.target) === null || _a === void 0 ? void 0 : _a.dataset.prio) == "increase" ? -1 : 1;
            const idx = Number((_b = event.target) === null || _b === void 0 ? void 0 : _b.dataset.idx);
            function arraymove(arr, fromIndex, toIndex) {
                var element = arr[fromIndex];
                arr.splice(fromIndex, 1);
                arr.splice(toIndex, 0, element);
            }
            arraymove(this.locations, idx, idx + prio);
            this.changeTabs = idx + prio;
            this.render();
        });
        for (const element of html[0].querySelectorAll(".form-group input, .form-group textarea")) {
            element.addEventListener("change", async (event) => {
                var _a, _b;
                const name = (_a = event.target) === null || _a === void 0 ? void 0 : _a.name.split(".");
                const location = this.locations[name[1]][name[2]];
                if (location)
                    this.locations[name[1]][name[2]] = (_b = event.target) === null || _b === void 0 ? void 0 : _b.value;
                event.preventDefault();
            });
        }
        // Handle all changes for populations
        html.find("[data-action=location-add]").on("click", (event) => {
            var _a, _b;
            // Fix for clicking either the A or I tag
            if (event.target.tagName == "A") {
                var idx = Number((_a = event.target) === null || _a === void 0 ? void 0 : _a.children[0].dataset.idx);
            }
            else
                idx = Number((_b = event.target) === null || _b === void 0 ? void 0 : _b.dataset.idx);
            this.locations[idx].population.push({ name: "android", percentage: 0 });
            this.render();
        });
        for (const element of html[0].querySelectorAll("[data-action=location-delete]")) {
            element.addEventListener("click", async (event) => {
                var _a, _b;
                const table = (_a = event.target) === null || _a === void 0 ? void 0 : _a.dataset.table;
                const idx = Number((_b = event.target) === null || _b === void 0 ? void 0 : _b.dataset.idx);
                if (idx) {
                    this.locations[table].totalPercentage =
                        parseInt(this.locations[table].totalPercentage) -
                            parseInt(this.locations[table].population[idx].percentage);
                    this.locations[table].population.splice(Number(idx), 1);
                }
                this.render();
            });
        }
        for (const element of html[0].querySelectorAll(".location-species input, .location-species select")) {
            element.addEventListener("change", async (event) => {
                var _a, _b, _c, _d;
                const name = (_a = event.target) === null || _a === void 0 ? void 0 : _a.name.split(".");
                const originalValue = this.locations[name[1]].population[name[3]][name[4]];
                if (name[4] === "percentage") {
                    this.locations[name[1]].population[name[3]][name[4]] =
                        parseInt((_b = event.target) === null || _b === void 0 ? void 0 : _b.value);
                    this.locations[name[1]].totalPercentage =
                        parseInt(this.locations[name[1]].totalPercentage) -
                            parseInt(originalValue) +
                            parseInt((_c = event.target) === null || _c === void 0 ? void 0 : _c.value);
                }
                else if (name[4] === "name") {
                    this.locations[name[1]].population[name[3]][name[4]] =
                        (_d = event.target) === null || _d === void 0 ? void 0 : _d.value;
                }
                event.preventDefault();
                this.render();
            });
        }
    }
    _getSubmitData(updateData) {
        const original = super._getSubmitData(updateData);
        const data = expandObject(original);
        let locations = [];
        for (var key in data.locations) {
            if (parseInt(this.locations[key].totalPercentage) != 100) {
                ui.notifications.error(`Total percentage must be 100 for location ${this.locations[key].name}.`, { permanent: false });
            }
            const population = data.locations[key].population;
            const sortable = Object.keys(population)
                .sort(function (a, b) {
                return population[a].value - population[b].value;
            })
                .map((kkey) => population[kkey]);
            locations.push({
                name: data.locations[key].name,
                totalPercentage: this.locations[key].totalPercentage,
                population: sortable
            });
        }
        return { locations: locations };
    }
}
//# sourceMappingURL=LocationPopulationsController.js.map