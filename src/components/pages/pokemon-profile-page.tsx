import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import PokemonListItem from '../pokemon-list-item';
import { pokemonListError, clearList, addToMyPokemons, fetchAllData  } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';



import {AppStateType, PokemonItemType, CaughtPokemonItemType} from '../../types/types';

type MapStateToPropsType = {
    pokemonItems: Array<PokemonItemType> 
    caughtPokemons: Array<CaughtPokemonItemType>
    isLoading: boolean
    error: boolean
    style: string
}

type MapDispatchToPropsType = {
    pokemonListError: () => void
    clearList: () => void
    addToMyPokemons: (caughtTime:string, id:number) => void

    fetchAllData: () => void
}

interface MatchParams {
    id: string;
}

interface IRoute extends RouteComponentProps<MatchParams> {
}


type PropsType = MapStateToPropsType & MapDispatchToPropsType & IRoute


class PokemonProfilePage extends Component<PropsType> {

    componentDidMount() {
        this.props.fetchAllData();
    }

    componentWillUnmount() {
        this.props.clearList();
    }

    render() {
        const { pokemonItems, caughtPokemons, isLoading, error, style, addToMyPokemons } = this.props;

        if (error) {
            return (
                <div className="pokemon-profile">
                    <Error />
                </div>
            )
        }

        if (isLoading) {
            return (
                <div className="pokemon-profile">
                    <Spinner />
                </div>
            )
        }
        const pokemon = pokemonItems.find(item => +item.id === +this.props.match.params.id);

        if(pokemon === undefined){
            return <Error />
        }
        
        let caughtPokemon = null;
        let сaughtTime = '';
        let isDisabled = false;

        if (caughtPokemons.length !== 0 && pokemon !== undefined) {
            caughtPokemon = caughtPokemons.find(item => +item.id === pokemon.id);
            if (caughtPokemon) {
                isDisabled = true;
                сaughtTime = caughtPokemon.time;
            }
        }

        return (
            <div>
                <PokemonListItem
                    pokemonListItem={pokemon}
                    time={сaughtTime}
                    isDisabled={isDisabled}
                    page={'profilePokemon'}
                    style={style}
                    onAddToMyPokemons={(caughtTime) => addToMyPokemons(caughtTime, pokemon.id)} />
            </div>
        )
    }

}


const mapStateToProps = (state : AppStateType) => {
    return {
        pokemonItems: state.pokemonList,
        caughtPokemons: state.caughtPokemons,
        isLoading: state.isLoading,
        error: state.error,
        style: state.styles.profile
    }
}

const mapDispatchToProps = {
    pokemonListError,
    clearList,
    addToMyPokemons,
    fetchAllData,
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonProfilePage);