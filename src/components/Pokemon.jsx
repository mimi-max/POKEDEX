import { Component } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { pokemonApi } from '../services/FetchPokemons'

export class Pokemon extends Component {

    state = {
        Pokemon: null
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


    render() {
        // console.log(this.props.match.params.name)
        return <div>
            {this.state.Pokemon && this.state.Pokemon.sprites && <img src={this.state.Pokemon.sprites.other.home.front_default} />}

            {this.state.Pokemon && <p>{this.state.Pokemon.name}</p>}
            {this.state.Pokemon && <p>{this.state.Pokemon.weight/10} kg</p>}
            {this.state.Pokemon && <p>{this.state.Pokemon.height*10} cm</p>}

        </div>
    }
}