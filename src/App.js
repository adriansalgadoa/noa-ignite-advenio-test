import { useState } from 'react';
import PokemonMenu from './components/PokemonMenu';
import Battle from './components/Battle';
import './App.css';

const STATES = {
  CHOOSE: 'CHOOSE',
  BATTLE: 'BATTLE',
}

const App = () => {
  const [enemy, setEnemy] = useState({});
  const [pokemon, setPokemon] = useState({});
  const [state, setState] = useState(STATES.CHOOSE);

  const choosePokemon = (pokemon, enemy) => {
    setPokemon(pokemon);
    setEnemy(enemy);
    setState(STATES.BATTLE);
  }

  return (
    <div className='App'>
      <h1>Choose Your Pokemon!</h1>

      {state === STATES.CHOOSE && <PokemonMenu choosePokemon={choosePokemon} />}
      {state === STATES.BATTLE && <Battle pokemon={pokemon} enemy={enemy} goToMenu={() => setState(STATES.CHOOSE)} />}
    </div>
  );
};

export default App;