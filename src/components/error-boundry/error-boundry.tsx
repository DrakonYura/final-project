import React, { Component } from 'react';
import Error from '../error';
import { connect } from 'react-redux';
import { pokemonListError } from '../../actions';

import {AppStateType} from '../../types/types';

type MapStateToPropsType = {
    error: boolean
}

type MapDispatchToPropsType = {
    pokemonListError: () => void
}

type OwnProps = {
    children: JSX.Element;
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

class ErrorBoundry extends Component<PropsType> {


    componentDidCatch() {
        this.props.pokemonListError();
    }

    render() {
        if (this.props.error) {
            return <Error />
        }

        return this.props.children;
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = {
    pokemonListError
};


export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundry);