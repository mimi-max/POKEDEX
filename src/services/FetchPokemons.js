const endpoint= "https://pokeapi.co/api/v2/pokemon/"

export function listPokemonApi(){
    return fetch(endpoint)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        return data
    })

}