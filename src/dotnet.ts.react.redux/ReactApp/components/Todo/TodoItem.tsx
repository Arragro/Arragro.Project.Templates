import * as React from 'react'
import * as classNames from 'classnames'
import { TodoModel } from '@models/index'
import { TodoActions } from '@redux/modules/todo'
import { TodoTextInput } from './TodoTextInput'

export namespace TodoItem {
    export interface Props {
        todo: TodoModel
        editTodo: typeof TodoActions.editTodo
        deleteTodo: typeof TodoActions.deleteTodo
        completeTodo: typeof TodoActions.completeTodo
    }

    export interface State {
        editing: boolean
    }
}

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {
    constructor (props: TodoItem.Props, context?: any) {
        super(props, context)
        this.state = { editing: false }
    }

    handleDoubleClick () {
        this.setState({ editing: true })
    }

    handleSave (id: number, text: string) {
        if (text.length === 0) {
            this.props.deleteTodo(id)
        } else {
            this.props.editTodo({ id, text })
        }
        this.setState({ editing: false })
    }

    render () {
        const { todo, completeTodo, deleteTodo } = this.props

        let element
        if (this.state.editing) {
            element = (
                <TodoTextInput
                    text={todo.text}
                    editing={this.state.editing}
                    onSave={(text) => todo.id && this.handleSave(todo.id, text)}
                />
            )
        } else {
            element = (
                <div className='view'>
                    <input
                        className='toggle'
                        type='checkbox'
                        checked={todo.completed}
                        onChange={() => todo.id && completeTodo(todo.id)}
                    />
                    <label onDoubleClick={() => this.handleDoubleClick()}>{todo.text}</label>
                    <button
                        className='destroy'
                        onClick={() => {
                            if (todo.id) deleteTodo(todo.id)
                        }}
                    />
                </div>
            )
        }

        // TODO: compose
        const classes = classNames({
            ['completed']: todo.completed,
            ['editing']: this.state.editing,
            ['todo-item-normal']: !this.state.editing
        })

        return <li className={classes}>{element}</li>
    }
}
