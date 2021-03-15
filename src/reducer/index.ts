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
            const nextPage = state.currentPage + 1;
            const addPokemonList = [...state.pokemonList, ...action.payload]
            return {
                ...state,
                pokemonList: addPokemonList,
                currentPage: nextPage,
                isLoading: false,
                error: false,
                pageLoading: false
            };
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
            return {
                ...state,
                pokemonList: emptyList,
                isLoading: true,
                currentPage: 1
            }
        case 'ADD_POKEMON_TO_MYPOKEMONS':
            let newCaughtPokemon:CaughtPokemonItemType = {
                name : `Can't find pokemon name`,
                id : `Can't find pokemon id`,
                time: `Can't find time`
            };
            const id = action.payload;
            const pokemon = state.pokemonList.find(item => item.id === id);
            if(pokemon !== undefined){
                newCaughtPokemon = {
                    ...pokemon,
                    id: pokemon.id + '',
                    time: action.time
                }
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