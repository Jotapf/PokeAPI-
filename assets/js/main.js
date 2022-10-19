const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')

const maxRecords = 151
const limit = 6
let offset = 0




function loadPokemonItens(offset, limit){
    
    pokeApi.getPokemons(offset, limit).then((pokemonData = []) => {
        const newHtml =  pokemonData.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.numberId}</span>
                <span class="name">${pokemon.name}</span>
                <span class="hp">Hp: ${pokemon.hp}</span>            
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })

}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemonItens(offset, limit)

    }

})