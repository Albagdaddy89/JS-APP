// Wrap the entire code in an Immediately Invoked Function Expression (IIFE) to prevent global variable pollution
(function () {
  // Define the pokemonRepository module
  const pokemonRepository = (function () {
    const pokemonList = [];  // Array to store Pokemon objects

    // Retrieve all Pokemon from the list
    function getAll() {
      return pokemonList;
    }

    // Add a Pokemon object to the list
    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    // Add a button for each Pokemon to the HTML
    const addListItem = pokemon => {
      const $pokemonListElement = $('.pokemon-list');
  
      // Create a div for the grid column. Assuming you want a 3-column layout for medium screens.
      let $colDiv = $('<div>').addClass('col-md-4 mb-3');
      
      let $button = $('<button>')
                      .addClass('btn btn-primary btn-block')
                      .text(pokemon.name)
                      .on('click', () => showDetails(pokemon));
      
      $colDiv.append($button); // Append button to the column div.
      $pokemonListElement.append($colDiv); // Append the column div to the container.
  };
  
    
      // Event listener to display details when Pokemon button is clicked
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    }

    // Fetch list of Pokemon from the API and add to the pokemonList array
    function loadList() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(response => response.json())
        .then(data => {
          data.results.forEach(item => {
            const pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }

    // Fetch detailed information of a specific Pokemon from the API
    function loadDetails(pokemon) {
      return fetch(pokemon.detailsUrl)
        .then(response => response.json())
        .then(details => {
          pokemon.imgUrl = details.sprites.front_default;
          pokemon.height = details.height;
        })
        .catch(e => {
          console.error(e);
        });
    }

    // Display a modal with detailed information about the Pokemon
    function showModal(pokemon) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
      
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
  
      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + pokemon.height;
  
      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imgUrl;
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('is-visible');
    }

    // Fetch and display detailed information about the Pokemon
    function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
        showModal(pokemon);
      });
    }

    // Expose public methods of the module
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
  })();

  // Load the Pokemon list and display them in the HTML when the page loads
  pokemonRepository.loadList().then(() => {
    const allPokemon = pokemonRepository.getAll();
    allPokemon.forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
    });
  });
})();

// Global function to hide the modal
function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
  
  }


// Add event listener to close modal when 'Escape' key is pressed
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});

// Add event listener to close modal when clicking outside of it
let modalContainer = document.querySelector('#modal-container');
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});
