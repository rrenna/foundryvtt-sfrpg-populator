# Starfinder Populator
Populate your Starfinder world with life of all shapes and sizes.

## Features:
- Generates non-combatant NPCs for your world
   - Randomizes the name, gender, species, alignment, personality trait and inventory of the NPC
   - Intelligently randomizes the token image of NPCs when placed in a scene (optional setting, *off* by default)
- **experimental** Generates monsters 
- **experimental** monster mutation
   - Increase or decrease the CR of an existing monster or NPC

## FAQ:
*Q: What kind of monsters can you currently generate?*

**A: Currently you are limited to Animal, Oooze, Vermin or Construct. `CR 1/3 - 5` all melee focused combatants (except constructs which are equipped with ranged weapons).

*Q: How do mutations work?*

**A: We look up where the monster should be on the appropriate array (based on it's current CR) then calcualte the difference between each stat in that row and the target row, then apply that difference (either positive or negative). Currently we are only touching the basic stats - but this will be expanded to things like adding additional special abilities.**

*Q: Does Populator just pick a random species when quickly making an NPC?*

**A: No I follow the distribution of species found on Absalom Station.  As of `0.1.X` you can create an NPC of your specific desired species.

*Q: What species does populator currently support?*

**A: Android, Dwarf, Drow, Gnome, Gnoll, Half-Elf, Half-Orc, Halfling, Human, Hobgoblin, Kasatha, Lashunta, Nuar, Skittermander, Shirren, Vesk, Ysoki**

*Q: So how do you pick attribute and skill modifiers?*

**All values come directly from the process outlined in the Alien Archive (Non-combatant NPCs use the expert array with a creature type and optionally a creature subtype graft applied)**

*Q: How do I setup my folder structure for dynamic token images?*

**Extract `example folder structure.zip` into your data folder and fill in the appropriate folders with images (Please be aware this feature is experimental and subject to change).**
