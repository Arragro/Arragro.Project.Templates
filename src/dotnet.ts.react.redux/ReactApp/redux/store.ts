import { Store, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'
import { History } from 'history'
import { loggerMiddleware } from 'redux/middleware'
import { RootState, rootReducer } from 'redux/reducers'

export function configureStore (history: History, logging: boolean = false, initialState?: RootState): Store<RootState> {
    let middleware = applyMiddleware(thunk, loggerMiddleware(logging), routerMiddleware(history))

    if (process.env.NODE_ENV !== 'production') {
        middleware = composeWithDevTools(middleware)
    }

    const store = createStore(rootReducer as any, initialState, middleware) as Store<RootState>

    if (module.hot) {
        module.hot.accept('redux/reducers', () => {
            const nextReducer = require('redux/reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
