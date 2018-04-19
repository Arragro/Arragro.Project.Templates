import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { RootState } from '@redux/state'
import { TodoModel } from '@models/index'
import HttpUtils from '@utils/httpUtils'

export namespace TodoService {
    export enum Type {
        GET_ALL_TODOS_START = 'GET_ALL_TODOS_START',
        GET_ALL_TODOS_SUCCESS = 'GET_ALL_TODOS_SUCCESS'
    }

    const getAllAction = createAction(Type.GET_ALL_TODOS_START)
    const getAllSuccessAction = createAction(Type.GET_ALL_TODOS_SUCCESS, (todos: Array<TodoModel>) => todos)

    export const getAll = () => {
        return function (dispatch: (action: any) => void) {
            dispatch(getAllAction())

            HttpUtils.get<Array<TodoModel>>('/api/todo')
                .then((response) => {
                    if (!response.ok) {
                        console.log('TodoService.getAll Failed', response)
                    }
                    dispatch(getAllSuccessAction(response.data || []))
                })
                .catch((err) => {
                    console.log('TodoService.getAll Failed', err)
                })
        }
    }

    export interface TodoServiceConnectedDispatch {
        getAll (): void
    }

    export const dispatchServices = (dispatch: Dispatch<RootState>): TodoServiceConnectedDispatch => {
        return {
            getAll: () => dispatch(TodoService.getAll())
        }
    }
}
