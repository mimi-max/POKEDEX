import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import Pokemon from './pages/Pokemon';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pokemon" component={PokemonList} />
        <Route path="/pokemon/:name" component={Pokemon} />
        <Route><Redirect to="/pokemon" /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
