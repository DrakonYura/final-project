import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import {POKEMON_LIST_LOADED, POKEMON_LIST_LOADING, POKEMON_LIST_ERROR, CLEAR_LIST, ADD_POKEMON_TO_MYPOKEMONS,
    PokemonListLoadedType, PokemonListLoadingType, PokemonListErrorType, ClearListType, AddToMyPokemonsType,
    PokemonItemType,
    AppStateType,
    ActionsType,} from '../types/types';


const pokemonListLoaded = ( newList:Array<PokemonItemType>):PokemonListLoadedType  => {
    return {
        type: POKEMON_LIST_LOADED,
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


const addToMyPokemons = ( caughtTime:string, id: number ) : AddToMyPokemonsType  => {
    return {
        type: ADD_POKEMON_TO_MYPOKEMONS,
        time: caughtTime,
        payload: id
    }
}

const fetchAllData = ():ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch) => {
        axios.get(`http://localhost:4000/pokemons`)
            .then(res => { dispatch(pokemonListLoaded( res.data )) })
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

export {
    pokemonListLoaded,
    pokemonListLoading,
    pokemonListError,
    clearList,
    addToMyPokemons,
    fetchPageData,
    fetchAllData,
};