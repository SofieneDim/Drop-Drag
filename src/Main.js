import React from 'react';

import App from './components/App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './store/reducers';
import logger from './store/middlewares/logger';

const composeEnheancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnheancers(applyMiddleware(logger, thunk)));

class Main extends React.Component {

    

    render() {

        return (

            <Provider store={store}>
                <App />
            </Provider>
        );
    };
};

export default Main;