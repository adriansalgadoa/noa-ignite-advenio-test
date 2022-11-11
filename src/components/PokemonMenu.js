import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import './PokemonMenu.css';

const fetchPokemons = async (setPokemonList, fetchedRef) => {
    axios.all([
        axios.get('https://pokeapi.co/api/v2/pokemon/1'),
        axios.get('https://pokeapi.co/api/v2/pokemon/4'),
        axios.get('https://pokeapi.co/api/v2/pokemon/7'),
    ])
    .then(axios.spread((bulbasaur, charmander, squirtle) => {
        const pokemonList = [bulbasaur.data, charmander.data, squirtle.data];

        setPokemonList(pokemonList);
        fetchedRef.current = true;
    }));
};

const PokemonMenu = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [chosenPokemon, setChosenPokemon] = useState({});
    const fetchingRef = useRef(false);
    const fetchedRef = useRef(false);
  
    useEffect(() => {
        if (fetchingRef.current) return;
        fetchingRef.current = true;
        fetchPokemons(setPokemonList, fetchedRef);
    }, []);

    if (fetchedRef.current) {
        return (
            <div className='PokemonContainer'>
                {pokemonList.map((pokemon) => (
                    <div className='Pokemon' key={pokemon.name} onClick={() => setChosenPokemon(pokemon)}>
                        <img className='PokemonImage' src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <div>{pokemon.name}</div>
                    </div>
                ))}
            </div>
        );
    }

    if (fetchingRef.current) {
        return <div>Loading</div>;
    }

    return (<div></div>);
};

export default PokemonMenu;