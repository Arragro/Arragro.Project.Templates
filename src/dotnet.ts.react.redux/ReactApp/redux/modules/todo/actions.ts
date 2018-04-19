// import { addTask } from 'domain-task'
import { createAction } from 'redux-actions'
import { TodoModel } from 'models'

export namespace TodoActions {
    export enum Type {
        GET_ALL_TODOS_START = 'GET_ALL_TODOS_START',
        GET_ALL_TODOS_SUCCESS = 'GET_ALL_TODOS_SUCCESS',
        ADD_TODO = 'ADD_TODO',
        EDIT_TODO = 'EDIT_TODO',
        DELETE_TODO = 'DELETE_TODO',
        COMPLETE_TODO = 'COMPLETE_TODO',
        COMPLETE_ALL = 'COMPLETE_ALL',
        CLEAR_COMPLETED_START = 'CLEAR_COMPLETED_START',
        CLEAR_COMPLETED_SUCCESS = 'CLEAR_COMPLETED_SUCCESS'
    }

    export const getAll = createAction(Type.GET_ALL_TODOS_START)
    export const getAllSuccess = createAction(Type.GET_ALL_TODOS_SUCCESS, (todos: Array<TodoModel>) => todos)
    export const addTodo = createAction<PartialPick<TodoModel, 'text'>>(Type.ADD_TODO)
    export const editTodo = createAction<Partial<TodoModel>>(Type.EDIT_TODO)
    export const deleteTodo = createAction<TodoModel['id']>(Type.DELETE_TODO)
    export const completeTodo = createAction<TodoModel['id']>(Type.COMPLETE_TODO)
    export const completeAll = createAction(Type.COMPLETE_ALL)
    export const clearCompleted = createAction(Type.CLEAR_COMPLETED_SUCCESS)
    export const clearCompletedSuccess = createAction(Type.CLEAR_COMPLETED_SUCCESS)

    // export const addTodo = createAction(Type.ADD_TODO, (todo: TodoModel) => todo)
    // export const editTodo = createAction(Type.EDIT_TODO, (todo: TodoModel) => todo)
    // export const deleteTodo = createAction(Type.DELETE_TODO, (todo: TodoModel) => todo)
    // export const completeTodo = createAction(Type.COMPLETE_TODO, (todo: TodoModel) => todo)
    // export const completeAll = createAction(Type.COMPLETE_ALL, (todos: Array<TodoModel>) => todos)
    // export const clearCompleted = createAction(Type.CLEAR_COMPLETED_START)
    // export const clearCompletedSuccess = createAction(Type.CLEAR_COMPLETED_SUCCESS, (todos: Array<TodoModel>) => todos)

    // const actionCreators = {
    //     getAll: (): AppThunkAction<TodoModel[]> => (dispatch, state) => {

    //         let fetchTask = HttpUtils.get<TodoModel[]>('/api/todo')
    //             .then((data: IFetchResult<TodoModel[]>) => {
    //                 dispatch(getAll(data.data || []))
    //             })
    //             .catch((error: Error) => {
    //                 console.log('Todo GetAll Failed', error)
    //             })

    //         addTask(fetchTask)
    //     }
    // }
}

export type TodoActions = Omit<typeof TodoActions, 'Type'>
