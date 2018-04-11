import 'bootstrap/dist/css/bootstrap.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import './scss/site.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import { AppContainer } from 'react-hot-loader'
import { configureStore } from './redux/store'
import { RootState } from 'redux/reducers'
import { App } from './app'

// prepare store
const initialState = (window as any).initialReduxState as RootState
const history = createBrowserHistory()
const store = configureStore(history, true, initialState)
const rootEl = document.getElementById('react-app')

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        rootEl
    )
}

render(App)

// Hot Module Replacement API
declare let module: { hot: any }

if (module.hot) {
    module.hot.accept('./app', () => {
        render(App)
    })
}
