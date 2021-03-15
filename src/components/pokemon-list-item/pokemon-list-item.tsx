import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {PokemonItemType, CaughtPokemonItemType} from '../../types/types';

import './pokemon-list-item.css';

import pokeball from '../../img/pokeball.png';

interface IProps extends RouteComponentProps {
    pokemonListItem: PokemonItemType | CaughtPokemonItemType 
    isDisabled : boolean
    time?: string
    onAddToMyPokemons?: (caughtTime:string) => void
    page?:string
    style:string
  }


const PokemonListItem: React.FC<IProps>  = ({ pokemonListItem, isDisabled, time, onAddToMyPokemons, history, page, style }) => {
    const { name, id } = pokemonListItem;


    let addComponent = null;

    if (page === 'profilePokemon') {
        addComponent = time ? <Status time={time} id={+id} /> : <Status id={+id} />
    }
    return (
        <>
            <div className={`${style}__block`} onClick={() => history.push(`/profile/${id}`)}>
                <img className={`${style}__img`} src={id < 721 ? `../../../pokemons/${id}.png` : pokeball} alt={name}></img>
                <div className={`${style}__name`}>{name}</div>
                {addComponent}
            </div>
            <Button isDisabled={isDisabled} onAddToMyPokemons={onAddToMyPokemons} style={style} />
        </>
    )
}

type ButtonType = {
    isDisabled:boolean
    style:string
    onAddToMyPokemons?: (caughtTime:string) => void
}

const Button = (props : ButtonType) => {
    return (
        <button disabled={props.isDisabled}
            onClick={(e) => {
                e.preventDefault();
                let caughtTime = new Date().toLocaleString();
                if(props.onAddToMyPokemons !== undefined){
                    props.onAddToMyPokemons(caughtTime);
                }
                
            }}
            className={`${props.style}__btn`}>Catch Me
        </button>
    )
}

type StatusType = {
    time?: string
    id: number
}
const Status = (props:StatusType) => {

    if (!props.time) {
        return (
            <div className="status__block">
                <p className="status__id">ID: {props.id}</p>
                <p className="status__title">Status:</p>
                <p className="status__text">I'm free! Catch ME!</p>
            </div>
        )
    }

    return (
        <div className="status__block">
            <p className="status__id">ID: {props.id}</p>
            <p className="status__title">Status:</p>
            <p className="status__text">You caught me</p>
            <p className="status__text">{props.time}</p>
        </div>
    )
}


export default withRouter(PokemonListItem);