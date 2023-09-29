const pokemonRepository = (function () {
  // Private array to store Pokémon data
  const pokemonList = [];

  // Public functions
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }



  // Return an object with public functions
  return {
    getAll: getAll,
    add: add,
  };
})();


pokemonRepository.add({
  name: "Bulbasaur",
  height: 7,
  types: ["grass", "poison"]
});

pokemonRepository.add({
  name: "Charizard",
  height: 17,
  types: ["fire", "flying"]
});

pokemonRepository.add({
  name: "Squirtle",
  height: 5,
  types: ["water"]
});

pokemonRepository.add({
  name: "Pikachu",
  height: 4,
  types: ["electric"]
});

// Access the pokemonList array using the getAll() function
const allPokemon = pokemonRepository.getAll();
console.log(allPokemon);


// Loop through the array and log information 
allPokemon.forEach(pokemon => {
  console.log(pokemon.name + " (height: " + pokemon.height + ") ");
  if (pokemon.height > 10) {
    console.log("- Wow, that's big! ");
  }
  if (pokemon.height < 5) {
    console.log("- Aww, it's so small! ");
  }
});

// Find the tallest Pokémon using forEach() and log its name and height
let tallestPokemon = allPokemon[0];
allPokemon.forEach(pokemon => {
  if (pokemon.height > tallestPokemon.height) {
    tallestPokemon = pokemon;
  }
});

console.log("The tallest Pokémon is " + tallestPokemon.name + " (height: " + tallestPokemon.height + ")!");
