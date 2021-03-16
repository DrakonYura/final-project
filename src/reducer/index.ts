import {AppStateType, PokemonItemType, CaughtPokemonItemType, ActionsType, } from '../types/types';

const initialState: AppStateType = {
    pokemonList: [],
    isLoading: true,
    error: false,
    caughtPokemons: [],
    startPage: 0,
    currentPage: 1,
    pageLoading: false,
    styles: {
        list: 'pokemon-list',
        profile: 'pokemon-profile',
        myPokemons: 'pokemon-list'
    }
};


const reducer = ( state:AppStateType = initialState, action:ActionsType ):AppStateType => {
    switch ( action.type ) {
        case 'POKEMON_LIST_LOADED':
            const nextPage = ++state.currentPage;
            const addPokemonList = [...state.pokemonList, ...action.payload]
            return {
                ...state,
                pokemonList: addPokemonList,
                currentPage: nextPage,
                isLoading: false,
                error: false,
                pageLoading: false
            };
        case 'MYPOKEMON_LIST_LOADED':
            const myPokemList = [...action.payload];
            return {
                ...state,
                caughtPokemons: myPokemList
            }    
        case 'POKEMON_LIST_LOADING':
            return {
                ...state,
                pageLoading: true,
                error: false
            }
        case 'POKEMON_LIST_ERROR':
            return {
                ...state,
                error: true
            }
        case 'CLEAR_LIST':
            const emptyList:Array<PokemonItemType> = [];
            const emptyMyPokemons: Array<CaughtPokemonItemType> = [];
            return {
                ...state,
                pokemonList: emptyList,
                caughtPokemons: emptyMyPokemons,
                isLoading: true,
                currentPage: 1
            }
        case 'ADD_POKEMON_TO_MYPOKEMONS':
            const newCaughtPokemon = {
                    name : action.payload.name,
                    id: action.payload.id + '',
                    time: action.time
                }
            
            return {
                ...state,
                caughtPokemons: [
                    ...state.caughtPokemons,
                    newCaughtPokemon
                ]
            }

        default:
            return state;
    }
}

export default reducer;