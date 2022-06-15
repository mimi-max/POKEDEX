import {  BrowserRouter as Router,  Switch,Route,Redirect} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom'
import { Home } from './components/Home'
import {Pokemons } from './components/Pokemons'
// import { Menu } from "./components/Menu"



function App() {


  return (
    <BrowserRouter>
    {/* <Menu/> */}
      <Switch>
        <Home path='/'component={Home}/>
      <Route path='/pokemon' component={Pokemons}/>

      </Switch>
    </BrowserRouter>
  )
}

export default App
