import { Component } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { listPokemonApi } from '../services/FetchPokemons'
import styles from './PokemonList.module.css'

export class PokemonList extends Component {

    state = {
        ListPokemon: [],
        NextUrl: null,
        page: 20

    }

    componentDidMount() {
        listPokemonApi().then((data) => {
            // console.log(data.next)
            this.setState(
                {
                    ListPokemon: data.results,
                    NextUrl: data.next
                }
            )

        })
    }

    pokemon() {

        let url = `https://pokeapi.co/api/v2/pokemon?offset=${this.state.page}&limit=20&types=fire`
        // if(this.state.page <100){
        fetch(url).then(response => response.json())
            .then((data) => {
                console.log(data)

                this.setState(
                    {
                        page: this.state.page + 20,
                        ListPokemon: [...this.state.ListPokemon, ...data.results]
                    }

                )
            })
        // }


    }

    render() {

        return <div className={styles.container}>
            <div className={styles.pokemons}>

                {this.state.ListPokemon.map((pokemon) => {
                    const url = pokemon.url
                    const imgIndex = url.split('/')[6]

                    return <div key={pokemon.url} >


                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${imgIndex}.png`} />
                        <Link className={styles.pokemonName} to={`/pokemon/${pokemon.name}`}><p >{pokemon.name}</p></Link>


                    </div>
                })}



            </div>
            <div className={styles.btncontainer}>
                {this.state.NextUrl && <button className={styles.btnpokemonAdd} onClick={this.pokemon.bind(this)}>Add Pokemon</button>}

            </div>
            

        </div>
    }
}