// 3.1 /3.2 

async function getRandomPokemons() {
  try {
    // Make a request to get all pokemons
    const allPokemonsResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const allPokemons = allPokemonsResponse.data.results;

    // Pick three random pokemons
    const randomPokemons = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * allPokemons.length);
      randomPokemons.push(allPokemons[randomIndex]);
      // Remove the chosen pokemon from the array to avoid duplicates
      allPokemons.splice(randomIndex, 1);
    }

    // Make requests to get data for the three random pokemons
    const pokemonDataPromises = randomPokemons.map(pokemon => axios.get(pokemon.url));
    const pokemonDataResponses = await Promise.all(pokemonDataPromises);

    // Log the data for each pokemon
    for (let i = 0; i < pokemonDataResponses.length; i++) {
      console.log(`Pokemon: ${randomPokemons[i].name}`);
      console.log(pokemonDataResponses[i].data);
    }
  } catch (error) {
    console.error(error);
  }
}

getRandomPokemons();

3.3


async function getRandomPokemonsWithDescription() {
  try {
    // Make a request to get all pokemons
    const allPokemonsResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const allPokemons = allPokemonsResponse.data.results;

    // Pick three random pokemons
    const randomPokemons = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * allPokemons.length);
      randomPokemons.push(allPokemons[randomIndex]);
      // Remove the chosen pokemon from the array to avoid duplicates
      allPokemons.splice(randomIndex, 1);
    }

    // Make requests to get data for the three random pokemons
    const pokemonDataPromises = randomPokemons.map(pokemon => axios.get(pokemon.url));
    const pokemonDataResponses = await Promise.all(pokemonDataPromises);

    // For each pokemon, make a request to get its species data
    const speciesDataPromises = pokemonDataResponses.map(response => axios.get(response.data.species.url));
    const speciesDataResponses = await Promise.all(speciesDataPromises);

    // For each species, find a description in English and log it along with the pokemon's name
    for (let i = 0; i < speciesDataResponses.length; i++) {
      const speciesData = speciesDataResponses[i].data;
      const englishFlavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
      if (englishFlavorTextEntry) {
        console.log(`${randomPokemons[i].name}: ${englishFlavorTextEntry.flavor_text}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

getRandomPokemonsWithDescription();

// 3.4

document.getElementById('generate-pokemon').addEventListener('click', async function() {
  // Clear the container
  const container = document.getElementById('pokemon-container');
  container.innerHTML = '';

  // Get all pokemons
  const allPokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
  const allPokemons = await allPokemonsResponse.json();

  // Pick three random pokemons
  const randomPokemons = [];
  for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * allPokemons.results.length);
      randomPokemons.push(allPokemons.results[randomIndex]);
      // Remove the chosen pokemon from the array to avoid duplicates
      allPokemons.results.splice(randomIndex, 1);
  }

  // Get data for each random pokemon and its species
  for (const pokemon of randomPokemons) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();

      // Find a flavor text entry in English
      const englishFlavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');

      // Create a new div for the pokemon and add it to the container
      const pokemonDiv = document.createElement('div');
      pokemonDiv.className = 'pokemon';
      pokemonDiv.innerHTML = `
          <h2>${pokemon.name}</h2>
          <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name}">
          <p>${englishFlavorTextEntry.flavor_text}</p>
      `;
      container.appendChild(pokemonDiv);
  }
});



