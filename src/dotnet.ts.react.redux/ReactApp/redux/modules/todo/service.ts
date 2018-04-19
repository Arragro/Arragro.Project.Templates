import { Dispatch } from 'redux'
import { TodoActions } from './actions'
import { RootState } from 'redux/state'
import { TodoModel } from '@models/index'
import HttpUtils from '@utils/httpUtils'

export namespace TodoService {
    export interface TodoServiceConnectedDispatch {
        getAll (): void
    }

    export const getAll = () => {
        return function (dispatch: (action: any) => void) {
            dispatch(TodoActions.getAll())

            HttpUtils.get<Array<TodoModel>>('/api/todo')
                .then((response) => {
                    if (!response.ok) {
                        console.log('TodoService.getAll Failed', response)
                    }
                    dispatch(TodoActions.getAllSuccess(response.data || []))
                })
                .catch((err) => {
                    console.log('TodoService.getAll Failed', err)
                })
        }
    }

    export const dispatchServices = (dispatch: Dispatch<RootState>): TodoServiceConnectedDispatch => {
        return {
            getAll: () => dispatch(TodoService.getAll())
        }
    }
}
