import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Consumer>
        {({ authenticatedUser }) => (
            <Route render={props =>
                (authenticatedUser !== null) ?
                    <Component {...props} /> :
                    <Redirect to="/sign-in" />}
                {...rest} />)}
    </Consumer>
)

export default PrivateRoute;