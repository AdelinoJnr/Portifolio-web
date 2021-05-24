/**/
const arrayPokemons = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidorina","Nidoqueen","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

// Tradução dos tipos de pokemons
const traducao = {
  poison: 'Veneno',
  grass: 'Planta',
  bug: 'Inseto',
  fire: 'Fogo',
  water: 'Agua',
  flying: 'Voador',
  normal: 'Normal',
  electric: 'Eletrico',
  ground: 'Terrestre',
  fairy: 'Fada',
  psychic: 'Psíquico',
  fighting: 'Lutador',
  rock: 'Rocha',
  steel: 'Aço',
  ghost: 'Fantasma',
  ice: 'Gelo',
  dragon: 'Dragão',
};

// Cria demais elementos do DOM
const createElements = (element, text, className) => {
  const elemento = document.createElement(element);
  elemento.innerText = text;
  elemento.className = className;
  return elemento;
};

// Cria um elemento que contem img:src
const createElementImg = (src, className) => {
  const elemento = document.createElement('img');
  elemento.className = className;
  elemento.src = src;
  return elemento;
}

// Busca por todos os elementos daquela class
const buscaPorDetalhesAll = (item, className) => {
  return item.querySelectorAll(className)
};

// Buscas para encontrar demais elementos da pagina
const buscarPorDetalhes = (item, className) => {
  return item.querySelector(className)
};

// Busca para encontrar o nome do pokemon
const buscaDoPokemon = (item) => {
  return item.querySelector('p.name-pokemon').innerText;
};

// Detalhes adicionando na section
const createDetalhes = async (namePokemon, element) => {
  const dados = await getData(namePokemon);
  const { base_experience, height, weight, types, abilities, stats } = dados;
  let typesPokemon = [];
  let habilidadesPokemon = [];
  let status = [];
  stats.forEach((e) => status.push(e.base_stat));
  types.forEach((tipo) => typesPokemon.push(tipo.type.name));
  abilities.forEach((skill) => habilidadesPokemon.push(skill.ability.name));
  const type = typesPokemon.map((hab) => traducao[hab]);
  const section = element.parentNode;
  // section.appendChild(createElements('p', `Nome: ${name}`, 'detalhes-pokemon'));
  section.appendChild(createElements('p', `Peso: ${weight} | Altura: ${height}`, 'detalhes-pokemon'));
  section.appendChild(createElements('p', `Tipos: ${type.join(' | ')}`, 'detalhes-pokemon'));
  section.appendChild(createElements('p', `Habilidades: ${habilidadesPokemon.join(' | ')}`, 'detalhes-pokemon'));
  section.appendChild(createElements('p', `Base de Experiencia: ${base_experience}`, 'detalhes-pokemon'));
  section.appendChild(createElements('p', `Status Básicos:
    HP: ${status[0]} | ATK: ${status[1]} | DEF: ${status[2]}
    ATK-MAG: ${status[3]} | DEF-MAG ${status[4]} | SPEED: ${status[5]}`, 'detalhes-pokemon'));
  const menosDetalhes = createElements('p', 'Menos detalhes...', 'menos-detalhes');
  menosDetalhes.addEventListener('click', eventClickMenosDetalhes);
  section.appendChild(menosDetalhes);
};

// Callback usada no evento de click apra menos detalhes
const eventClickMenosDetalhes = (event) => {
  const detalhes = buscaPorDetalhesAll(event.target.parentNode, '.detalhes-pokemon');
  detalhes.forEach((p) => {
    p.remove()
  })
  const img = buscarPorDetalhes(event.target.parentNode, '.img-pokemon');
  const maisDetalhes = buscarPorDetalhes(event.target.parentNode, '.btn-details')
  maisDetalhes.style.display = 'block'
  img.style.width = '100px';
  img.style.height = '100px';
  event.target.style.display = 'none'
  event.target.parentNode.style.width = '150px';
  event.target.parentNode.style.height = '200px';
};

// Novos detalhes adicionais para o cliente, quando clickado no mais detalhes
const painelDetalhes = (element) => {
  const img = buscarPorDetalhes(element.parentNode, '.img-pokemon')
  element.parentNode.style.width = '500px';
  element.parentNode.style.height = '500px';
  element.style.display = 'none'
  img.style.width = '170px'
  img.style.height = '170px'
  const namePokemon = buscaDoPokemon(element.parentNode);
  createDetalhes(namePokemon, element);
};

// Callback usada no evento de click apra mais detalhes
const eventClickMaisDetalhes = (event) => {
  const pokemon = event.target
  painelDetalhes(pokemon);
}

// Retorna a section de um pokemon
const createItemListPokemon = ({ name, sprites: { other: { dream_world } }}) => {
  const section = document.createElement('section');
  section.className = 'pokemonList';
  section.appendChild(createElements('p', name, 'name-pokemon'));
  section.appendChild(createElementImg(dream_world.front_default, 'img-pokemon'));
  const detalhes = createElements('p', 'Mais detalhes...', 'btn-details');
  detalhes.addEventListener('click', eventClickMaisDetalhes);
  section.appendChild(detalhes);
  return section;
};

// Cria pokemons em sections e adiciona no DOM
const createList = () => {  
  arrayPokemons.forEach(async (pokemon) => {
    try {
      const namePokemon = pokemon.toLowerCase();
      const dados = await getData(namePokemon);
      const sectionGlobal = document.querySelector('.pokemons');
      sectionGlobal.appendChild(createItemListPokemon(dados));
    } catch (error) {
      console.log('Não achei nada');
    }
  });
};

// Remove o loading quando a busca da API for finalizada
const removeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove()
};

// Bucas de datos na API
const getData = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const dados = response.json();
  return dados;
};

const sincro = async () => {
  try {
    createList();
  } catch (error) {
    console.log('Não achei nada');
  }
};

window.onload = function () {
  setTimeout(() => {
    sincro(); 
    removeLoading();
  }, 2000);
};
