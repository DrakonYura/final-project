
export type AppStateType = {
    pokemonList: Array<PokemonItemType>
    isLoading: boolean
    error: boolean
    caughtPokemons: Array<CaughtPokemonItemType>
    startPage: number
    currentPage: number
    pageLoading:boolean
    styles: StyleType
}

export type StyleType = {
    list : string
    profile: string
    myPokemons: string
}



export type PokemonItemType = {
    id: number
    name: string
}

export type CaughtPokemonItemType = {
    id: string
    name: string
    time:string
}


export const POKEMON_LIST_LOADED = 'POKEMON_LIST_LOADED';
export const POKEMON_LIST_LOADING = 'POKEMON_LIST_LOADING';
export const POKEMON_LIST_ERROR = 'POKEMON_LIST_ERROR';
export const CLEAR_LIST = 'CLEAR_LIST';
export const ADD_POKEMON_TO_MYPOKEMONS = 'ADD_POKEMON_TO_MYPOKEMONS';


export type PokemonListLoadedType = {
    type: typeof POKEMON_LIST_LOADED
    payload: Array<PokemonItemType>
}


export type PokemonListLoadingType = {
    type: typeof POKEMON_LIST_LOADING
}

export type PokemonListErrorType = {
    type: typeof POKEMON_LIST_ERROR
}

export type ClearListType = {
    type: typeof CLEAR_LIST
}

export type AddToMyPokemonsType = {
    type: typeof ADD_POKEMON_TO_MYPOKEMONS
    time:string
    payload: number
}

export type ActionsType = PokemonListLoadedType | PokemonListLoadingType | PokemonListErrorType |
                         ClearListType | AddToMyPokemonsType
