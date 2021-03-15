import React, { Component } from 'react';
import PokemonListItem from '../pokemon-list-item';
//`npm i --save-dev @types/react-redux` для своего webpack
import { connect } from 'react-redux';
import { pokemonListLoading, clearList, addToMyPokemons, fetchPageData } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import {AppStateType, PokemonItemType, CaughtPokemonItemType} from '../../types/types';

import './pokemon-list.css';


type  MapDispatchToPropsType = {
    pokemonListLoading:() => void
    clearList:() => void
    addToMyPokemons: (caughtTime:string, id:number) => void

    fetchPageData:( page: number  )=> void
}

type MapStateToPropsType = {
    pokemonItems: Array<PokemonItemType>
    caughtPokemons: Array<CaughtPokemonItemType>
    isLoading: boolean
    error: boolean
    currentPage: number
    startPage:number
    pageLoading: boolean
    style: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType



class PokemonList extends Component<PropsType> {

    myElemRef = React.createRef<HTMLLIElement>();
    
    myObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            this.props.pokemonListLoading();
            this.props.fetchPageData(this.props.currentPage);
        }
    });

    componentDidMount() {
        this.props.fetchPageData(this.props.startPage);
    }

    componentDidUpdate() {
        if (this.myElemRef.current !== null) {
            this.myObserver.observe(this.myElemRef.current);
        }
    }

    componentWillUnmount() {
        this.myObserver.disconnect();
        this.props.clearList();
    }

    render() {

        const { pokemonItems, caughtPokemons, isLoading, error, addToMyPokemons, pageLoading, style } = this.props;

        if (error) {
            return <Error />
        }

        if (isLoading) {
            return <Spinner />
        }


        return (
            <ul className="pokemon__list">
                {
                    pokemonItems.map((pokemon, index) => {
                        let isCaught = caughtPokemons.findIndex(item => +item.id === +pokemon.id);
                        let isDisabled = isCaught !== -1 ? true : false;
                        return (
                            <li className="pokemon-list__item" key={pokemon.id} ref={pokemonItems.length === index + 1 ? this.myElemRef : null}>
                                <PokemonListItem
                                    pokemonListItem={pokemon}
                                    isDisabled={isDisabled}
                                    style={style}
                                    onAddToMyPokemons={(caughtTime:string) => addToMyPokemons(caughtTime, pokemon.id)} />
                            </li>
                        )
                    })
                }
                {pageLoading ? <div className="pokemon-list__item"><Spinner /></div> : null}
            </ul>
        )
    }
};

const mapStateToProps = (state: AppStateType) => {
    return {
        pokemonItems: state.pokemonList,
        caughtPokemons: state.caughtPokemons,
        isLoading: state.isLoading,
        error: state.error,
        currentPage: state.currentPage,
        startPage: state.startPage,
        pageLoading: state.pageLoading,
        style: state.styles.list
    }
}

const mapDispatchToProps = {
    pokemonListLoading,
    clearList,
    addToMyPokemons,
    fetchPageData,
};


export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
