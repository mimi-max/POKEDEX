import { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { listPokemonApi } from '../../services/FetchPokemons';
import styles from './PokemonList.module.css';

export default class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPokemon: [],
      nextUrl: null,
      page: 20,

    };
  }

  componentDidMount() {
    listPokemonApi().then((data) => {
      this.setState(
        {
          listPokemon: data.results,
          nextUrl: data.next,
        },
      );
    });
  }

  pokemon() {
    const { page, listPokemon } = this.state;

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20&types=fire`;

    fetch(url).then((response) => response.json())
      .then((data) => {
        this.setState(
          {
            page: page + 20,
            listPokemon: [...listPokemon, ...data.results],
          },

        );
      });
  }

  render() {
    const { listPokemon, nextUrl } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.pokemons}>

          {listPokemon.map((pokemon) => {
            const { url } = pokemon;
            const imgIndex = url.split('/')[6];

            return (
              <div key={pokemon.url}>

                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${imgIndex}.png`} alt={pokemon.name} />
                <Link className={styles.pokemonName} to={`/pokemon/${pokemon.name}`}><p>{pokemon.name}</p></Link>

              </div>
            );
          })}

        </div>
        <div className={styles.btncontainer}>
          {nextUrl
          && (
          <button
            className={styles.btnpokemonAdd}
            onClick={this.pokemon.bind(this)}
            type="button"
          >
            Add Pokemon
          </button>
          )}
        </div>

      </div>
    );
  }
}
