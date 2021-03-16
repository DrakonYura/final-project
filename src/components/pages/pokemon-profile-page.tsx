import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import PokemonListItem from '../pokemon-list-item';
import Spinner from '../spinner';
import Error from '../error';

import { pokemonListError, clearList } from '../../actions';
import {postMyPokemons, fetchPokemonsData, fetchMyPokemons} from '../../service';

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
    postMyPokemons: (caughtTime:string, pokemon:PokemonItemType) => void

    fetchMyPokemons: () => void
    fetchPokemonsData: () => void
}

interface MatchParams {
    id: string;
}

interface IRoute extends RouteComponentProps<MatchParams> {
}


type PropsType = MapStateToPropsType & MapDispatchToPropsType & IRoute


class PokemonProfilePage extends Component<PropsType> {

    componentDidMount() {
        this.props.fetchMyPokemons();
        this.props.fetchPokemonsData();
    }

    componentWillUnmount() {
        this.props.clearList();
    }

    render() {
        const { pokemonItems, caughtPokemons, isLoading, error, style, postMyPokemons } = this.props;

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
                    onAddToMyPokemons={(caughtTime:string) => postMyPokemons(caughtTime, pokemon)} />
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
    postMyPokemons,
    fetchPokemonsData,
    fetchMyPokemons,
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonProfilePage);