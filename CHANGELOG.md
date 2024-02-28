### 0.4.7
### Changed
Change dynamic images game setting to Boolean/Checkbox

### 0.4.6
### Changed
NPC Mutator fixes

### 0.4.5
### Changed
- V11 compatibility
- Changed location probabilities to use 'other'
- Changed actor update for inventory to use createEmbeddedDocuments
- Fixed name of laser pistol weapon for high cr npcs
- Updated compendium search
- Bugfix for combatant generation

### 0.4.4
### Changed
- Bugfix for brute not applying correctly

### 0.4.3
### Changed
- Fixed broken monster creation
- Fixed bug setting current HP
- Added integratedEquipment UniversalCreatureRule
- Creature size being set correctly
- Added SRO as a creature type
- NPC ability DC now determined by Array
- NPC spell save DC now determined by Array
- A Creature Type Species record can have an array of numbers for how many arms it has
- A Creature Type Species record can have an array of sizes or single size during definition
- A Creature Type Species record can have an array of UniversalCreatureRules defined
- Added function to get random result from an array of objects
- Added Creature Subtypes with no base effects (chaotic,evil,extraplanar,good,lawful,magical,native) to Subtype enum
* Known Issues
- Creature subspecies ex. SRO (small) not selected only the first version of each ever used. 
- Universal Creature Rules list not yet applied to NPC's

### 0.4.2
### Changed
- Added slider in populator window to choose maximum CR when using random

### 0.4.1
### Changed
- Added other category for locations

### 0.4.0
### Changed
- Added new Location Population UI accessible in the game settings
- Updated location dropdowns to pull from the new locations game setting
- Renaming references of race to species
- Added new game setting for locations to track user editable list of population locations
- Registered new menu locationSettings
- Updated Probabilities to use percentage values from 0-100 instead of 0.00 to 1
- Updated random function to use numbers from 0 to 100 instead of 0 to 1
- Updated randomSpecies function to use new location definition
- Added new functions to Utils class to get and set game settings
- Renamed Uils file to Utils
- Updated definition of locations for population control of random species. 
- Updated the example folder structure to remove images

### 0.3.2
### Changed
- Added configuration option to choose the root folder

### 0.3.1
### Changed
- Added Array choice dropdown
- Added all CR's for combatant array
- Added ability and spell DC's to arrays for future use
- Hide location dropdown when Creature Subtype is not randomized
- Fixed hobgoblin language
- Gave combatant array npc's a laser pistol
- Fixed number of arms assigned for species like Kasatha and Skittermander

### 0.3.0
### Changed
- Bugfix for dynamic image setting.
- Added configuration for non-binary gender.
- Log message if folder not found any dynamic images enabled.
- Bugfix for brute when CR is 24 or 25. 
- Removed .DS_STORE files from the example folder structure since they caused issues in forge.

### 0.2.9
### Changed
- Bugfixes for weapons to match system data format.
- Updates to Grafts application so spells are added correctly.
- Updated module refrence to remove warning on Foundry startup.

### 0.2.8
### Changed
- Updated Module to work on official Foundry Bazaar

### 0.2.7
### Changed
- Add full expert array up to CR 25

### 0.2.6
### Changed
- Adds ability to choose a location and added Locus1

### 0.2.2
### Changed
- updated code to be compatible with Foundry v9 build 280

### 0.2.1
### Added
- Added initiative and ability score scaling to mutator

### Changed
- Tweaked mutator logic to be compatible with Foundry 0.8

### 0.2.0
### Added
- (Experimental) Mutator screen, up or downscale an existing NPC
- Folder support

## 0.1.7
### Added
- Tippy tooltips

## 0.1.6
### Added
- Construct type monsters
- Monsters can now have ranged weapon

### Changed
- Under the hood refactor

### Fixed
- Save bonuses should now be properly applied

# 0.1.5
###Changed
- Added description to elf creature type graft when choosing elf race

## 0.1.4
###Added
- Hobgoblin race
- Vermin type monsters

###Changed
- No longer generates additional "junk" items for monsters, only NPCs
- Max CR is now `5`

###Fixed
- Bug which prevented the correct amount of good/master skills being assigned

## 0.1.3
###Added
- Populator panel
- Half-elf, Half-orc, gnoll race
- Basic animal monster generation (CR `1/3` to `3`)

###Changed
- Unique names for Lashunta
- Token name set to match actor
- Brute adjustment special ability now affects attack damage

###Fixed
- Fixed bug with automatic token icons
- Typo in half-orc race
- Adjustment abilities are now being randomized
- Fixed bug with special ability count

## Pre-release
###Added
- Dynamic token image setting
- Drow race
- Subtype grafts
- Master/good skills added from creature subtype grafts
- Innate spells from creature subtype grafts
- More junk items