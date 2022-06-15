import { Component } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { listPokemonApi } from './../services/FetchPokemons'
import styles from './Pokemons.module.css'

export class Pokemons extends Component {

    state = {
        ListPokemon: []
    }

    componentDidMount(){
        listPokemonApi().then((data)=>{
            // console.log(data.results)

            this.setState(
                {
                    ListPokemon:data.results
                }
            )
        })
    }


    render() {
        return <div className={styles.pokemons}>
            {this.state.ListPokemon.map((pokemon)=>{
                return <div key={pokemon.url} >
                    
                    <Link to={`/${pokemon.name}`}><p>{pokemon.name}</p></Link>
                    
                    
                </div>
            })}
        </div>
    }
}