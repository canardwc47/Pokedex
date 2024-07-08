let currentPokemonId = null; // initialise la variable pour suivre l'id du pokemon actuellement chargé //

const pokemonTranslations = {
  "1": "Bulbizarre",
  "2": "Herbizarre",
  "3": "Florizarre",
  "4": "Salamèche",
  "5": "Reptincel",
  "6": "Dracaufeu",
  "7": "Carapuce",
  "8": "Carabaffe",
  "9": "Tortank",
  "10": "Chenipan",
  "11": "Chrysacier",
  "12": "Papilusion",
  "13": "Aspicot",
  "14": "Coconfort",
  "15": "Dardargnan",
  "16": "Roucool",
  "17": "Roucoups",
  "18": "Roucarnage",
  "19": "Rattata",
  "20": "Rattatac",
  "21": "Piafabec",
  "22": "Rapasdepic",
  "23": "Abo",
  "24": "Arbok",
  "25": "Pikachu",
  "26": "Raichu",
  "27": "Sabelette",
  "28": "Sablaireau",
  "29": "Nidoran♀",
  "30": "Nidorina",
  "31": "Nidoqueen",
  "32": "Nidoran♂",
  "33": "Nidorino",
  "34": "Nidoking",
  "35": "Mélofée",
  "36": "Mélodelfe",
  "37": "Goupix",
  "38": "Feunard",
  "39": "Rondoudou",
  "40": "Grodoudou",
  "41": "Nosferapti",
  "42": "Nosferalto",
  "43": "Mystherbe",
  "44": "Ortide",
  "45": "Rafflesia",
  "46": "Paras",
  "47": "Parasect",
  "48": "Mimitoss",
  "49": "Aéromite",
  "50": "Taupiqueur",
  "51": "Triopikeur",
  "52": "Miaouss",
  "53": "Persian",
  "54": "Psykokwak",
  "55": "Akwakwak",
  "56": "Férosinge",
  "57": "Colossinge",
  "58": "Caninos",
  "59": "Arcanin",
  "60": "Ptitard",
  "61": "Têtarte",
  "62": "Tartard",
  "63": "Abra",
  "64": "Kadabra",
  "65": "Alakazam",
  "66": "Machoc",
  "67": "Machopeur",
  "68": "Mackogneur",
  "69": "Chétiflor",
  "70": "Boustiflor",
  "71": "Empiflor",
  "72": "Tentacool",
  "73": "Tentacruel",
  "74": "Racaillou",
  "75": "Gravalanch",
  "76": "Grolem",
  "77": "Ponyta",
  "78": "Galopa",
  "79": "Ramoloss",
  "80": "Flagadoss",
  "81": "Magnéti",
  "82": "Magnéton",
  "83": "Canarticho",
  "84": "Doduo",
  "85": "Dodrio",
  "86": "Otaria",
  "87": "Lamantine",
  "88": "Tadmorv",
  "89": "Grotadmorv",
  "90": "Kokiyas",
  "91": "Crustabri",
  "92": "Fantominus",
  "93": "Spectrum",
  "94": "Ectoplasma",
  "95": "Onix",
  "96": "Soporifik",
  "97": "Hypnomade",
  "98": "Krabby",
  "99": "Krabboss",
  "100": "Voltorbe",
  "101": "Électrode",
  "102": "Noeunoeuf",
  "103": "Noadkoko",
  "104": "Osselait",
  "105": "Ossatueur",
  "106": "Kicklee",
  "107": "Tygnon",
  "108": "Excelangue",
  "109": "Smogo",
  "110": "Smogogo",
  "111": "Rhinocorne",
  "112": "Rhinoféros",
  "113": "Leveinard",
  "114": "Saquedeneu",
  "115": "Kangourex",
  "116": "Hypotrempe",
  "117": "Hypocéan",
  "118": "Poissirène",
  "119": "Poissoroy",
  "120": "Stari",
  "121": "Staross",
  "122": "M. Mime",
  "123": "Insécateur",
  "124": "Lippoutou",
  "125": "Élektek",
  "126": "Magmar",
  "127": "Scarabrute",
  "128": "Tauros",
  "129": "Magicarpe",
  "130": "Léviator",
  "131": "Lokhlass",
  "132": "Métamorph",
  "133": "Évoli",
  "134": "Aquali",
  "135": "Voltali",
  "136": "Pyroli",
  "137": "Porygon",
  "138": "Amonita",
  "139": "Amonistar",
  "140": "Kabuto",
  "141": "Kabutops",
  "142": "Ptéra",
  "143": "Ronflex",
  "144": "Artikodin",
  "145": "Électhor",
  "146": "Sulfura",
  "147": "Minidraco",
  "148": "Draco",
  "149": "Dracolosse",
  "150": "Mewtwo",
  "151": "Mew"
};


// evenement déclenché losque le dom est chargé //
document.addEventListener("DOMContentLoaded", () => {
  const MAX_POKEMONS = 151;
  const pokemonID = new URLSearchParams(window.location.search).get("id");
  const id = parseInt(pokemonID, 10);

  if (id < 1 || id > MAX_POKEMONS) {
    return (window.location.href = "./index.html");
  }

  currentPokemonId = id; // met a jour l'id du pokemon actuellement chargé //
  loadPokemon(id);
});

async function loadPokemon(id) {
  try {
    // récupère les données du pokemon et de sa specifcation depuis pokeapi //
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);

    const abilitiesWrapper = document.querySelector(
      ".pokemon-detail-wrap .pokemon-detail.move"
    );
    abilitiesWrapper.innerHTML = "";

    if (currentPokemonId === id) {
      displayPokemonDetails(pokemon);
      const flavorText = getEnglishFlavorText(pokemonSpecies);
      document.querySelector(".body3-fonts.pokemon-description").textContent =
        flavorText;

      const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) =>
        document.querySelector(sel)
      );
      leftArrow.removeEventListener("click", navigatePokemon);
      rightArrow.removeEventListener("click", navigatePokemon);

      if (id !== 1) {
        leftArrow.addEventListener("click", () => {
          navigatePokemon(id - 1); // navigue vers le pokemon précédent // 
        });
      }
      if (id !== 151) {
        rightArrow.addEventListener("click", () => {
          navigatePokemon(id + 1); // navigue vers le pokemon suivant //
        });
      }

      // met a jour l'url sans recharger la page //
      window.history.pushState({}, "", `./detail.html?id=${id}`);
    }

    return true;
  } catch (error) {
    console.error("An error occured while fetching Pokemon data:", error);
    return false;
  }
}

async function navigatePokemon(id) {
  currentPokemonId = id;
  await loadPokemon(id);
}


// couleurs associées a chaque type de pokemon //
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  dark: "#EE99AC",
};

// applique les styles css aux éléments donnés //
function setElementStyles(elements, cssProperty, value) {
  elements.forEach((element) => {
    element.style[cssProperty] = value;
  });
}

function rgbaFromHex(hexColor) {
  return [
    parseInt(hexColor.slice(1, 3), 16),
    parseInt(hexColor.slice(3, 5), 16),
    parseInt(hexColor.slice(5, 7), 16),
  ].join(", ");
}

// applique la couleur de fond associée au type principal de pokemon //
function setTypeBackgroundColor(pokemon) {
  const mainType = pokemon.types[0].type.name;
  const color = typeColors[mainType];

  if (!color) {
    console.warn(`Color not defined for type: ${mainType}`);
    return;
  }

  const detailMainElement = document.querySelector(".detail-main");
  setElementStyles([detailMainElement], "backgroundColor", color);
  setElementStyles([detailMainElement], "borderColor", color);

  setElementStyles(
    document.querySelectorAll(".power-wrapper > p"),
    "backgroundColor",
    color
  );

  setElementStyles(
    document.querySelectorAll(".stats-wrap p.stats"),
    "color",
    color
  );

  setElementStyles(
    document.querySelectorAll(".stats-wrap .progress-bar"),
    "color",
    color
  );

  const rgbaColor = rgbaFromHex(color);
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    .stats-wrap .progress-bar::-webkit-progress-bar {
        background-color: rgba(${rgbaColor}, 0.5);
    }
    .stats-wrap .progress-bar::-webkit-progress-value {
        background-color: ${color};
    }
  `;
  document.head.appendChild(styleTag);
}

// met la premiere lettre d'une chaine en majuscule //
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function createAndAppendElement(parent, tag, options = {}) {
  const element = document.createElement(tag);
  Object.keys(options).forEach((key) => {
    element[key] = options[key];
  });
  parent.appendChild(element);
  return element;
}

function displayPokemonDetails(pokemon) {
  const { name, id, types, weight, height, abilities, stats } = pokemon;
  // traduit le nom du pokémon en francais //
  const translatedName = pokemonTranslations[id] || capitalizeFirstLetter(name);

  document.querySelector("title").textContent = translatedName;

  const detailMainElement = document.querySelector(".detail-main");
  detailMainElement.classList.add(name.toLowerCase());

  document.querySelector(".name-wrap .name").textContent =
    translatedName;

  document.querySelector(
    ".pokemon-id-wrap .body2-fonts"
  ).textContent = `#${String(id).padStart(3, "0")}`;

  // selectionne et met a jour l'image du pokemon //
  const imageElement = document.querySelector(".detail-img-wrapper img");
  imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  imageElement.alt = name;

  // affiche les types du pokemon //
  const typeWrapper = document.querySelector(".power-wrapper");
  typeWrapper.innerHTML = "";
  types.forEach(({ type }) => {
    createAndAppendElement(typeWrapper, "p", {
      className: `body3-fonts type ${type.name}`,
      textContent: type.name,
    });
  });

  // affiche le poids et la taille du pokemon //
  document.querySelector(
    ".pokemon-detail-wrap .pokemon-detail p.body3-fonts.weight"
  ).textContent = `${weight / 10}kg`;
  document.querySelector(
    ".pokemon-detail-wrap .pokemon-detail p.body3-fonts.height"
  ).textContent = `${height / 10}m`;

  // affiche les capacités du pokemon //
  const abilitiesWrapper = document.querySelector(
    ".pokemon-detail-wrap .pokemon-detail.move"
);
  abilities.forEach(({ ability }) => {
    createAndAppendElement(abilitiesWrapper, "p", {
      className: "body3-fonts",
      textContent: ability.name,
    });
  });

  // affiche les stastiques du pokemon //
  const statsWrapper = document.querySelector(".stats-wrapper");
  statsWrapper.innerHTML = "";

  const statNameMapping = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
  };

  stats.forEach(({ stat, base_stat }) => {
    const statDiv = document.createElement("div");
    statDiv.className = "stats-wrap";
    statsWrapper.appendChild(statDiv);

    createAndAppendElement(statDiv, "p", {
      className: "body3-fonts stats",
      textContent: statNameMapping[stat.name],
    });

    createAndAppendElement(statDiv, "p", {
      className: "body3-fonts",
      textContent: String(base_stat).padStart(3, "0"),
    });

    createAndAppendElement(statDiv, "progress", {
      className: "progress-bar",
      value: base_stat,
      max: 100,
    });
  });

  setTypeBackgroundColor(pokemon);
}
// récupère le texte de description en anglais du pokemon //
function getEnglishFlavorText(pokemonSpecies) {
  for (let entry of pokemonSpecies.flavor_text_entries) {
    if (entry.language.name === "fr") { // le charge en francais //
      let flavor = entry.flavor_text.replace(/\f/g, " ");
      return flavor;
    }
  }
  return "";
}

//Pour faire apparaitre des bulles d'eau sur en background//
document.addEventListener('DOMContentLoaded', () => {
  const pokemonTypeElements = document.querySelectorAll('.type');
  let isWaterType = false;

  pokemonTypeElements.forEach(typeElement => {
    if (typeElement.textContent.trim().toLowerCase() === 'water') {
      isWaterType = true;
    }
  });

  if (isWaterType) {
    document.querySelector('.detail-main').classList.add('water-type');
  }
});


