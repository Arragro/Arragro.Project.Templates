import { TodoModel } from '@models/index'
import { RouterState } from 'react-router-redux'

export type RootState = Readonly<{
    todoState: TodoState
    router: RouterState
}>

export type TodoState = {
    isLoading: Readonly<boolean>
    todoModels: ReadonlyArray<TodoModel>
}
