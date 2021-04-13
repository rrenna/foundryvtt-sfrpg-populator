export const Names = {};
// TODO: Currently best suited in JavaScript, too much boilerplate involved in expressing in TypeScript. Should re-evaluate in future when more experienced.
// NOTE: Default is also used for human names
// Default
Names.default = { male: {}, female: {}, other: {} };
Names.default.format = "{0} {1}";
Names.default.other.first = ["Sam", "Riley"];
Names.default.male.first = [ "Adrian", "Alex", "Alfred", "Bob", "George", "John", "Jordan", "Jovan", "Tom", "Reginald", "Ryan" ].concat(Names.default.other.first);
Names.default.female.first = [ "Alice", "Cara", "Jenn", "Tess", "Rachel", "Rebecca", "Trish" ].concat(Names.default.other.first);
Names.default.last = [ "Black", "Johnson", "Mason", "Thompson", "Slat", "Stone", "Richards", "Ronson", "Watson", "White" ];
// Exotic
Names.exotic = { male: {}, female: {}, other: {} };
Names.exotic.format = "{0}{1}";
Names.exotic.other.first = ["Nukteins", "Egnils", "Folta", "Qharruits", "Amiell", "Oltah", "Lessaith", "Throlphirs", "Sea", "Qhihrer", "Vu"];
Names.exotic.male.first = Names.exotic.other.first;
Names.exotic.female.first = Names.exotic.other.first;
Names.exotic.denominator = ["'a", "a", "bo", "cha", "oyo", "", "", "", "", ""]; // Denominators are appended onto name without a space
Names.exotic.last = [""]; // No last names
// Android
Names.android = { male: {}};
Names.android.format = "{0}{1}";
Names.android.male.first = [ "Avoph", "Wisdom", "Burst", "Simple" ];
Names.android.denominator = ["-1", "-2", "-3", "-7", "", "", "", ""]; // Denominators are appended onto name without a space
Names.android.last = [""]; // No last names
// Dwarf
Names.dwarf = { male: {}, female: {} };
Names.dwarf.male.first = [ "Ginik", "Grolgulir", "Turgrol", "Yarbud" ];
Names.dwarf.female.first = [ "Hozzida", "Gotribera", "Sarsolda" ];
Names.dwarf.last = [ "Bristleshield", "Bronzemaker", "Coalstone", "Largebrow", "Orebreaker", "Wraithgranite" ];
// Halfling
Names.halfling = { male: {}, female: {} };
Names.halfling.male.first = ["Balderic", "Drogo", "Filbo", "Samwise", "Sorbo"].concat(Names.default.male.first); //Default first names are appropriate for halflings as well
Names.halfling.female.first = ["Berenga", "Hilda", "Lalia", "Sherry", "Pamphila"].concat(Names.default.female.first); //Default first names are appropriate for halflings as well
Names.halfling.last = [ "Biggums", "Boulderhill", "Gardner", "Goodchild", "Langham", "Oakbottom", "Smallburrow", "Thornburrow", "Underhill", "Undertree"];
// Gnome
Names.gnome = { male: {}, female: {}, other: {} };
Names.gnome.other.first = ["Glakpap", "Gnefipnoc", "Hednibyl", "Mansbikuc", "Mawugbert", "Zulmen"];
Names.gnome.male.first = ["Blakweda", "Clilbefut", "Shaimbess", "Shelben", "Wanudlym"].concat(Names.gnome.other.first);
Names.gnome.female.first = ["Boovikort", "Gobkirt", "Slunsmat", "Wupnic", "Zemzap"].concat(Names.gnome.other.first);
Names.gnome.last = [ ""]; // No last names
// Kasatha
Names.kasatha = { male: {} };
Names.kasatha.male.first = [ "Cas", "De Holetif", "Gotaldus", "Jatsol", "Jiltof", "Maecran", "Nilaltrom", "Tursal", "Zuna" ]; // All Kasatha names are non-gendered
Names.kasatha.last = [ "" ];
// Lashunta (uses default names)
// Naur (uses exotic names)
Names.nuar = Names.exotic;
// Shirren (uses exotic names)
Names.shirren = Names.exotic;
// Skittermander (uses exotic names)
Names.skittermander = Names.exotic;
// Vesk (uses exotic names)
Names.vesk = Names.exotic;
// Ysoki (uses default names)