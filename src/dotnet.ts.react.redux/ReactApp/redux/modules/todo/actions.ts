// import { addTask } from 'domain-task'
import { action } from 'typesafe-actions'

export namespace TodoActions {
    export enum Type {
        ADD_TODO = 'ADD_TODO',
        EDIT_TODO = 'EDIT_TODO',
        DELETE_TODO = 'DELETE_TODO',
        COMPLETE_TODO = 'COMPLETE_TODO',
        COMPLETE_ALL = 'COMPLETE_ALL',
        CLEAR_COMPLETED = 'CLEAR_COMPLETED'
    }

    export const addTodo = (text: string) => action(Type.ADD_TODO, text)
    export const editTodo = (id: number, text: string) => action(Type.EDIT_TODO, { id, text })
    export const deleteTodo = (id: number) => action(Type.DELETE_TODO, id)
    export const completeTodo = (id: number) => action(Type.COMPLETE_TODO, id)
    export const completeAll = () => action(Type.COMPLETE_ALL)
    export const clearCompleted = () => action(Type.CLEAR_COMPLETED)
}

export type TodoActions = Omit<typeof TodoActions, 'Type'>
