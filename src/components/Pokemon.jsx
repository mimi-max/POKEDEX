import { Component } from 'react';
import { pokemonApi } from '../services/FetchPokemons';
import styles from './Pokemon.module.css';

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
    const { name } = this.props.match.params;
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
    this.setState(
      {
        buttonShiny: !this.state.buttonShiny,
        buttonPokemon: !this.state.buttonPokemon,
      },
    );
  }

  openAbout(id) {
    this.setState({
      tabOpen: id,
    });
    console.log(id);
  }

  render() {
    const totalStat = this.state?.pokemon?.stats
      ?.map((stat) => stat.base_stat)
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    // console.log(this.props.match.params.name)

    const urlShowPokemonTypeOne = this.state.pokemon && this.state.pokemon.types[0] && this.state.pokemon.types[0].type.url.split('/')[6];
    // const urlShowPokemonTypeTwo = this.state.Pokemon && this.state.Pokemon.types[1] && this.state.Pokemon.types[1].type.url.split('/')[6]
    const urlShowPokemonTypeTwo = this.state?.pokemon?.types?.[1]?.type?.url.split('/')[6];

    return (
      <div className={styles.pokemonContainer}>

        <div className={styles.typepokemon}>
          <div className={styles.typepokemonBtn}>

            {this.state.pokemon && this.state.pokemon.types[0] && this.state.pokemon.types[0].type.name
                        && (
                        <span>
                          {this.state.pokemon && this.state.pokemon.types[0]
                            && this.state.pokemon.types[0].type.name}
                        </span>
                        )}

            {this.state.pokemon && this.state.pokemon.types[1] && this.state.pokemon.types[1].type.name
                        && (
                        <span>
                          {this.state.pokemon
                                && this.state.pokemon.types[1] && this.state.pokemon.types[1].type.name}
                        </span>
                        )}

          </div>
          {this.state.pokemon && <p className={styles.pokemonName}>{this.state.pokemon.name}</p>}
        </div>

        {this.state.pokemon && this.state.pokemon.sprites
                && (
                <div className={styles.pokemonContainerImg} style={{ backgroundColor: this.types[this.state.pokemon.types[0].type.name] }}>

                  {!this.state.buttonShiny
                        && (
                        <div>
                          <img src={this.state.pokemon.sprites.other.home.front_default} />
                          <div className={styles.imageShinyPokemon}>
                            <button className={styles.btnImageShinyPokemon} onClick={this.button.bind(this)}>Show Shiny Image</button>
                          </div>

                        </div>
                        )}

                  {this.state.buttonShiny
                        && (
                        <div>
                          <img src={this.state.pokemon.sprites.other.home.front_shiny} />

                          <div className={styles.imageShinyPokemon}>
                            <button className={styles.btnImageShinyPokemon} onClick={this.button.bind(this)}>Show Pokemon Image</button>
                          </div>
                        </div>
                        )}

                </div>
                )}

        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button className={styles.tab} onClick={this.openAbout.bind(this, 'about')}>About</button>
            <button className={styles.tab} onClick={this.openAbout.bind(this, 'baseState')}>Base Stats</button>
          </div>

          {this.state.tabOpen === 'about' && (
          <div>
            <p>
              <span>Height:</span>
              {this.state.pokemon && (
              <span className={styles.tabSpan}>
                {this.state.pokemon.weight / 10}
                {' '}
                kg
              </span>
              )}
            </p>
            <p>
              <span>Weight:</span>
              {' '}
              {this.state.pokemon && (
              <span className={styles.tabSpan}>
                {this.state.pokemon.height * 10}
                {' '}
                cm
              </span>
              )}
            </p>
            <p>
              <span>Abilities:</span>
              <span className={styles.tabSpan}>
                {this.state.pokemon && this.state.pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
              </span>
            </p>
          </div>
          )}
        </div>

        {this.state.tabOpen === 'baseState' && (
        <div>
          <div className={styles.border}>
            {this.state.pokemon && this.state.pokemon.stats.map((stat) => {
              console.log(stat.base_stat / 255 * 100);
              const progressbar = stat.base_stat / 255 * 100;

              return (
                <div>

                  <p className={styles.tabPara}>

                    <span className={styles.titleColumn}>{stat.stat.name}</span>

                    <span style={{ width: '50px' }}>{stat.base_stat}</span>
                    <span style={{
                      width: '200px', backgroundColor: '#a6afab', display: 'block', height: '8px',
                    }}
                    >
                      <span style={{
                        backgroundColor: stat.base_stat <= 50 ? 'red' : 'green', display: 'block', height: '100%', width: `${progressbar}%`,
                      }}
                      />
                    </span>

                  </p>
                </div>
              );
            })}
            {' '}

          </div>
          <div className={styles.tabContent}>
            <p className={styles.tabPara}>
              <span className={styles.titleColumn}>Totale</span>
              <span style={{ width: '50px' }}>
                {this.state.pokemon.stats
                  .map((stat) => stat.base_stat)
                  .reduce((previousValue, currentValue) => previousValue + currentValue)}
              </span>
              <span style={{
                width: '200px', backgroundColor: '#a6afab', display: 'block', height: '8px',
              }}
              >
                <span style={{
                  backgroundColor: totalStat <= 50 ? 'red' : 'green', display: 'block', height: '100%', width: `${totalStat / 1530 * 100}%`,
                }}
                />
              </span>

            </p>

          </div>

        </div>
        )}

      </div>
    );
  }
}
