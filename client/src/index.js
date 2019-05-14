import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router } from "react-router-dom";
import {createBrowserHistory} from "history";
import promise from "redux-promise";
import registerServiceWorker from './registerServiceWorker';

import reducers from "./reducers";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const history = createBrowserHistory();


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>, document.querySelector(".container") );
registerServiceWorker();
