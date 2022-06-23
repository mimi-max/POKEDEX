import { Component } from 'react';
import { Link } from 'react-router-dom';
import { pokemonApi } from '../../services/FetchPokemons';
import styles from './Pokemon.module.css';
import Tabs from './components/Tabs';
import Goback from './components/GoBack';
import pokeball from '../../img/pokeball.svg';

export default class Pokemon extends Component {
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
  };

  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      buttonShiny: false,
      buttonPokemon: false,
      tabOpen: 'about',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { name } = match.params;
    pokemonApi(name).then((data) => {
      console.log(data);

      this.setState(
        {
          pokemon: data,
        },
      );
    });
  }

  button() {
    this.setState((prevState) => ({
      buttonShiny: !prevState.buttonShiny,
      buttonPokemon: !prevState.buttonPokemon,
    }));
  }

  switchTab(id) {
    this.setState({
      tabOpen: id,
    });
    console.log(id);
  }

  render() {
    const { pokemon, buttonShiny, tabOpen } = this.state;

    // console.log(this.props.match.params.name)

    return (

      <div
        id="pokemonContainer"
        style={{
          backgroundColor: pokemon ? this.types[pokemon.types[0].type.name] : '#fff',
          backgroundImage: `url(${pokeball})`,
        }}
        className={styles.imgBackground}
      >
        <div className={styles.pokemonContent}>
          <Link to="/pokemon"><Goback /></Link>

          {pokemon?.sprites && pokemon?.id && (
          <div
            className={styles.pokemonContainerImg}
          >
            <div className={styles.typePokemonContainer}>
              {pokemon && <h1 className={styles.pokemonName}>{pokemon?.name}</h1>}

              <div className={styles.pokemonTypes}>
                {pokemon?.types?.[0]?.type?.name && (
                <span className={styles.pokemonType}>
                  {pokemon?.types?.[0]?.type.name}
                </span>
                )}

                {pokemon?.types?.[1]?.type?.name && (
                <span className={styles.pokemonType}>
                  {pokemon?.types?.[1]?.type?.name}
                </span>
                )}
              </div>
              <div><span className={styles.idPokemon}>{`#00${pokemon.id}`}</span></div>

            </div>

            {!buttonShiny && (
            <div className={styles.pokemonImageChange}>
              <img src={pokemon.sprites.other.home.front_default} alt={pokemon?.name} />

              <div className={styles.btnImage}>
                <button
                  type="button"
                  className={styles.btnImageShinyPokemon}
                  onClick={this.button.bind(this)}
                >
                  Show Shiny Image
                </button>
              </div>

            </div>
            )}

            {buttonShiny && (
            <div className={styles.pokemonImageChange}>
              <img src={pokemon.sprites.other.home.front_shiny} alt={pokemon?.name} />

              <div className={styles.btnImage}>
                <button
                  type="button"
                  className={styles.btnImageShinyPokemon}
                  onClick={this.button.bind(this)}
                >
                  Show Pokemon Image
                </button>
              </div>

            </div>
            )}

          </div>
          )}
        </div>

        <Tabs
          switchTab={this.switchTab.bind(this)}
          tabOpen={tabOpen}
          pokemon={pokemon}
        />

      </div>
    );
  }
}
