import React from 'react';
import { Link } from 'react-router-dom';


import art from '../../img/header/pokemonArt.jpg';

import './app-header.css';

const AppHeader = () => {
    return (
        <header>
            <img alt="pokemon art" className="header__img" src={art}></img>
            <nav>
                <Link to={'/'} className="header__link">Home</Link>
                <Link to={'/mypokemons'} className="header__link">My Pokemons</Link>
            </nav>
        </header>

    )
};

export default AppHeader;

