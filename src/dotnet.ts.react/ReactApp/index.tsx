import './scss/site.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './app'

const rootEl = document.getElementById('react-app')

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEl
    )
}

render(App)

// Hot Module Replacement API
declare let module: { hot: any }

if (module.hot) {
  module.hot.accept('./app', () => {
      //const NewApp = require<{default: typeof App}>('./app').default
      render(App)
  })
}
