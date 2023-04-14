import { Utils } from "../utils/Utils.js"

class LocationPopulationsController extends FormApplication {
    path: string = ""

    constructor(object, options = {}) {
        super(object, options)
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
        })
    }

    prepSelection(key: string) {
        const path = `${this.path}.${key}`
        let data = Utils.settingData(path)
        let result: {
            select: { key: string; value: any }[]
            name: string
            hint: string
            selected: any
        } = {
            select: [],
            name: data.name,
            hint: data.hint,
            selected: Utils.sGet(path)
        }
        for (let [key, value] of Object.entries(data.choices)) {
            result.select.push({ key, value })
        }
        return result
    }

    prepSetting(key) {
        const path = this.path + `.${key}`
        let data = Utils.settingData(path)
        return {
            value: Utils.sGet(path),
            name: data.name,
            hint: data.hint
        }
    }

    /**
     * Executes on form submission
     * @param {Event} event - the form submission event
     * @param {Object} formData - the form data
     */
    async _updateObject(event, formData) {
        const iterableSettings = Object.keys(formData)
        for (let key of iterableSettings) {
            await Utils.sSet(`${key}`, formData[key])
        }
        canvas.scene?.tokens.forEach((token) => token.object.refresh())
    }
}

export class PopulationSettings extends LocationPopulationsController {
    private locations: any
    private changeTabs: number

    constructor(object: any, options: any = {}) {
        super(object, options)
        this.locations = Utils.deepClone(Utils.sGet("locations"))
        this.changeTabs = 0
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: `SFRPG : Population Locations`,
            template:
                "./modules/sfrpg-populator/templates/PopulationSettings.hbs",
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
        })
    }

    getData(options: any) {
		return {
            locations: this.locations
        }
    }

    /**
     * This is the earliest method called after render() where changing tabs can be called
     * @param {*} html
     */
    protected _activateCoreListeners(html: any) {
        super._activateCoreListeners(html)
        if (this.changeTabs) {
            const tabName = this.changeTabs.toString()
            if (tabName !== this._tabs[0].active) {
                this._tabs[0].activate(tabName)
            }
            this.changeTabs = 0
        }
    }

    async activateListeners(html) {
        super.activateListeners(html)
        html.find("button[name=reset]").on("click", async (event) => {
            async function resetToDefault(key) {
                const path = `${key}`
                await Utils.sSet(path, Utils.settingData(path).default)
            }
            await resetToDefault("locations")
            this.locations = Utils.deepClone(Utils.sGet("locations"))
            this.render()
        })

        // Handle all changes to tables
        html.find("a[data-action=add-table]").on("click", (event) => {
            this.changeTabs = this.locations.length
            this.locations.push({
                name: "New Location",
                totalPercentage: 100,
                population: [
                    {
                        name: "android",
                        percentage: 100
                    }
                ]
            })
            this.render()
        })
        html.find("button[data-action=table-delete]").on("click", (event) => {
            const idx = Number(event.target?.dataset.idx)
            this.locations.splice(idx, 1)
            this.changeTabs = this.locations.length - 1
            this.render()
        })
        html.find("button[data-action=change-prio]").on("click", (event) => {
            const prio = event.target?.dataset.prio == "increase" ? -1 : 1
            const idx = Number(event.target?.dataset.idx)
            function arraymove(arr, fromIndex, toIndex) {
                var element = arr[fromIndex]
                arr.splice(fromIndex, 1)
                arr.splice(toIndex, 0, element)
            }
            arraymove(this.locations, idx, idx + prio)
            this.changeTabs = idx + prio
            this.render()
        })
        for (const element of html[0].querySelectorAll(
            ".form-group input, .form-group textarea"
        )) {
            element.addEventListener("change", async (event) => {
                const name = event.target?.name.split(".")
                const location = this.locations[name[1]][name[2]]
                if (location)
                    this.locations[name[1]][name[2]] = event.target?.value
                event.preventDefault()
            })
        }

        // Handle all changes for populations
        html.find("[data-action=location-add]").on("click", (event) => {
            // Fix for clicking either the A or I tag
            if (event.target.tagName == "A") {
                var idx = Number(event.target?.children[0].dataset.idx)
            } else idx = Number(event.target?.dataset.idx)
            this.locations[idx].population.push({ name: "android", percentage: 0 })
            this.render()
        })
        for (const element of html[0].querySelectorAll(
            "[data-action=location-delete]"
        )) {
            element.addEventListener("click", async (event) => {
                const table = event.target?.dataset.table
                const idx = Number(event.target?.dataset.idx)
                if (idx) {
					this.locations[table].totalPercentage =                         
					parseInt(this.locations[table].totalPercentage) -
					parseInt(this.locations[table].population[idx].percentage) 
                    this.locations[table].population.splice(Number(idx), 1)
				}
                this.render()
            })
        }
        for (const element of html[0].querySelectorAll(
            ".location-species input, .location-species select"
        )) {
            element.addEventListener("change", async (event) => {
                const name = event.target?.name.split(".")
                const originalValue = this.locations[name[1]].population[name[3]][
                    name[4]
                ]
                if (name[4] === "percentage") {
                    this.locations[name[1]].population[name[3]][name[4]] =
                        parseInt(event.target?.value)
                    this.locations[name[1]].totalPercentage =
                        parseInt(this.locations[name[1]].totalPercentage) -
                        parseInt(originalValue) +
                        parseInt(event.target?.value)
                } else if (name[4] === "name") {
                    this.locations[name[1]].population[name[3]][name[4]] =
                        event.target?.value
                }
                event.preventDefault()
                this.render()
            })
        }
    }

    _getSubmitData(updateData: any) {
        const original = super._getSubmitData(updateData)
        const data = expandObject(original)
        let locations: any[] = []
        for (var key in data.locations) {
			if (parseInt(this.locations[key].totalPercentage) != 100) {
				ui.notifications.error(`Total percentage must be 100 for location ${this.locations[key].name}.`, { permanent: false })
			}

			const population = data.locations[key].population
            const sortable = Object.keys(population)
                .sort(function (a, b) {
                    return population[a].value - population[b].value					
                })
                .map((kkey) => population[kkey])

			locations.push({
                name: data.locations[key].name,
                totalPercentage: this.locations[key].totalPercentage,
                population: sortable
            })
        }
        return { locations: locations }
    }
}
