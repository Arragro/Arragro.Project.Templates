import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { TodoActions, TodoService } from '@redux/modules/todo'
import { RootState } from '@redux/reducers'
import { TodoModel } from '@models/index'
import { omit } from '@utils/index'
import { Header, TodoList, Footer } from '@components/index'

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
)

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
    [TodoModel.Filter.SHOW_ALL]: () => true,
    [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
    [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
}

export namespace Todos {
    export interface Props extends RouteComponentProps<void> {
        todoState: RootState.TodoState
        actions: TodoActions
        filter: TodoModel.Filter
        serviceActions: TodoService.TodoServiceConnectedDispatch
    }
}

export class Todos extends React.Component<Todos.Props> {
    static defaultProps: Partial<Todos.Props> = {
        filter: TodoModel.Filter.SHOW_ALL
    }

    constructor (props: Todos.Props, context?: any) {
        super(props, context)
        this.handleClearCompleted = this.handleClearCompleted.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    componentWillMount () {
        this.props.serviceActions.getAll()
    }

    handleClearCompleted (): void {
        const hasCompletedTodo = this.props.todoState.todoModels.some((todo) => todo.completed || false)
        if (hasCompletedTodo) {
            this.props.actions.clearCompleted()
        }
    }

    handleFilterChange (filter: TodoModel.Filter): void {
        this.props.history.push(`#${filter}`)
    }

    render () {
        const { todoState, actions, filter } = this.props
        const todos = todoState.todoModels
        const activeCount = todos.length - todos.filter((todo) => todo.completed).length
        const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos
        const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)

        return (
            <div className='todocontainer'>
                <div className='normal'>
                    <Header addTodo={actions.addTodo} />
                    <TodoList todos={filteredTodos} actions={actions} />
                    <Footer
                        filter={filter}
                        activeCount={activeCount}
                        completedCount={completedCount}
                        onClickClearCompleted={this.handleClearCompleted}
                        onClickFilter={this.handleFilterChange}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): Pick<Todos.Props, 'todoState' | 'filter'> => {
    const hash = state.router.location && state.router.location.hash.replace('#', '')
    const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL
    const props = { todoState: state.todoState, filter }
    return props
}

const mapDispatchToProps = (dispatch: Dispatch): Pick<Todos.Props, 'actions' | 'serviceActions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
    serviceActions: TodoService.dispatchServices(dispatch)
})

const connectedTodos = connect(mapStateToProps, mapDispatchToProps)(Todos)
export default connectedTodos
