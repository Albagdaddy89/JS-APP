(function () {
  const pokemonRepository = (function () {
      const pokemonList = [];

      function getAll() {
          return pokemonList;
      }

      function add(pokemon) {
          pokemonList.push(pokemon);
      }

      const addListItem = pokemon => {
          const $pokemonListElement = $('.pokemon-list');
      
          let $listItem = $('<li>').addClass('list-group-item'); // Initializing the missing listItem
          let $button = $('<button>')
              .addClass('btn-ball')
              .attr('data-toggle', 'modal')
              .attr('data-target', '#pokemonModal')
              .attr('aria-label', 'Show details for ' + pokemon.name)
              .text(pokemon.name)
              .on('click', () => showDetails(pokemon));
      
          $listItem.append($button);
          $pokemonListElement.append($listItem);
      };
      

      function loadList() {
          return $.ajax("https://pokeapi.co/api/v2/pokemon/?limit=70", {
              dataType: 'json'
          })
          .then(data => {
              data.results.forEach(item => {
                  const pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                  };
                  add(pokemon);
              });
          })
          .catch(e => console.error(e));
      }

      function loadDetails(pokemon) {
          return $.ajax(pokemon.detailsUrl, {
              dataType: 'json'
          })
          .then(details => {
              pokemon.imgUrl = details.sprites.front_default;
              pokemon.height = details.height;
              pokemon.types = details.types.map(typeObj => typeObj.type.name);
          })
          .catch(e => console.error(e));
      }

      function showModal(pokemon) {
          $('#pokemonModalLabel').text(pokemon.name);
          $('#pokemonImage').attr('src', pokemon.imgUrl).addClass('pokemon-modal-image');
          $('#pokemonHeight').text('Height: ' + pokemon.height);
          $('#pokemonModal').modal('show');
          $('#pokemonType').text('Type: ' + pokemon.types.join(', '));
          $('#pokemonModal').modal('show');
      }

      function hideModal() {
          $('#pokemonModal').modal('hide');
      }

      function showDetails(pokemon) {
          loadDetails(pokemon).then(() => {
              showModal(pokemon);
          });
      }

      return {
          getAll: getAll,
          add: add,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails: showDetails,
          hideModal: hideModal
      };
  })();

  pokemonRepository.loadList().then(() => {
      const allPokemon = pokemonRepository.getAll();
      allPokemon.forEach(pokemon => {
          pokemonRepository.addListItem(pokemon);
      });
  });
})();

$(document).keyup(e => {
  if (e.key === 'Escape') {
      hideModal();
  }
});
