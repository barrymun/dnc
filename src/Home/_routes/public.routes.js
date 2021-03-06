import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from "../_constants";
import {Root} from '../'

const visualizerPublicRoutes = thisProps => {
    return (
        <Switch>
            <Route
                exact
                path={routes.ROOT}
                render={props => (
                    <Root
                        {...props}
                        {...thisProps}
                    />
                )}
            />
        </Switch>
    );
};
export default visualizerPublicRoutes;