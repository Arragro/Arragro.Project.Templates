import './scss/site.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {AppContainer} from "react-hot-loader";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'

const rootEl = document.getElementById("react-app");

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootEl
)


// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./App", () => {
        const NewApp = require("./App").default;

        ReactDOM.render (
            <AppContainer>
                <App />
            </AppContainer>,
            rootEl
        );
    });
}