import axios from 'axios';
import { ThunkAction } from 'redux-thunk';

import {POKEMON_LIST_LOADED, POKEMON_LIST_LOADING, POKEMON_LIST_ERROR, CLEAR_LIST, ADD_POKEMON_TO_MYPOKEMONS, MYPOKEMON_LIST_LOADED,
    PokemonListLoadedType, PokemonListLoadingType, PokemonListErrorType, ClearListType, AddToMyPokemonsType, MyPokemonListLoadedType,
    PokemonItemType, CaughtPokemonItemType,
    AppStateType,
    ActionsType,} from '../types/types';


const pokemonListLoaded = ( newList:Array<PokemonItemType>):PokemonListLoadedType  => {
    return {
        type: POKEMON_LIST_LOADED,
        payload: newList
    }
}

const myPokemonListLoaded = (newList:Array<CaughtPokemonItemType>): MyPokemonListLoadedType => {
    return {
        type: MYPOKEMON_LIST_LOADED,
        payload: newList
    } 
}

const pokemonListLoading = () : PokemonListLoadingType => {
    return {
        type: POKEMON_LIST_LOADING
    }
}


const pokemonListError = (): PokemonListErrorType => {
    return {
        type: POKEMON_LIST_ERROR
    }
}


const clearList = ():ClearListType => {
    return {
        type: CLEAR_LIST
    }
}


const addToMyPokemons = ( caughtTime:string, pokemon: PokemonItemType ) : AddToMyPokemonsType  => {
    return {
        type: ADD_POKEMON_TO_MYPOKEMONS,
        time: caughtTime,
        payload: pokemon
    }
}

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
    pokemonListLoaded,
    myPokemonListLoaded,
    addToMyPokemons,
    pokemonListLoading,
    pokemonListError,
    clearList,
};