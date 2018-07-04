import { Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { TodoActions } from '../modules/todo/actions'

export const todoApiMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
        (next: Dispatch) =>
            (action: any): any => {
                debugger
                switch (action.type) {
                case TodoActions.Type.CLEAR_COMPLETED:
                    Promise.resolve(console.log('!!! CLEAR START !!!'))
                        .then(() => dispatch(TodoActions.clearCompleted()))
                    break
                default:
                    return next(action)
                }
            }
