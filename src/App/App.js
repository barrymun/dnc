import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router-dom';

import {history} from '../_helpers';
import homePublicRoutes from '../Home/_routes/public.routes';
import gamePublicRoutes from '../Game/_routes/public.routes';

import './App.css';

class App extends React.Component {
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
    const {
        map,
    } = state;

    return {
        map,
    };
};

const c = connect(mapStateToProps)(App);
export {c as App};
