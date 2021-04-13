import { Grafts } from "./Grafts.js";
export const Races = {
    // A list of humanoid type races which will randomly be generated (generally for non-combat NPCs)
    nonCombatantRaces: {
        "android": { name: "android", size: "medium", creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.android },
        "dwarf": { name: "dwarf", size: "medium", languages: ["dwarven"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.dwarf },
        "gnome": { name: "gnome", size: "small", languages: ["gnome"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.gnome },
        "human": { name: "human", size: "medium", creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.human },
        "halfling": { name: "halfling", size: "small", languages: ["halfling"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.halfling },
        "kasatha": { name: "kasatha", size: "medium", arms: 4, languages: ["kasatha"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.kasatha },
        "lashunta": { name: "lashunta", size: "medium", languages: ["castrovelian"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.lashunta },
        "nuar": { name: "nuar", size: "medium", creatureTypeGraft: Grafts.creatureType.monstrousHumanoid },
        "skittermander": { name: "skittermander", size: "small", arms: 6, creatureTypeGraft: Grafts.creatureType.humanoid },
        "shirren": { name: "shirren", size: "medium", languages: ["shirren"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.shirren },
        "vesk": { name: "vesk", size: "medium", languages: ["vesk"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.vesk },
        "ysoki": { name: "ysoki", size: "small", languages: ["akiton", "ysoki"], creatureTypeGraft: Grafts.creatureType.humanoid, creatureSubtypeGraft: Grafts.creatureSubtype.ysoki }
    }
};
//# sourceMappingURL=Races.js.map