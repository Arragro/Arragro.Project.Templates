import { action } from 'typesafe-actions'
import { Dispatch } from 'redux'
import { TodoModel } from '@models/index'
import HttpUtils from '@utils/httpUtils'

export namespace TodoService {
    export enum Type {
        GET_ALL_TODOS_START = 'GET_ALL_TODOS_START',
        GET_ALL_TODOS_SUCCESS = 'GET_ALL_TODOS_SUCCESS'
    }

    const getAllAction = () => action(Type.GET_ALL_TODOS_START)
    const getAllSuccessAction = (todos: Array<TodoModel>) => action(Type.GET_ALL_TODOS_SUCCESS, todos)

    export const getAll = (): any => {
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

    export const dispatchServices = (dispatch: Dispatch): TodoServiceConnectedDispatch => {
        return {
            getAll: () => dispatch(TodoService.getAll())
        }
    }
}
