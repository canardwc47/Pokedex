const MAX_POKEMON = 151; //Définit le nb max de pokemons à charger//
const listWrapper = document.querySelector(".list-wrapper"); // Selectionne l'élément HTML qui contiendra la liste des pokémons //
const searchInput = document.querySelector("#search-input"); // Selectionne le champ de recherche par son ID //
const numberFilter = document.querySelector("#number"); // Selectionne les boutons pour filtrer par numéro //
const nameFilter = document.querySelector("#name");// de meme mais par nom //
const notFoundMessage = document.querySelector("#not-found-message"); // selectionne l'element qui affiche un message si aucun pokemon n'est trouvé //

let allPokemons = []; // Initialise le tableau pour stocker les pokemons récupérés //


// Traduction des noms des pokemons en francais //
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


// appel a l'api pokeapi pour récupérer les 151 premiers pokemons // 
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json()) // convertit la réponsé en json //
  .then((data) => {
    allPokemons = data.results; // stocke la liste des pokémons dans allpokemons // 
    displayPokemons(allPokemons); // affiche les pokemons dans l'interface //
  });


  // fonction asyncrhone pour récupérer les données d'un pokemon avant la redirection //
async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

// fonction pour afficher les pokemons dans la liste principal //
function displayPokemons(pokemon) {
  listWrapper.innerHTML = ""; // efface le contenu précédent de la liste //

  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemonTranslations[pokemonID] || pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">#${pokemonTranslations[pokemonID] || pokemon.name}</p>
        </div>
    `;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.types.some(type => type.type.name === "electric")) {
          listItem.classList.add("electric-bg");
        }
      });

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });

    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", handleSearch);

// fonction pour gérer la recherche de pokemon //
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  // filtrage des pokemons en fonction de l'option de filtrage ( nom ou numéro ) //
   if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      (pokemonTranslations[pokemon.url.split("/")[6]] || pokemon.name).toLowerCase().startsWith(searchTerm)
    );
  } else {
    filteredPokemons = allPokemons;
  }

  displayPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemons);
  notFoundMessage.style.display = "none";
}