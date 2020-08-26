import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import DraggableArea from "./components/DraggableArea";
import rootReducer from './store/reducers';
import logger from './store/middlewares/logger';
// import Testy from './testy';

const composeEnheancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnheancers(applyMiddleware(logger, thunk)));

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <DraggableArea />
                {/* <Testy /> */}
            </Provider>
        );
    };
};

export default App;