// Create a blank array called pokemonList
let pokemonList = [];

// Add Pokémon objects to the array
pokemonList.push({
  name: "Bulbasaur",
  height: 7,
  types: ["grass", "poison"]
});

pokemonList.push({
  name: "Charizard",
  height: 17,
  types: ["fire", "flying"]
});

pokemonList.push({
  name: "Squirtle",
  height: 5,
  types: ["water"]
});

pokemonList.push({
  name: "Pikachu",
  height: 4,
  types: ["electric"]
});

// Loop through the array and write the name, height, and additional messages to the document
pokemonList.forEach(pokemon => {
  document.write(pokemon.name + " (height: " + pokemon.height + ") ");
  if (pokemon.height > 10) {
    document.write("- Wow, that's big! ");
  }
  if (pokemon.height < 5) {
    document.write("- Aww, it's so small! ");
  }
  document.write("<br>");
});

// Find the tallest Pokémon using forEach() and write its name and height to the document
let tallestPokemon = pokemonList[0];
pokemonList.forEach(pokemon => {
  if (pokemon.height > tallestPokemon.height) {
    tallestPokemon = pokemon;
  }
});
document.write("<br>");
document.write("The tallest Pokémon is " + tallestPokemon.name + " (height: " + tallestPokemon.height + ")!");

const pokemonRepository = (function () {
  // Private array to store Pokémon data
  const pokemonList = [];

  // Public functions
  function getAll() {
    return pokemonList;
  }

  function add(item) {
    // Check if 'item' is a valid Pokémon object (you can add additional validation if needed)
    if (typeof item === 'object' && 'name' in item && 'height' in item && 'types' in item) {
      pokemonList.push(item);
    } else {
      console.error("Invalid Pokémon data. Please provide an object with 'name', 'height', and 'types' properties.");
    }
  }

  // Return an object with public functions
  return {
    getAll: getAll,
    add: add,
  };
})();


// Access the pokemonList array using the getAll() function
const allPokemon = pokemonRepository.getAll();
console.log(allPokemon);

