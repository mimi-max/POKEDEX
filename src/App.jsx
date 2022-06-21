import {  BrowserRouter as Router,  Switch,Route,Redirect} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom'
import {PokemonList} from './components/PokemonList'
import Pokemon  from './components/Pokemon'




function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/pokemon' component={PokemonList}/>
      <Route path='/pokemon/:name' component={Pokemon}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
