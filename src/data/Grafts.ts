import CreatureTypeGraft from "../models/CreatureTypeGraft.js";

export const Grafts = {
    creatureType: {
        animal: new CreatureTypeGraft("animal"),
        humanoid: new CreatureTypeGraft("humanoid"),
        monstrousHumanoid: new CreatureTypeGraft("monstrous humanoid")
    }
    , creatureSubtype: {
        android: "android",
        dwarf: "dwarf",
        elf: "elf",
        gnome: "gnome",
        gnoll: "gnoll",
        halfling: "hafling",
        human: "human",
        kasatha: "kasatha",
        lashunta: "lashunta",
        shirren: "shirren",
        skittermander: "skittermander",
        vesk: "vesk",
        ysoki: "ysoki"
    }
};