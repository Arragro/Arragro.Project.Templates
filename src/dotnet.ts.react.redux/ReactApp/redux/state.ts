import { TodoModel } from '@models/index'
import { RouterState } from 'react-router-redux'

export interface RootState {
    todoState: RootState.TodoState
    router: RouterState
}

export namespace RootState {
    export type TodoState = {
        isLoading: boolean
        todoModels: TodoModel[]
    }
}
