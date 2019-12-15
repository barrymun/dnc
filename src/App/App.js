import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router-dom';

import {history, store} from '../_helpers';
import homePublicRoutes from '../Home/_routes/public.routes';
import gamePublicRoutes from '../Game/_routes/public.routes';
import {Base} from "../_components";
import gameActions from "../_actions/game.actions";

import './App.css';

const interval = 1000;  // 1 second

class App extends Base {

    componentDidMount() {
        window.setInterval(this.updateResources, interval);
    }

    updateResources = () => {
        store.dispatch(gameActions.regenGold());
        store.dispatch(gameActions.regenMana());
        store.dispatch(gameActions.regenTroops());
    };

    render() {
        return (
            <Router history={history}>
                {homePublicRoutes(this.props)}
                {gamePublicRoutes(this.props)}
            </Router>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.game,
    };
};

const c = connect(mapStateToProps)(App);
export {c as App};
