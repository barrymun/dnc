import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from "../_constants";
import {Main} from '../'

const visualizerPublicRoutes = thisProps => {
    return (
        <Switch>
            <Route
                exact
                path={routes.GAME}
                render={props => (
                    <Main
                        {...props}
                        {...thisProps}
                    />
                )}
            />
        </Switch>
    );
};
export default visualizerPublicRoutes;