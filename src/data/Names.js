export const Names = {}
// TODO: Currently best suited in JavaScript, too much boilerplate involved in expressing in TypeScript. Should re-evaluate in future when more experienced.
// NOTE: Default is also used for human names

// Default
Names.default = { format: "{0} {1}", male: {}, female: {}, other: {} }
Names.default.other.first = ["Sam", "Riley"]
Names.default.male.first = [
    "Adrian",
    "Alex",
    "Alfred",
    "Bob",
    "Dale",
    "George",
    "John",
    "Jordan",
    "Jovan",
    "Tom",
    "Reginald",
    "Ryan"
].concat(Names.default.other.first)
Names.default.female.first = [
    "Alice",
    "Cara",
    "Jenn",
    "Tess",
    "Rachel",
    "Rebecca",
    "Tina",
    "Trish"
].concat(Names.default.other.first)
Names.default.last = [
    "Adamson",
    "Black",
    "Johnson",
    "Mason",
    "Thompson",
    "Slat",
    "Stone",
    "Richards",
    "Ronson",
    "Watson",
    "White"
]
// Exotic
Names.exotic = { male: {}, female: {}, other: {} }
Names.exotic.format = "{0}{1}"
Names.exotic.other.first = [
    "Abrog",
    "Amiell",
    "Egnils",
    "Eskas",
    "Folta",
    "Kusi",
    "Lessaith",
    "Nukteins",
    "Oltah",
    "Qharruits",
    "Qhihrer",
    "Sea",
    "Sugik",
    "Tasosh",
    "Throlphirs",
    "Vu"
]
Names.exotic.male.first = Names.exotic.other.first
Names.exotic.female.first = Names.exotic.other.first
Names.exotic.denominator = [
    "'a",
    "-a",
    " a",
    "a",
    "bo",
    "cha",
    "'o",
    "oyo",
    "s",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
] // Denominators are appended onto name without a space
Names.exotic.last = [""] // No last names
// Android
Names.android = { male: {} }
Names.android.format = "{0}{1}"
Names.android.male.first = [
    "Article",
    "Avoph",
    "Burst",
    "Clarity",
    "Fluke",
    "Mercy",
    "Magic",
    "Mode",
    "Requiem",
    "Simple",
    "Wisdom",
    "Union"
]
Names.android.denominator = [
    "-0",
    "-1",
    "-2",
    "-3",
    "-4",
    "-55",
    "-7",
    "-12",
    "-64",
    "-99",
    "",
    "",
    "",
    ""
] // Denominators are appended onto name without a space
Names.android.last = [""] // No last names
// Dwarf
Names.dwarf = { male: {}, female: {} }
Names.dwarf.male.first = [
    "Luldream",
    "Ginik",
    "Grolgulir",
    "Nodrac",
    "Turgrol",
    "Yarbud"
]
Names.dwarf.female.first = [
    "Lokhubela",
    "Hozzida",
    "Gotribera",
    "Sarsolda",
    "Yagraeda",
    "Yarohilda"
]
Names.dwarf.last = [
    "Barrelshoulder",
    "Bristleshield",
    "Bronzemaker",
    "Coalstone",
    "Ironcview",
    "Koboldbow",
    "Largebrow",
    "Orebreaker",
    "Wraithgranite"
]
// Drow
Names.drow = { male: {}, female: {} }
Names.drow.male.first = [
    "Arcavato",
    "Dantrag",
    "Dresmorlin",
    "Dro",
    "Drovic",
    "Duagloth",
    "Durdyn",
    "Firyin",
    "Kaelmourn",
    "Gogloth",
    "Nyloth",
    "Merrryn",
    "Mirrendier",
    "Naltel",
    "Pharnox",
    "Syrendross",
    "Rizraen",
    "Zov"
]
Names.drow.female.first = [
    "Ahlysaaria",
    "Belmarniss",
    "Cylellinth",
    "Drada",
    "Dralia",
    "Drisinil",
    "Ilvaria",
    "Johysis",
    "Jysdra",
    "Jhaelnitra",
    "Loscivia",
    "Ghina",
    "Neerda",
    "Tyvorhan",
    "Ulumbralya",
    "Volundeil"
]
Names.drow.last = [
    "Abaeir",
    "Abbylan",
    "Argith",
    "Baenre",
    "Beltaulur",
    "Blaerabban",
    "Blundyth",
    "Chaulssin",
    "Coborel",
    "Coloara",
    "Cormrael",
    "Daevion'lyr",
    "Dalael",
    "Dhalmass",
    "Dryaalis",
    "Dyrr",
    "Duskryn",
    "Mizzrarran",
    "Mizzrear",
    "T'orgh",
    "Vrinn",
    "Zaphresz",
    "Zauviir",
    "Zolond"
]
Names.drow.denominator = [
    " of House Zeizerer",
    " of House Arabani",
    " of House Cyrocaust",
    " of House Xicton",
    " of House Blasfamus",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
] // Denominators are appended onto name without a space
// Elf
Names.elf = { male: {}, female: {} }
Names.elf.male.first = [
    "Cul",
    "Elvoss",
    "Fin",
    "Keis",
    "Krel",
    "Hom",
    "Icvin",
    "Mas",
    "Mass",
    "Nem",
    "Nothi",
    "Sass",
    "Tasil",
    "Utham",
    "Vir",
    "Zeis",
    "Zemuglogom"
]
Names.elf.female.first = [
    "Arri",
    "Acae",
    "Alle",
    "Ila",
    "Phali",
    "Phaves",
    "Saahhil",
    "Sinnis",
    "Sumanrin",
    "Yarnis",
    "Vuha",
    "Ulma"
]
Names.elf.last = [
    "Car",
    "Das",
    "Essu",
    "Kor",
    "Kos",
    "Jier",
    "Mis",
    "Oreldlun",
    "Sam",
    "Sharliphos",
    "Veeclor",
    "Yurayu",
    "Vam",
    "Vuna"
]
// Half-elf (uses default names)
// Half-orc
Names.halfOrc = { male: {}, female: {} }
Names.halfOrc.male.first = [
    "Bazzosk",
    "Bros",
    "Buk",
    "Hezrulm",
    "Ogdig",
    "Purg"
]
Names.halfOrc.female.first = [
    "Rabla",
    "Habre",
    "Hedli",
    "Ohralru",
    "Rzela",
    "Vabla"
]
Names.halfOrc.last = [
    "Bak",
    "Ber",
    "Dazro",
    "Dom",
    "Ekaxle",
    "Jirvi",
    "Jom",
    "Juxlanrev",
    "Revomutsky",
    "Rozkum",
    "Tondrerem",
    "Som",
    "Soshky",
    "Wiz",
    "Vux"
]
// Halfling
Names.halfling = { male: {}, female: {} }
Names.halfling.male.first = [
    "Balderic",
    "Drogo",
    "Filbo",
    "Samwise",
    "Sorbo"
].concat(Names.default.male.first) //Default first names are appropriate for halflings as well
Names.halfling.female.first = [
    "Berenga",
    "Hilda",
    "Lalia",
    "Sherry",
    "Pamphila"
].concat(Names.default.female.first) //Default first names are appropriate for halflings as well
Names.halfling.last = [
    "Biggums",
    "Boulderhill",
    "Gardner",
    "Goodchild",
    "Langham",
    "Oakbottom",
    "Smallburrow",
    "Thornburrow",
    "Underhill",
    "Undertree"
]
// Hobgoblin
Names.hobgoblin = { male: {} }
Names.hobgoblin.male.first = [
    "Dithik",
    "Drarud",
    "Ettod",
    "Ketreng",
    "Ditrer",
    "Kerdun",
    "Nogtod",
    "Relbim",
    "Radret",
    "Sakhang",
    "Talbin"
]
Names.hobgoblin.last = [""] // No last names
// Gnoll
Names.gnoll = { male: {}, female: {}, other: {} }
Names.gnoll.other.first = ["Ot", "Sru", "Gnet"]
Names.gnoll.male.first = ["Gryzat", "Gnekerk", "Triak", "Uk"].concat(
    Names.gnoll.other.first
)
Names.gnoll.female.first = ["Byz", "Meih", "Nyhn", "Thiar"].concat(
    Names.gnoll.other.first
)
Names.gnoll.last = [""] // No last names
// Gnome
Names.gnome = { male: {}, female: {}, other: {} }
Names.gnome.other.first = [
    "Glakpap",
    "Gnefipnoc",
    "Hednibyl",
    "Mansbikuc",
    "Mawugbert",
    "Zulmen"
]
Names.gnome.male.first = [
    "Blakweda",
    "Clilbefut",
    "Shaimbess",
    "Shelben",
    "Wanudlym"
].concat(Names.gnome.other.first)
Names.gnome.female.first = [
    "Boovikort",
    "Gobkirt",
    "Slunsmat",
    "Wupnic",
    "Zemzap"
].concat(Names.gnome.other.first)
Names.gnome.last = [""] // No last names
// Kasatha
Names.kasatha = { male: {} }
Names.kasatha.male.first = [
    "Cas",
    "De Holetif",
    "Gotaldus",
    "Jatsol",
    "Jiltof",
    "Maecran",
    "Mahas",
    "Nilaltrom",
    "Tursal",
    "Tyemsil",
    "Zuna"
] // All Kasatha names are non-gendered
Names.kasatha.last = [""] // No last names
// Lashunta (uses default names)
Names.lashunta = { male: {} }
Names.lashunta.male.first = [
    "All",
    "Dasel",
    "Doles",
    "Eieny",
    "Iss",
    "Ma",
    "Mekafi",
    "Niamas",
    "Novo",
    "Os",
    "Thirenes",
    "Seva",
    "Taeoss",
    "Te",
    "Thofudol",
    "Tonell",
    "Vila",
    "Zhaloloss",
    "Zhefuh",
    "Zinell",
    "Zhohi"
] // All Lashunta names are non-gendered
Names.lashunta.last = [""] // No last names
// Naur (uses exotic names)
Names.nuar = Names.exotic
// Shirren (uses exotic names)
Names.shirren = Names.exotic
// Skittermander (uses exotic names)
Names.skittermander = Names.exotic
// Vesk (uses exotic names)
Names.vesk = Names.exotic
// Ysoki (uses default names)
// Creature type names
Names.animal = { male: {} }
Names.animal.format = "{0}{1}"
Names.animal.male.first = [
    "Astra",
    "Barnn",
    "Coyo",
    "Cy",
    "Flam",
    "Hippo",
    "Mega",
    "Neo",
    "Ovi",
    "Omni"
] // Used for first half of animal name
Names.animal.last = ["iguano", "raptor", "aroo", "", ""] // Used for second half of animal name
Names.animal.denominator = [
    "don",
    "saur",
    "oda",
    "opus",
    "amimus",
    "mander",
    "",
    "",
    "",
    "",
    "",
    ""
] // Used as an optional suffix in the animal name
//
Names.construct = { male: {} }
Names.construct.format = "{0}{1}"
Names.construct.male.first = ["Buzz", "Zap", "Shoot", "Swoosh"]
Names.construct.last = ["bot", "inator"]
Names.construct.denominator = [
    "",
    " 0",
    " 1",
    " 2",
    " 3",
    " 4",
    " 5",
    " 6",
    " 2000",
    " 3000"
]
//
Names.ooze = { male: {} }
Names.ooze.format = "{0}"
Names.ooze.male.first = [
    "Bloop",
    "Boop",
    "Brupp",
    "Brzz",
    "Floop",
    "Froop",
    "Fzzz",
    "Goop",
    "Gzzz",
    "Sloop",
    "Szzz",
    "Zoop",
    "Zzt"
]
Names.ooze.last = [] // Only uses first names
//
Names.vermin = { male: {} }
Names.vermin.format = "{0}{1}"
Names.vermin.male.first = [
    "Archae",
    "Anthi",
    "Anobi",
    "Bembi",
    "Cleri",
    "Chrysi",
    "Evani",
    "Ichneu",
    "Lepido",
    "Manto",
    "Mega",
    "Trogo",
    "Xylo"
] // Used for first half of animal name
Names.vermin.last = ["bio", "dea", "mero", "somelidae", "tera"] // Used for second half of vermin name
Names.vermin.denominator = ["pede", " spider", " worm", "", "", ""]
