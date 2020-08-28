import React from 'react';

import App from './components/App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import rootReducer from './store/reducers';
import logger from './store/middlewares/logger';
import ResultPage from './resultPage';

const composeEnheancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnheancers(applyMiddleware(logger, thunk)));

class Main extends React.Component {

    state = {
        links: {
            "link_1": ["5"],
            "link_2": ["1"],
            "link_3": ["5"],
            "link_4": ["6", "2"],
            "link_5": ["3", "1", "4"],
            "link_6": ["1"],
        }
    };

    render() {
        const result = Object.keys(this.state.links).map(linkId => {
            const props = this.state.links[linkId].map(link => "link_" + link);
            return <Route path={"/" + linkId} key={linkId} exact render={() => <ResultPage {...props} />} />
        });
        const firstDistination = Object.keys(this.state.links)[0];
        return (
            <Provider store={store}>
                <Switch>
                    <Route path="/" exact component={App} />
                    {result}
                    <Route path="/result" exact render={() =>
                        <ResultPage
                            firstDistination={firstDistination}
                        />
                    } />
                </Switch>
            </Provider>
        );
    };
};

export default Main;