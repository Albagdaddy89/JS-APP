(function () {
  const pokemonRepository = (function () {
    const pokemonList = [];

    // Function to get all Pokémon in the list
    function getAll() {
      return pokemonList;
    }

    // Function to add a Pokémon to the list
    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    // Function to add a Pokémon to the HTML list as a button
    function addListItem(pokemon) {
      const pokemonList = document.querySelector(".pokemon-list");
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("custom-button"); // Use the new class name
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

      // Add an event listener to the button to show details when clicked
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    }

    // Function to load the list of Pokémon from the API
    function loadList() {
      return fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          data.results.forEach(function (item) {
            const pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    // Function to load details of a Pokémon from the API
    function loadDetails(pokemon) {
      const url = pokemon.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          pokemon.imgUrl = details.sprites.front_default;
          pokemon.height = details.height;
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    // Function to show Pokémon details in the modal
    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        const modalContainer = document.querySelector("#modal-container");
        modalContainer.classList.add("modal-visible");
        showModal(pokemon);
      });
    }

    // Function to create and display the modal
    function showModal(pokemon) {
      const modalContainer = document.querySelector("#modal-container");
      const modal = document.createElement("div");
      modal.classList.add("modal");

      const closeButton = document.createElement("button");
      closeButton.classList.add("modal-close");
      closeButton.innerText = "Close";
      closeButton.addEventListener("click", function () {
        hideModal();
      });

      const nameElement = document.createElement("h2");
      nameElement.innerText = "Name: " + pokemon.name;

      const heightElement = document.createElement("p");
      heightElement.innerText = "Height: " + pokemon.height + " decimetres";

      const imageElement = document.createElement("img");
      imageElement.src = pokemon.imgUrl;
      imageElement.alt = pokemon.name;

      modal.appendChild(closeButton);
      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modal.appendChild(imageElement);

      modalContainer.innerHTML = "";
      modalContainer.appendChild(modal);
      modalContainer.classList.add("modal-visible");
    }

    // Function to hide the modal
    function hideModal() {
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.classList.remove("modal-visible");
    }

    // Event listener to close the modal when clicking outside of it
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.addEventListener("click", function (event) {
      if (event.target === modalContainer) {
        hideModal();
      }
    });

    // Event listener to close the modal when pressing the 'Esc' key
    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modalContainer.classList.contains("modal-visible")) {
        hideModal();
      }
    });

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      hideModal: hideModal,
    };
  })();

  // Load the list of Pokémon and add them to the HTML
  pokemonRepository.loadList().then(function () {
    const allPokemon = pokemonRepository.getAll();
    allPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
})();
