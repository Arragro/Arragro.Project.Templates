import { handleActions } from 'redux-actions'
import { RootState } from 'redux/state'
import { TodoActions } from './actions'
import { TodoService } from './serviceActions'
import { TodoModel } from '@models/index'

const initialState: RootState.TodoState = {
    isLoading: false,
    todoModels: []
}

export const TodoReducer = handleActions<RootState.TodoState, TodoModel & TodoModel[]>({
    [TodoService.Type.GET_ALL_TODOS_SUCCESS]: (state, action) => {
        if (action.payload !== undefined) {
            return {
                isLoading: false,
                todoModels: action.payload
            }
        } else {
            return {
                isLoading: false,
                todoModels: []
            }
        }
    },
    [TodoActions.Type.ADD_TODO]: (state, action) => {
        if (action.payload && action.payload.text) {
            return {
                ...state,
                todoModels: state.todoModels.concat({
                    id: state.todoModels.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
                    completed: false,
                    text: action.payload.text
                })
            }
        } else {
            return state
        }
    },
    [TodoActions.Type.DELETE_TODO]: (state, action) => {
        return {
            ...state,
            todoModels: state.todoModels.filter((todo) => todo.id !== (action.payload as any))
        }
    },
    [TodoActions.Type.EDIT_TODO]: (state, action) => {
        return {
            ...state,
            todoModels: state.todoModels.map((todo) => {
                if (!todo || !action || !action.payload) {
                    return todo
                } else {
                    return (todo.id || 0) === action.payload.id
                        ? { ...todo, text: action.payload.text }
                        : todo
                }
            })
        }
    },
    [TodoActions.Type.COMPLETE_TODO]: (state, action) => {
        return {
            ...state,
            todoModels: state.todoModels.map(
                (todo) => (todo.id === (action.payload as any) ? { ...todo, completed: !todo.completed } : todo)
            )
        }
    },
    [TodoActions.Type.COMPLETE_ALL]: (state, action) => {
        const todoModels = state.todoModels.map((todo) => ({ ...todo, completed: true }))
        return {
            ...state,
            todoModels
        }
    },
    [TodoActions.Type.CLEAR_COMPLETED]: (state, action) => {
        debugger
        const todoModels = state.todoModels.filter((todo) => todo.completed === false)
        return {
            ...state,
            todoModels
        }
    }
}, initialState)
