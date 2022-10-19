

const pokeApi = {}
function convertPokemonApiDetail(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.numberId = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.hp = pokeDetail['stats']['0']['base_stat']    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    return pokemon

}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonApiDetail)
}

pokeApi.getPokemons = (offset = 0, limit = 15) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((pokemon) => pokemon.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}

 