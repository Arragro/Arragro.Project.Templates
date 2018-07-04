import { TodoState } from 'redux/state'
import { TodoActions as actions } from './actions'
import { TodoService } from './serviceActions'

const initialState: TodoState = {
    isLoading: false,
    todoModels: []
}

export const TodoReducer = (state = initialState, action: any) => {
    switch (action.type) {
    case TodoService.Type.GET_ALL_TODOS_SUCCESS:
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
    case actions.Type.ADD_TODO:
        debugger
        if (action.payload && action.payload) {
            return {
                ...state,
                todoModels: state.todoModels.concat({
                    id: state.todoModels.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
                    completed: false,
                    text: action.payload
                })
            }
        } else {
            return state
        }
    case actions.Type.DELETE_TODO:
        return {
            ...state,
            todoModels: state.todoModels.filter((todo) => todo.id !== (action.payload as any))
        }
    case actions.Type.EDIT_TODO:
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
    case actions.Type.COMPLETE_TODO:
        return {
            ...state,
            todoModels: state.todoModels.map(
                (todo) => (todo.id === (action.payload as any) ? { ...todo, completed: !todo.completed } : todo)
            )
        }
    case actions.Type.COMPLETE_ALL: {
        const todoModels = state.todoModels.map((todo) => ({ ...todo, completed: true }))
        return {
            ...state,
            todoModels
        }
    }
    case actions.Type.CLEAR_COMPLETED: {
        debugger
        const todoModels = state.todoModels.filter((todo) => todo.completed === false)
        return {
            ...state,
            todoModels
        }
    }
    default:
        return state
    }
}
