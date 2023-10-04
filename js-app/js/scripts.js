// Create an IIFE (Immediately Invoked Function Expression) to encapsulate the code
const pokemonRepository = (function () {
  // Private array to store Pokémon data
  const pokemonList = [];

  // Function to retrieve all Pokémon objects
  function getAll() {
    return pokemonList;
  }

  // Function to add a Pokémon object to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Function to add a Pokémon to the list and create a corresponding list item in the HTML
  function addListItem(pokemon) {
    // Find the <ul> element with the class "pokemon-list"
    const pokemonList = document.querySelector(".pokemon-list");

    // Create a new <li> element
    const listItem = document.createElement("li");

    // Create a <button> element
    const button = document.createElement("button");

    // Set the button's text to the Pokémon's name
    button.innerText = pokemon.name;

    // Add a CSS class to the button for styling
    button.classList.add("button-class");

    // Append the button to the list item
    listItem.appendChild(button);

    // Append the list item to the <ul> element
    pokemonList.appendChild(listItem);

    // Add an event listener to the button to show details when clicked
    button.addEventListener("click", function () {
      showDetails(pokemon); // Call the showDetails function with the Pokémon object
    });
  }

  // Function to show Pokémon details in the console
  function showDetails(pokemon) {
    console.log("Name: " + pokemon.name);
    console.log("Height: " + pokemon.height);
    console.log("Types: " + pokemon.types.join(", "));
    // You can add more details as needed
  }

  // Return an object with public functions and data
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

// Add Pokémon objects to the repository
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

// Iterate through the Pokémon list and add each Pokémon to the HTML
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
