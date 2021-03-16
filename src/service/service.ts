import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { pokemonListError, pokemonListLoaded, myPokemonListLoaded, addToMyPokemons } from '../actions';
import { ActionsType, AppStateType, PokemonItemType } from '../types/types';


const fetchPokemonsData = ():ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch) => {
        axios.get(`http://localhost:4000/pokemons`)
            .then(res => { dispatch(pokemonListLoaded( res.data )) })
            .catch(() => { dispatch(pokemonListError()) });
    }
}

const fetchMyPokemons = () :ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch) => {
        axios.get(`http://localhost:4000/mypokemons`)
        .then((res)=> {dispatch(myPokemonListLoaded(res.data))})
        .catch(() => { dispatch(pokemonListError()) });
    }
}


const fetchPageData = ( pageNumber: number ): ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return ( dispatch) => {
        axios.get(`http://localhost:4000/pokemons`, {
            params: {
                _page: pageNumber,
                _limit: 30
            }
        })
            .then(res => { dispatch(pokemonListLoaded( res.data )) })
            .catch(() => { dispatch(pokemonListError()) });
    }
}

const postMyPokemons = (caughtTime:string, pokemon: PokemonItemType) : ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch) => {
        axios.post(`http://localhost:4000/mypokemons`, {
            name: pokemon.name,
            id: pokemon.id,
            time: caughtTime
          })
          .then(()=> {dispatch(addToMyPokemons(caughtTime, pokemon)) })
          .catch(()=> {dispatch(pokemonListError())} );
    }
}

export {
    fetchPokemonsData,
    fetchMyPokemons,
    fetchPageData,
    postMyPokemons,
}