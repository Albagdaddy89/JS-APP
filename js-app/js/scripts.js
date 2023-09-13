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
    types: ["electric"] });
   
// Loop through the array and write the name and height of each Pokémon to the document

for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
  if (pokemonList[i].height > 10) {
    document.write("- Wow, that's big! ");
  }
  if (pokemonList[i].height < 5) {
    document.write("- Aww, it's so small! ");
  }
  document.write("<br>");
}

// highlight the tallest pokemon

let tallestPokemon = pokemonList[0];
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > tallestPokemon.height) {
    tallestPokemon = pokemonList[i];
  }
}
