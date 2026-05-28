export type Rarity = "common" | "uncommon" | "rare" | "legendary" | "unknown";

export interface Species {
  pokedex_number: number;
  name: string;
  scientific_name: string;
  description: string;
  habitat: string;
  rarity: Rarity;
  fun_facts: string[];
  image_url: string;
  aliases: string[];
}

export const LA_SPECIES: Species[] = [
  // ── COMMON (1–15) ──────────────────────────────────────────────────
  {
    pokedex_number: 1,
    name: "Rock Pigeon",
    scientific_name: "Columba livia",
    description:
      "The quintessential city bird, thriving in urban environments worldwide. Descended from wild cliff-dwelling pigeons domesticated thousands of years ago.",
    habitat: "Urban areas, parks, bridges, building ledges",
    rarity: "common",
    fun_facts: [
      "Can navigate home from over 1,000 miles away",
      "Both parents produce 'crop milk' to feed chicks",
      "Were used as military messengers in both World Wars",
      "Can fly at speeds exceeding 90 mph",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Rock_Pigeon_Columba_livia.jpg/320px-Rock_Pigeon_Columba_livia.jpg",
    aliases: ["Rock Dove", "Common Pigeon", "City Pigeon", "Feral Pigeon"],
  },
  {
    pokedex_number: 2,
    name: "Mourning Dove",
    scientific_name: "Zenaida macroura",
    description:
      "A graceful, slender dove with a long pointed tail and soft cooing call. One of the most abundant birds in North America.",
    habitat: "Suburbs, parks, open fields, desert edges",
    rarity: "common",
    fun_facts: [
      "Named for its mournful cooing sound",
      "Drinks by submerging its bill and sucking water continuously",
      "Can raise up to 6 broods per year",
      "Wings whistle loudly when they take flight",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mourning_Dove_on_ground.jpg/320px-Mourning_Dove_on_ground.jpg",
    aliases: ["Turtle Dove", "Rain Dove"],
  },
  {
    pokedex_number: 3,
    name: "American Crow",
    scientific_name: "Corvus brachyrhynchos",
    description:
      "Highly intelligent all-black bird known for problem-solving abilities. Forms large communal roosts and uses complex vocalizations.",
    habitat: "Urban areas, parks, agricultural fields, woodlands",
    rarity: "common",
    fun_facts: [
      "Can recognize and remember individual human faces",
      "Has been observed using tools to obtain food",
      "Roosts in flocks of millions during winter",
      "Will mob and harass owls and hawks to drive them away",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Corvus-brachyrhynchos-001.jpg/320px-Corvus-brachyrhynchos-001.jpg",
    aliases: ["Crow", "Common Crow"],
  },
  {
    pokedex_number: 4,
    name: "House Sparrow",
    scientific_name: "Passer domesticus",
    description:
      "A small, chunky sparrow introduced from Europe that has become one of the world's most widespread birds. Males have a distinctive black bib.",
    habitat: "Urban centers, parks, fast food restaurants, farm buildings",
    rarity: "common",
    fun_facts: [
      "Introduced to Brooklyn, NY in 1851 and spread across the continent",
      "Takes dust baths to keep parasites in check",
      "Can have up to 4 broods per year",
      "Lives almost entirely in human-altered environments",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Passer_domesticus_male_%2815%29.jpg/320px-Passer_domesticus_male_%2815%29.jpg",
    aliases: ["English Sparrow", "Sparrow"],
  },
  {
    pokedex_number: 5,
    name: "House Finch",
    scientific_name: "Haemorhous mexicanus",
    description:
      "A cheerful red-headed finch native to western North America. Males sport raspberry-red on their head and breast; females are streaky brown.",
    habitat: "Suburbs, parks, urban areas, chaparral",
    rarity: "common",
    fun_facts: [
      "Originally only lived in western North America; eastern population started from escaped cage birds in 1940",
      "Males with brighter red coloring attract more mates",
      "Eats almost exclusively plant-based foods",
      "Their song is a long, jumbled warble",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Haemorhous_mexicanus_-_male.jpg/320px-Haemorhous_mexicanus_-_male.jpg",
    aliases: ["Linnet", "Mexican House Finch"],
  },
  {
    pokedex_number: 6,
    name: "European Starling",
    scientific_name: "Sturnus vulgaris",
    description:
      "A stocky, iridescent bird introduced from Europe. Famous for massive murmurations — synchronized aerial displays of thousands of birds.",
    habitat: "Urban areas, parks, agricultural fields, golf courses",
    rarity: "common",
    fun_facts: [
      "All North American starlings descended from 100 birds released in Central Park in 1890",
      "Can mimic the calls of other birds and even human speech",
      "Murmurations can contain over a million birds",
      "Spots fade in winter to reveal speckled plumage",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Starling_on_fence.jpg/320px-Starling_on_fence.jpg",
    aliases: ["Common Starling", "Starling"],
  },
  {
    pokedex_number: 7,
    name: "Mallard",
    scientific_name: "Anas platyrhynchos",
    description:
      "The most familiar duck in the world. Males have an iridescent green head; females are mottled brown. Ancestor of most domestic duck breeds.",
    habitat: "Parks, ponds, lakes, rivers, golf courses",
    rarity: "common",
    fun_facts: [
      "The classic 'quack' is made only by females",
      "Can sleep with one eye open to watch for predators",
      "Males lose their green head plumage after breeding season",
      "Can hybridize with many other duck species",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Anas_platyrhynchos_male_female_quadrat.jpg/320px-Anas_platyrhynchos_male_female_quadrat.jpg",
    aliases: ["Mallard Duck", "Wild Duck"],
  },
  {
    pokedex_number: 8,
    name: "American Coot",
    scientific_name: "Fulica americana",
    description:
      "A slate-gray waterbird with a distinctive white bill. Looks like a duck but is actually more closely related to cranes.",
    habitat: "Lakes, ponds, reservoirs, wetlands",
    rarity: "common",
    fun_facts: [
      "Has lobed toes instead of webbed feet for swimming",
      "Aggressive territorial birds that will fight other coots",
      "Can walk on floating vegetation",
      "Chicks have bright red and orange head feathers",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/AmericanCoot23.jpg/320px-AmericanCoot23.jpg",
    aliases: ["Coot", "Mud Hen"],
  },
  {
    pokedex_number: 9,
    name: "Double-crested Cormorant",
    scientific_name: "Nannopterum auritum",
    description:
      "A large, dark waterbird that dives for fish and spreads wings to dry. Named for tufts of feathers on its head visible only during breeding season.",
    habitat: "Coasts, harbors, bays, lakes, rivers",
    rarity: "common",
    fun_facts: [
      "Lacks waterproofing oil in feathers, so must dry wings after diving",
      "Can dive to 25 feet deep to catch fish",
      "Colonies can number in the thousands",
      "Has turquoise eyes",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Double-crested_Cormorant_Phalacrocorax_auritus.jpg/320px-Double-crested_Cormorant_Phalacrocorax_auritus.jpg",
    aliases: ["Cormorant", "Shag"],
  },
  {
    pokedex_number: 10,
    name: "Canada Goose",
    scientific_name: "Branta canadensis",
    description:
      "A large goose with a black head and neck, white cheek patch. Extremely adaptable and common in urban parks near water.",
    habitat: "Parks, golf courses, lakes, reservoirs, athletic fields",
    rarity: "common",
    fun_facts: [
      "Mates for life; if one dies, the other may mourn for years",
      "Goslings can walk, swim, and feed within hours of hatching",
      "Honking in V-formation reduces wind resistance for those behind",
      "Urban populations have largely stopped migrating",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Canada_goose_on_Seedskadee_NWR_%2827826185489%29.jpg/320px-Canada_goose_on_Seedskadee_NWR_%2827826185489%29.jpg",
    aliases: ["Canadian Goose", "Honker"],
  },
  {
    pokedex_number: 11,
    name: "American Robin",
    scientific_name: "Turdus migratorius",
    description:
      "Iconic red-breasted thrush that's a sure sign of spring. Hunts earthworms by tilting its head to listen for movement underground.",
    habitat: "Lawns, parks, woodlands, suburbs",
    rarity: "common",
    fun_facts: [
      "Can hear earthworms moving underground",
      "The red breast is used in territorial displays",
      "A group of robins is called a 'worm'",
      "Males sing before dawn in spring to establish territory",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Turdus-migratorius-002.jpg/320px-Turdus-migratorius-002.jpg",
    aliases: ["Robin", "Red-breasted Robin"],
  },
  {
    pokedex_number: 12,
    name: "Brewer's Blackbird",
    scientific_name: "Euphagus cyanocephalus",
    description:
      "A sleek blackbird common in urban LA. Males are glossy black with piercing yellow eyes; females are dull grayish-brown.",
    habitat: "Parking lots, lawns, parks, open areas",
    rarity: "common",
    fun_facts: [
      "Named after ornithologist Thomas Mayo Brewer",
      "Often forages in large mixed flocks with other blackbirds",
      "Males flash iridescent purple-green sheen in sunlight",
      "Frequently seen walking boldly through outdoor restaurant seating",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Euphagus_cyanocephalus_-Parkside%2C_San_Francisco%2C_California%2C_USA-8.jpg/320px-Euphagus_cyanocephalus_-Parkside%2C_San_Francisco%2C_California%2C_USA-8.jpg",
    aliases: ["Blackbird"],
  },
  {
    pokedex_number: 13,
    name: "Western Gull",
    scientific_name: "Larus occidentalis",
    description:
      "The large, powerful gull of the Pacific Coast. White body with dark gray back. The quintessential beach scavenger of Southern California.",
    habitat: "Beaches, harbors, piers, coastal parks, parking lots",
    rarity: "common",
    fun_facts: [
      "Drops clams and mussels onto rocks to break them open",
      "Nests on Anacapa Island in large colonies",
      "Can live over 25 years",
      "Will steal food directly from people's hands",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Western_Gull_2.jpg/320px-Western_Gull_2.jpg",
    aliases: ["Seagull", "Sea Gull", "Gull"],
  },
  {
    pokedex_number: 14,
    name: "Eurasian Collared-Dove",
    scientific_name: "Streptopelia decaocto",
    description:
      "A pale, sandy-colored dove with a black collar on its nape. Spread across North America from Florida after escaping captivity in the Bahamas in 1974.",
    habitat: "Suburbs, parks, agricultural areas",
    rarity: "common",
    fun_facts: [
      "Colonized the entire continental US in under 30 years",
      "Named for the black half-collar on the back of its neck",
      "Has a distinctive three-note cooing call: 'coo-COO-coo'",
      "One of the fastest range expansions ever recorded in a bird",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Streptopelia_decaocto_-Lancing%2C_Hampshire%2C_England-8.jpg/320px-Streptopelia_decaocto_-Lancing%2C_Hampshire%2C_England-8.jpg",
    aliases: ["Collared Dove", "Ringed Turtle-Dove"],
  },
  {
    pokedex_number: 15,
    name: "Ring-billed Gull",
    scientific_name: "Larus delawarensis",
    description:
      "Medium-sized gull with a distinctive black ring around its yellow bill. Common inland as well as at the coast.",
    habitat: "Parking lots, beaches, landfills, lakes",
    rarity: "common",
    fun_facts: [
      "Named for the distinctive black ring on its bill",
      "Highly opportunistic — will eat almost anything",
      "Often found far from water in parking lots and fast food areas",
      "Population rebounded dramatically after nearly being wiped out in the 1800s",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ring-billed_Gull_RWD2.jpg/320px-Ring-billed_Gull_RWD2.jpg",
    aliases: ["Ring-billed Seagull", "Parking Lot Gull"],
  },

  // ── UNCOMMON (16–35) ───────────────────────────────────────────────
  {
    pokedex_number: 16,
    name: "Anna's Hummingbird",
    scientific_name: "Calypte anna",
    description:
      "A year-round LA resident and the most common hummingbird in the western US. Males have an iridescent magenta-rose crown and throat.",
    habitat: "Gardens, parks, chaparral, coastal scrub",
    rarity: "uncommon",
    fun_facts: [
      "Can dive at over 385 body lengths per second — faster than a fighter jet",
      "Heart beats up to 1,260 times per minute during flight",
      "Only hummingbird that sings — males perform elaborate dive displays",
      "Does not migrate — stays in Southern California year-round",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Annas_Hummingbird.jpg/320px-Annas_Hummingbird.jpg",
    aliases: ["Hummingbird", "Anna Hummingbird"],
  },
  {
    pokedex_number: 17,
    name: "Allen's Hummingbird",
    scientific_name: "Selasphorus sasin",
    description:
      "A tiny, fiery hummingbird with rufous-orange flanks. Males perform dramatic pendulum courtship flights. Many LA-area birds don't migrate.",
    habitat: "Coastal scrub, gardens, parks, willow thickets",
    rarity: "uncommon",
    fun_facts: [
      "One of the earliest spring migrants, arriving in January",
      "Male's tail feathers make a buzzing sound during display",
      "Extremely territorial, often chasing much larger birds",
      "A sedentary subspecies now lives year-round in LA",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Allen%27s_Hummingbird.jpg/320px-Allen%27s_Hummingbird.jpg",
    aliases: ["Rufous Hummingbird"],
  },
  {
    pokedex_number: 18,
    name: "California Scrub-Jay",
    scientific_name: "Aphelocoma californica",
    description:
      "Brilliant blue-and-gray jay found only on the West Coast. Bold and curious, often approaching humans in parks and backyards.",
    habitat: "Chaparral, oak woodlands, parks, suburbs",
    rarity: "uncommon",
    fun_facts: [
      "Caches thousands of acorns per year and remembers most locations",
      "Has been observed holding 'funerals' when a flock member dies",
      "Can detect if another bird is watching while caching food",
      "Formerly called Western Scrub-Jay before being split into two species",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/California_Scrub-Jay.jpg/320px-California_Scrub-Jay.jpg",
    aliases: ["Western Scrub-Jay", "Scrub Jay", "Blue Jay"],
  },
  {
    pokedex_number: 19,
    name: "Black Phoebe",
    scientific_name: "Sayornis nigricans",
    description:
      "A sharp-looking flycatcher with a crisp black-and-white pattern. Often perches near water, pumping its tail repeatedly.",
    habitat: "Near streams, ponds, parks, urban areas with water features",
    rarity: "uncommon",
    fun_facts: [
      "Builds mud nests under bridges, eaves, and cliff overhangs",
      "Year-round resident of Southern California",
      "Tail-pumping is a species-specific behavior, reason still debated",
      "Catches insects by sallying out from a perch and returning",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Black_Phoebe_%28Sayornis_nigricans%29.jpg/320px-Black_Phoebe_%28Sayornis_nigricans%29.jpg",
    aliases: ["Phoebe"],
  },
  {
    pokedex_number: 20,
    name: "Yellow-rumped Warbler",
    scientific_name: "Setophaga coronata",
    description:
      "The most abundant warbler in North America. Flashes a distinctive yellow rump patch in flight. Common LA winter visitor.",
    habitat: "Parks, gardens, open woodlands, coastal scrub",
    rarity: "uncommon",
    fun_facts: [
      "Nicknamed 'butter butt' for its bright yellow rump",
      "One of the few warblers that can digest waxy berries",
      "Forms large foraging flocks in winter",
      "Two subspecies: 'Myrtle' (white throat) and 'Audubon's' (yellow throat) — both in LA",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Setophaga_coronata_coronata.jpg/320px-Setophaga_coronata_coronata.jpg",
    aliases: ["Myrtle Warbler", "Audubon's Warbler", "Butter Butt"],
  },
  {
    pokedex_number: 21,
    name: "White-crowned Sparrow",
    scientific_name: "Zonotrichia leucophrys",
    description:
      "A large, handsome sparrow with bold black-and-white striped crown. Common winter visitor to LA parks and gardens.",
    habitat: "Parks, gardens, chaparral edges, coastal scrub",
    rarity: "uncommon",
    fun_facts: [
      "Young birds learn the local dialect of their birth site",
      "Different populations have distinct, recognizable songs",
      "Can stay awake for up to two weeks during migration",
      "One of the most studied birds in the world for song learning research",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/White-crowned_sparrow_in_May.jpg/320px-White-crowned_sparrow_in_May.jpg",
    aliases: ["White Crowned Sparrow"],
  },
  {
    pokedex_number: 22,
    name: "Song Sparrow",
    scientific_name: "Melospiza melodia",
    description:
      "A streaky brown sparrow with a bold central breast spot. One of North America's most variable species with over 50 subspecies.",
    habitat: "Wetlands, riparian thickets, parks, gardens",
    rarity: "uncommon",
    fun_facts: [
      "Each male has a repertoire of 6–24 different song types",
      "Pumps its tail when flying in a distinctive undulating pattern",
      "Over 50 recognized subspecies across North America",
      "One of the first birds scientifically studied for song learning",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Song_Sparrow.jpg/320px-Song_Sparrow.jpg",
    aliases: [],
  },
  {
    pokedex_number: 23,
    name: "Dark-eyed Junco",
    scientific_name: "Junco hyemalis",
    description:
      "A slate-colored sparrow with white outer tail feathers that flash in flight. Breeds in the San Gabriel Mountains and winters across LA.",
    habitat: "Parks, gardens, mountain forests, chaparral",
    rarity: "uncommon",
    fun_facts: [
      "Often called the 'snowbird' as it arrives with colder weather",
      "White tail feathers may confuse predators during escape",
      "Males arrive at wintering grounds before females",
      "One of the most common birds in North America",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Dark-eyed_Junco_at_Lafarge_Lake_a.jpg/320px-Dark-eyed_Junco_at_Lafarge_Lake_a.jpg",
    aliases: ["Junco", "Snowbird", "Oregon Junco"],
  },
  {
    pokedex_number: 24,
    name: "Bushtit",
    scientific_name: "Psaltriparus minimus",
    description:
      "Tiny, round, fluffy birds that travel in busy flocks of 10–40. Constantly moving through shrubs, giving soft tsip calls.",
    habitat: "Chaparral, parks, gardens, scrubby hillsides",
    rarity: "uncommon",
    fun_facts: [
      "Builds an elaborate hanging sock-like nest up to 12 inches long",
      "Flocks stay together all year, roosting side by side for warmth",
      "One of North America's smallest birds",
      "Males have dark eyes; females of interior populations have pale yellow eyes",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Bushtit_feeding.jpg/320px-Bushtit_feeding.jpg",
    aliases: ["Bush-tit", "Common Bushtit"],
  },
  {
    pokedex_number: 25,
    name: "California Towhee",
    scientific_name: "Melozone crissalis",
    description:
      "A large, plain, rusty-brown sparrow that hops on the ground in chaparral and backyards. Endemic to California and Baja California.",
    habitat: "Chaparral, parks, gardens, brushy hillsides",
    rarity: "uncommon",
    fun_facts: [
      "Found only in California and Baja — a true endemic species",
      "Pairs stay together and defend territory year-round",
      "Scratches the ground with both feet to uncover seeds",
      "Makes a sharp metallic 'chink' call",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/California_Towhee.jpg/320px-California_Towhee.jpg",
    aliases: ["Brown Towhee"],
  },
  {
    pokedex_number: 26,
    name: "Lesser Goldfinch",
    scientific_name: "Spinus psaltria",
    description:
      "A tiny, brilliant yellow finch common at feeders. Males have a black cap; females are yellowish-green. Acrobatic feeders on thistle seeds.",
    habitat: "Gardens, parks, weedy fields, oak woodlands",
    rarity: "uncommon",
    fun_facts: [
      "North America's smallest goldfinch",
      "Males mimic the songs of other bird species",
      "Breeds year-round in Southern California",
      "Highly attracted to thistle (nyjer) feeders",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Lesser_goldfinch_male.jpg/320px-Lesser_goldfinch_male.jpg",
    aliases: ["Arkansas Goldfinch", "Green-backed Goldfinch"],
  },
  {
    pokedex_number: 27,
    name: "Great Blue Heron",
    scientific_name: "Ardea herodias",
    description:
      "North America's largest heron, standing 4.5 feet tall. A patient, statuesque hunter standing motionless at water's edge.",
    habitat: "Shores of lakes, rivers, wetlands, beaches",
    rarity: "uncommon",
    fun_facts: [
      "Can stand motionless for hours waiting for prey",
      "Swallows fish whole — head first",
      "Despite its size, weighs only 5–6 pounds (mostly feathers)",
      "Nests in large colonies called heronries, sometimes with hundreds of nests",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/GreatBlueHeron_edit2.jpg/320px-GreatBlueHeron_edit2.jpg",
    aliases: ["Blue Heron", "Great Blue"],
  },
  {
    pokedex_number: 28,
    name: "Snowy Egret",
    scientific_name: "Egretta thula",
    description:
      "An elegant all-white egret with black legs, yellow feet, and a black bill. Actively pursues prey with shuffling, foot-stirring technique.",
    habitat: "Wetlands, estuaries, lake shores, coastal areas",
    rarity: "uncommon",
    fun_facts: [
      "Yellow feet act as lures, wiggling in water to attract fish",
      "Was nearly hunted to extinction for its feathers in the 1800s",
      "Grows spectacular lacy breeding plumes each spring",
      "More active and energetic hunter than other egrets",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Snowy_Egret_and_Crab_4.jpg/320px-Snowy_Egret_and_Crab_4.jpg",
    aliases: ["White Egret"],
  },
  {
    pokedex_number: 29,
    name: "Great Egret",
    scientific_name: "Ardea alba",
    description:
      "A tall, all-white egret with a yellow bill and black legs. The symbol of the National Audubon Society, which saved it from hunters.",
    habitat: "Wetlands, lakes, rivers, coastal estuaries",
    rarity: "uncommon",
    fun_facts: [
      "Is the symbol of the Audubon Society",
      "Can be confused with Snowy Egret, but is much larger with a yellow bill",
      "Stalks prey with slow, deliberate steps",
      "Grows long ornamental 'aigrette' plumes during breeding season",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Ardea_alba_-_Pacific_Grove%2C_CA.jpg/320px-Ardea_alba_-_Pacific_Grove%2C_CA.jpg",
    aliases: ["Common Egret", "Large Egret", "Great White Egret"],
  },
  {
    pokedex_number: 30,
    name: "Black-crowned Night-Heron",
    scientific_name: "Nycticorax nycticorax",
    description:
      "A stocky, hunched heron with a black cap and back, gray wings, and red eyes. Mostly nocturnal but often seen roosting during the day.",
    habitat: "Wetlands, parks, coastal areas, rivers",
    rarity: "uncommon",
    fun_facts: [
      "Hunts mainly at night when competition from other herons is low",
      "Makes a loud 'kwok!' call in flight at night",
      "Pairs may stay together for multiple breeding seasons",
      "Young birds are streaky brown and look completely different from adults",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/BCNH_at_Laumeier.jpg/320px-BCNH_at_Laumeier.jpg",
    aliases: ["Night Heron", "Black-crowned Night Heron"],
  },
  {
    pokedex_number: 31,
    name: "Killdeer",
    scientific_name: "Charadrius vociferus",
    description:
      "A loud, lanky plover famous for its broken-wing distraction display. Named for its piercing 'kill-deer!' call.",
    habitat: "Open ground, parking lots, lawns, mudflats, airports",
    rarity: "uncommon",
    fun_facts: [
      "Feigns a broken wing to lure predators away from its nest",
      "Nests directly on the ground with no nest material",
      "Can be found far from water in gravel parking lots",
      "Scientific name 'vociferus' means 'loud voice'",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Killdeer%2C_Platte_River%2C_Nebraska.jpg/320px-Killdeer%2C_Platte_River%2C_Nebraska.jpg",
    aliases: ["Kill-deer"],
  },
  {
    pokedex_number: 32,
    name: "Red-tailed Hawk",
    scientific_name: "Buteo jamaicensis",
    description:
      "North America's most common large hawk. Brick-red tail is visible from below. Often seen perched on highway light poles.",
    habitat: "Open areas, roadsides, parks, mountains",
    rarity: "uncommon",
    fun_facts: [
      "The iconic 'raptor scream' in Hollywood movies is usually the Red-tailed Hawk",
      "Pairs mate for life and use the same nest for years",
      "Can spot a mouse from 100 feet in the air",
      "Comes in many color forms from nearly white to almost black",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Clouds_%28Taken_by_E._Kilby%29.jpg/320px-Above_Clouds_%28Taken_by_E._Kilby%29.jpg",
    aliases: ["Red-tail", "Chicken Hawk"],
  },
  {
    pokedex_number: 33,
    name: "Cooper's Hawk",
    scientific_name: "Accipiter cooperii",
    description:
      "A medium-sized hawk built for pursuit in dense cover. The most common backyard bird-hunting hawk in LA. Rounded tail and deep wingbeats.",
    habitat: "Wooded suburbs, parks, mature tree areas",
    rarity: "uncommon",
    fun_facts: [
      "Urban populations are now larger than forest populations",
      "Eats mostly birds, catching them in mid-air or running them down",
      "Males are significantly smaller than females",
      "Accipiter hawks fly with a 'flap-flap-glide' pattern",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Coopers_hawk_in_tree.jpg/320px-Coopers_hawk_in_tree.jpg",
    aliases: ["Coopers Hawk", "Chicken Hawk", "Striker"],
  },
  {
    pokedex_number: 34,
    name: "Turkey Vulture",
    scientific_name: "Cathartes aura",
    description:
      "A large, dark scavenger with a bald red head and silver wing linings. Soars on thermals with wings held in a shallow V-shape.",
    habitat: "Open areas, roadsides, hills, anywhere with thermals",
    rarity: "uncommon",
    fun_facts: [
      "Finds food almost entirely by smell — unusual among birds",
      "Can smell rotting carrion from over a mile away",
      "Projectile vomits as a defense mechanism",
      "Bald head stays cleaner when feeding inside carcasses",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Turkey_Vulture_by_Calibas.jpg/320px-Turkey_Vulture_by_Calibas.jpg",
    aliases: ["Vulture", "Turkey Buzzard", "Buzzard"],
  },
  {
    pokedex_number: 35,
    name: "American Kestrel",
    scientific_name: "Falco sparverius",
    description:
      "North America's smallest falcon. Rusty orange back with slate-blue wings in males. Hovers over fields searching for prey below.",
    habitat: "Open areas, fields, roadsides, suburbs",
    rarity: "uncommon",
    fun_facts: [
      "Can see ultraviolet light to detect vole urine trails",
      "Hovers in place like a tiny helicopter when hunting",
      "America's only sexually dimorphic (differently colored) falcon",
      "Population declining due to loss of open grassland habitat",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/American_Kestrel_male_in_flight.jpg/320px-American_Kestrel_male_in_flight.jpg",
    aliases: ["Sparrow Hawk", "Kestrel"],
  },

  // ── RARE (36–45) ───────────────────────────────────────────────────
  {
    pokedex_number: 36,
    name: "Peregrine Falcon",
    scientific_name: "Falco peregrinus",
    description:
      "The fastest animal on Earth, reaching over 240 mph in a dive. Nests on downtown LA skyscrapers and bridges.",
    habitat: "Urban skyscrapers, bridges, coastal cliffs",
    rarity: "rare",
    fun_facts: [
      "Fastest animal on Earth — dives at over 240 mph",
      "Nests on buildings and bridges in downtown LA",
      "Nearly went extinct from DDT poisoning; fully recovered since the ban",
      "Name means 'wandering falcon' in Latin",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Peregrine_Falcon_falco_peregrinus.jpg/320px-Peregrine_Falcon_falco_peregrinus.jpg",
    aliases: ["Duck Hawk", "Peregrine"],
  },
  {
    pokedex_number: 37,
    name: "Osprey",
    scientific_name: "Pandion haliaetus",
    description:
      "A specialized fish hawk that plunges feet-first into water to catch fish. White underparts and a distinctive dark eye stripe.",
    habitat: "Coasts, bays, lakes, rivers, reservoirs",
    rarity: "rare",
    fun_facts: [
      "Reversible outer toe allows it to hold fish with two toes in front, two behind",
      "Feet have spiny pads to grip slippery fish",
      "Catches fish on over 70% of dives",
      "Can carry a fish that weighs more than itself",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/2012-07-22_Osprey_-_geograph.org.uk_-_3030580.jpg/320px-2012-07-22_Osprey_-_geograph.org.uk_-_3030580.jpg",
    aliases: ["Fish Hawk", "Fish Eagle"],
  },
  {
    pokedex_number: 38,
    name: "Belted Kingfisher",
    scientific_name: "Megaceryle alcyon",
    description:
      "A stocky, big-headed bird with a shaggy crest. Dives headfirst from perches to catch fish. Rattling call announces its arrival.",
    habitat: "Streams, rivers, lakes, coastal areas",
    rarity: "rare",
    fun_facts: [
      "One of the few North American bird species where females are more colorful than males",
      "Digs a 3–6 foot tunnel in earthen banks to nest",
      "Can hover over water to spot fish below",
      "Has a nictitating membrane to protect eyes while diving",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Belted_Kingfisher_female.jpg/320px-Belted_Kingfisher_female.jpg",
    aliases: ["Kingfisher"],
  },
  {
    pokedex_number: 39,
    name: "Nuttall's Woodpecker",
    scientific_name: "Dryobates nuttallii",
    description:
      "A small California endemic woodpecker with a finely barred black-and-white back. Found almost exclusively in oak woodlands.",
    habitat: "Oak woodlands, riparian areas, suburban trees",
    rarity: "rare",
    fun_facts: [
      "Found only in California and Baja California — a true endemic",
      "Named for naturalist Thomas Nuttall",
      "Drums on resonant surfaces to communicate territory",
      "Makes acorn storage holes in tree bark",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Nuttall%27s_Woodpecker.jpg/320px-Nuttall%27s_Woodpecker.jpg",
    aliases: ["Nuttall Woodpecker"],
  },
  {
    pokedex_number: 40,
    name: "Acorn Woodpecker",
    scientific_name: "Melanerpes formicivorus",
    description:
      "A clown-faced woodpecker that lives in cooperative family groups. Famous for storing thousands of acorns in 'granary trees'.",
    habitat: "Oak woodlands, foothills, parks with mature oaks",
    rarity: "rare",
    fun_facts: [
      "A single granary tree can hold over 50,000 acorns",
      "Lives in family groups of up to 15 birds that all help raise young",
      "Laughing call inspired the Woody Woodpecker cartoon character",
      "Each acorn is fitted to its own hole — they test multiple holes to find the right fit",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Acorn_Woodpecker.jpg/320px-Acorn_Woodpecker.jpg",
    aliases: ["Melanerpes formicivorus"],
  },
  {
    pokedex_number: 41,
    name: "Hooded Oriole",
    scientific_name: "Icterus cucullatus",
    description:
      "A brilliantly colored oriole with orange-yellow plumage and black throat. Closely associated with palm trees, where it often nests.",
    habitat: "Palm trees, gardens, parks, riparian areas",
    rarity: "rare",
    fun_facts: [
      "Frequently nests by stitching its hanging nest to the underside of palm fronds",
      "Males are bright orange; females are olive-yellow",
      "Feeds on nectar and is an important pollinator",
      "Spring arrival is a reliable sign of the season changing",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Icterus_cucullatus.jpg/320px-Icterus_cucullatus.jpg",
    aliases: ["Palm Oriole"],
  },
  {
    pokedex_number: 42,
    name: "Bullock's Oriole",
    scientific_name: "Icterus bullockii",
    description:
      "A flame-orange-and-black oriole that lights up riparian areas in spring. Named for William Bullock, an English naturalist.",
    habitat: "Riparian woodlands, parks, large trees near water",
    rarity: "rare",
    fun_facts: [
      "Builds a remarkable hanging basket nest from plant fibers",
      "Hybridizes with Baltimore Oriole where ranges overlap",
      "Males arrive before females in spring to establish territory",
      "Feeds on insects, nectar, and fruit",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Bullocks_Oriole_%28Icterus_bullockii%29.jpg/320px-Bullocks_Oriole_%28Icterus_bullockii%29.jpg",
    aliases: ["Bullock Oriole", "Northern Oriole"],
  },
  {
    pokedex_number: 43,
    name: "Loggerhead Shrike",
    scientific_name: "Lanius ludovicianus",
    description:
      "A predatory songbird nicknamed the 'butcher bird' for its habit of impaling prey on thorns and barbed wire.",
    habitat: "Open scrublands, fields, desert edges",
    rarity: "rare",
    fun_facts: [
      "Impales prey on thorns or barbed wire as a food cache",
      "Has a hooked bill like a raptor but hawk-sized talons",
      "Population in serious decline across North America",
      "Can kill prey larger than itself including lizards and small mammals",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Loggerhead_shrike_2.jpg/320px-Loggerhead_shrike_2.jpg",
    aliases: ["Butcher Bird", "Shrike"],
  },
  {
    pokedex_number: 44,
    name: "White-tailed Kite",
    scientific_name: "Elanus leucurus",
    description:
      "A ghostly white raptor with black shoulders that hovers over grasslands hunting voles. Has striking red eyes.",
    habitat: "Open grasslands, agricultural fields, coastal plains",
    rarity: "rare",
    fun_facts: [
      "Hovers in place like a giant white hummingbird",
      "Has blood-red eyes in adults",
      "Population can explode when vole numbers are high",
      "Nearly extinct in California in the 1900s; fully recovered",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/White-tailed_Kite_%28Elanus_leucurus%29.jpg/320px-White-tailed_Kite_%28Elanus_leucurus%29.jpg",
    aliases: ["Black-shouldered Kite", "White Kite"],
  },
  {
    pokedex_number: 45,
    name: "Cassin's Kingbird",
    scientific_name: "Tyrannus vociferans",
    description:
      "A large, aggressive flycatcher with a gray head, yellow belly, and dark tail with a whitish tip. Common in LA suburbs.",
    habitat: "Open woodlands, suburbs, parks, open areas with trees",
    rarity: "rare",
    fun_facts: [
      "Named for John Cassin, a 19th century ornithologist",
      "Aggressively chases hawks and crows from its territory",
      "Makes a distinctive 'chi-BEER' call",
      "Perches prominently on tall trees or wires to survey territory",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cassin%27s_Kingbird_at_Malibu_Lagoon.jpg/320px-Cassin%27s_Kingbird_at_Malibu_Lagoon.jpg",
    aliases: ["Kingbird"],
  },

  // ── LEGENDARY (46–50) ──────────────────────────────────────────────
  {
    pokedex_number: 46,
    name: "California Condor",
    scientific_name: "Gymnogyps californianus",
    description:
      "North America's largest bird with a 9.5-foot wingspan. Back from the brink of extinction — captive breeding saved this species.",
    habitat: "Mountains, chaparral, coastal cliffs — rare, soars over wide areas",
    rarity: "legendary",
    fun_facts: [
      "Wingspan up to 9.5 feet — North America's largest bird",
      "Was reduced to just 27 individuals before a captive breeding program began in 1987",
      "Can soar for hours on thermals without a single wingbeat",
      "Can fly 150+ miles in a single day searching for food",
      "Tagged with wing tags to monitor every individual in the wild",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Gymnogyps_californianus_-flying.jpg/320px-Gymnogyps_californianus_-flying.jpg",
    aliases: ["Condor", "California Vulture"],
  },
  {
    pokedex_number: 47,
    name: "Bald Eagle",
    scientific_name: "Haliaeetus leucocephalus",
    description:
      "America's national bird — a powerful eagle with white head and tail. Rare but increasingly seen near LA reservoirs in winter.",
    habitat: "Large lakes, reservoirs, rivers, coastal areas",
    rarity: "legendary",
    fun_facts: [
      "America's national symbol since 1782",
      "Can lift prey weighing up to 4 pounds",
      "Was nearly extinct by the 1960s; DDT ban enabled recovery",
      "Nest (eyrie) can weigh over a ton after years of additions",
      "Can live over 20 years in the wild",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bald_Eagle_Portrait.jpg/320px-Bald_Eagle_Portrait.jpg",
    aliases: ["American Eagle", "Eagle"],
  },
  {
    pokedex_number: 48,
    name: "Painted Bunting",
    scientific_name: "Passerina ciris",
    description:
      "Often called the most beautiful bird in North America. Males are an extraordinary mix of blue, green, and red. Rare winter visitor to LA.",
    habitat: "Dense thickets, gardens (rare visitor in winter)",
    rarity: "legendary",
    fun_facts: [
      "Male is said to look like a 'flying rainbow'",
      "Females are a vibrant lime-green — unusual for a female songbird",
      "Rare but regular winter visitor to Southern California",
      "Highly prized in the illegal caged-bird trade due to its beauty",
      "Young males look like females until their second year",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Passerina_ciris_-_male%281%29.jpg/320px-Passerina_ciris_-_male%281%29.jpg",
    aliases: ["Nonpareil"],
  },
  {
    pokedex_number: 49,
    name: "Roseate Spoonbill",
    scientific_name: "Platalea ajaja",
    description:
      "A shocking-pink wading bird with a distinctive spoon-shaped bill. A very rare vagrant to LA from its normal range in Florida and Texas.",
    habitat: "Coastal wetlands, estuaries (extremely rare vagrant)",
    rarity: "legendary",
    fun_facts: [
      "Gets pink color from carotenoid pigments in its food",
      "Sweeps its spoon-shaped bill side to side to feel for prey",
      "Was hunted nearly to extinction for its feathers in the 1800s",
      "A sighting in LA is an exceptional rarity",
      "Related to ibises, not flamingos (despite the pink color)",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Roseate_Spoonbill_%28Platalea_ajaja%29_RWD1.jpg/320px-Roseate_Spoonbill_%28Platalea_ajaja%29_RWD1.jpg",
    aliases: ["Spoonbill", "Pink Bird"],
  },
  {
    pokedex_number: 50,
    name: "Snowy Owl",
    scientific_name: "Bubo scandiacus",
    description:
      "A massive, white owl of the Arctic tundra. Extremely rare irruptive visitor to Southern California during years when prey is scarce up north.",
    habitat: "Open fields, airports, beaches (extremely rare vagrant)",
    rarity: "legendary",
    fun_facts: [
      "Can eat over 1,600 lemmings per year",
      "Females are larger than males (reversed from most birds)",
      "Hunts by day as well as night — adapted to 24-hour Arctic summer sun",
      "A Southern California sighting is a once-in-a-decade event",
      "Has been known to appear at Los Angeles International Airport during irruption years",
    ],
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Snowy_Owl_%28240866790%29.jpg/320px-Snowy_Owl_%28240866790%29.jpg",
    aliases: ["Great White Owl", "Arctic Owl", "Harfang"],
  },
];
