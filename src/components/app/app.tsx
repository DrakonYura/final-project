import React from 'react';
import AppHeader from '../app-header';
import { HomePage, MyPokemons, PokemonProfilePage } from '../pages';
import { Route, Switch } from 'react-router-dom';



const App = () => {
    return (

        <div>
            <AppHeader />
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/mypokemons' exact component={MyPokemons} />
                <Route path='/profile/:id' exact component={PokemonProfilePage} />
            </Switch>
        </div>
    )
}

export default App;
