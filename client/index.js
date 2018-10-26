// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'

import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Main from './containers/Main';
import DisplayHotels from './containers/DisplayHotels';
import CustomTheme from './styles/custom-theme';
import configureStore from './configureStore';
import 'sanitize.css/sanitize.css';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

const muiTheme = getMuiTheme(CustomTheme);

const MOUNT_NODE = document.getElementById('sandman');
const render = () => {

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/hotels" component={DisplayHotels} />
                    </Switch>
                </MuiThemeProvider>
            </ConnectedRouter>
        </Provider>
        ,
        MOUNT_NODE
    );
};
if (module.hot) {
    module.hot.accept();
    render()
} else {
    render()
}
