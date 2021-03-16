import React, {Component} from 'react';
import { connect } from 'react-redux';

import PokemonListItem from '../pokemon-list-item';


import { clearList} from '../../actions';
import {fetchMyPokemons} from '../../service';

import {AppStateType, CaughtPokemonItemType} from '../../types/types';

import '../pokemon-list/pokemon-list.css'


type MapStateToPropsType = {
    caughtPokemons: Array<CaughtPokemonItemType>
    style: string
}

type  MapDispatchToPropsType = {
    clearList:() => void

    fetchMyPokemons:() => void

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType


class MyPokemons extends Component<PropsType>{

    componentDidMount(){
        this.props.fetchMyPokemons();
    }

    componentWillUnmount() {
        this.props.clearList();
    }
    render(){
        const {caughtPokemons, style} = this.props;

        
        if (caughtPokemons.length === 0) {
            return <Empty />
        }

        return (
            <ul className="pokemon__list">
                {
                    caughtPokemons.map(pokemon => {
                        return (
                            <li className="pokemon-list__item" key={+pokemon.id}>
                                <PokemonListItem
                                pokemonListItem={pokemon}
                                isDisabled={true}
                                style={style}
                                time={pokemon.time} />
                            </li>
                        )
                    })
                }
            </ul>   
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        caughtPokemons: state.caughtPokemons,
        style: state.styles.myPokemons,
    }
}

const mapDispatchToProps = {
    clearList,
    fetchMyPokemons
};

const Empty = () => {


    return (
        <div style={{
            textAlign: 'center',
            fontSize: '50px'
        }}>
            Please Сatch the Pokemon
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemons);