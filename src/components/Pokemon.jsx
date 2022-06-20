import { Component } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { pokemonApi } from '../services/FetchPokemons'
import styles from './Pokemon.module.css'

export class Pokemon extends Component {

    types = {
        bug: '#14532d',
        dark: '#52525b',
        dragon: '#0ea5e9',
        electric: '#fbbf24',
        fairy: '#ec4899',
        fighting: '#ea580c',
        fire: '#f97316',
        flying: '94a3b8',
        ghost: '#3730a3',
        grass: '#4ade80',
        ground: '#292524',
        ice: '#93c5fd',
        normal: '#fecdd3',
        poison: '#581c87',
        psychic: '#db2777',
        rock: '#78350f',
        steel: '#4d7c0f',
        water: '#38bdf8',

    }


    state = {
        Pokemon: null,
        buttonShiny: false,
        buttonPokemon: false,
        tabOpen: 'about',


    }
    componentDidMount() {
        const name = this.props.match.params.name
        pokemonApi(name).then((data) => {
            console.log(data)

            this.setState(
                {
                    Pokemon: data
                }
            )
        })
    }
    button() {
        this.setState(
            {
                buttonShiny: !this.state.buttonShiny,
                buttonPokemon: !this.state.buttonPokemon
            }
        )
    }
    openAbout(id) {
        this.setState({
            tabOpen: id
        })
        console.log(id)

    }


    render() {
        // console.log(this.props.match.params.name)

        const urlShowPokemonTypeOne = this.state.Pokemon && this.state.Pokemon.types[0] && this.state.Pokemon.types[0].type.url.split('/')[6]
        const urlShowPokemonTypeTwo = this.state.Pokemon && this.state.Pokemon.types[1] && this.state.Pokemon.types[1].type.url.split('/')[6]

        // const hiddenTypeImageAfterClick=


        return <div className={styles.pokemonContainer}>


            <div className={styles.typepokemon}>
                <div className={styles.typepokemonBtn}>

                    {this.state.Pokemon && this.state.Pokemon.types[0] && this.state.Pokemon.types[0].type.name
                        && <span>{this.state.Pokemon && this.state.Pokemon.types[0]
                            && this.state.Pokemon.types[0].type.name}</span>
                    }

                    {this.state.Pokemon && this.state.Pokemon.types[1] && this.state.Pokemon.types[1].type.name &&
                        <span>{this.state.Pokemon
                            && this.state.Pokemon.types[1] && this.state.Pokemon.types[1].type.name}</span>}

                </div>
                {this.state.Pokemon && <p className={styles.pokemonName}>{this.state.Pokemon.name}</p>}
            </div>


            {this.state.Pokemon && this.state.Pokemon.sprites &&
                <div className={styles.pokemonContainerImg} style={{ backgroundColor: this.types[this.state.Pokemon.types[0].type.name] }}>

                    {!this.state.buttonShiny &&
                        <div>
                            <img src={this.state.Pokemon.sprites.other.home.front_default} />
                            <div className={styles.imageShinyPokemon}>
                                <button className={styles.btnImageShinyPokemon} onClick={this.button.bind(this)}>Show Shiny Image</button>
                            </div>

                        </div>
                    }


                    {this.state.buttonShiny &&
                        <div>
                            <img src={this.state.Pokemon.sprites.other.home.front_shiny} />

                            <div className={styles.imageShinyPokemon}>
                                <button className={styles.btnImageShinyPokemon} onClick={this.button.bind(this)}>Show Pokemon Image</button>
                            </div>
                        </div>

                    }

                </div>
            }
            {/* 
            <div>
                {this.state.Pokemon && <p>{this.state.Pokemon.weight / 10} kg</p>}
                {this.state.Pokemon && <p>{this.state.Pokemon.height * 10} cm</p>}

            </div> */}
            <div className={styles.tabs}>
                <button className={styles.tab} onClick={this.openAbout.bind(this, "about")}>About</button>
                <button className={styles.tab} onClick={this.openAbout.bind(this, "baseState")}>Base Stats</button>
            </div>

            {this.state.tabOpen === 'about' && <div className={styles.tabAbout}>
                <p className={styles.tabPara}><span className={styles.titleColumn}>Height:</span>{this.state.Pokemon && <span className={styles.tabSpan}>{this.state.Pokemon.weight / 10} kg</span>}</p>
                <p className={styles.tabPara}><span className={styles.titleColumn}>Weight:</span> {this.state.Pokemon && <span className={styles.tabSpan}>{this.state.Pokemon.height * 10} cm</span>}</p>
                <p className={styles.tabPara}><span className={styles.titleColumn}>Abilities:</span><span className={styles.tabSpan}>{this.state.Pokemon && this.state.Pokemon.abilities.map((ability)=>{
                    return ability.ability.name
                }).join(', ')}</span></p>
            </div>}

            {this.state.tabOpen === 'baseState' && <div>


                <div className={styles.border}>{this.state.Pokemon && this.state.Pokemon.stats.map((stat)=>{
        
                    return<p className={styles.tabPara}>
                    <span className={styles.titleColumn}>{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                    <span className={styles.grey} style={{height:'24px', width:'20%',backgroundColor:'red',display:'block'}}></span>
                    </p> 
                })} </div>
            </div>}





        </div>
    }
}