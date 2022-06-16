import { MdMenu, MdChevronLeft } from "react-icons/md"
import { Link } from "react-router-dom"
import { Component } from "react"
import styles from './Home.module.css'
import { PokemonList} from "./PokemonList"




export class Home extends Component {
    state = {
        toggleListPokemon: false,
    }

    handleShowListPokemon(e) {
        e.preventDefault()
        this.setState(
            {
                toggleListPokemon: !this.state.toggleListPokemon
            }
        )

    }


    render() {
        return <div className={styles.container}>

            <nav className={styles.header}>
                <Link to='/'>< MdChevronLeft /></Link>
                < MdMenu onClick={this.handleShowListPokemon.bind(this)} className={styles.menu} />
            </nav>

            {this.state.toggleListPokemon && <PokemonList/>}

            {!this.state.toggleListPokemon && <div className={styles.deskText}>
                <p>Hello, Click Menu to see all Pokemons</p></div>}
            

        
        </div>
    }
}