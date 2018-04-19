import { combineReducers, Reducer } from 'redux'
import { RootState } from './state'
import { TodoReducer } from './modules/todo'
import { routerReducer, RouterState } from 'react-router-redux'

export { RootState, RouterState }

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    todoState: TodoReducer,
    router: routerReducer
})
