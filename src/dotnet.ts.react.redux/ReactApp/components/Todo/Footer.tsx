import * as React from 'react'
import * as classNames from 'classnames'
import { TodoModel } from '@models/index'

export const FILTER_TITLES = {
    [TodoModel.Filter.SHOW_ALL]: 'All',
    [TodoModel.Filter.SHOW_ACTIVE]: 'Active',
    [TodoModel.Filter.SHOW_COMPLETED]: 'Completed'
}

export namespace Footer {
    export interface Props {
        filter: TodoModel.Filter
        activeCount?: number
        completedCount?: number
        onClickFilter: (filter: TodoModel.Filter) => any
        onClickClearCompleted: () => any
    }
}

export class Footer extends React.Component<Footer.Props> {
    static defaultProps: Partial<Footer.Props> = {
        activeCount: 0,
        completedCount: 0
    }

    renderTodoCount (): JSX.Element {
        const { activeCount } = this.props
        const itemWord = activeCount === 1 ? 'item' : 'items'

        return (
        <span className='count'>
            <strong>{activeCount || 'No'}</strong> {itemWord} left
        </span>
        )
    }

    renderFilterLink (filter: TodoModel.Filter): JSX.Element {
        const { filter: selectedFilter, onClickFilter } = this.props

        return (
        <a
            className={classNames({ ['selected']: filter === selectedFilter })}
            style={{ cursor: 'pointer' }}
            onClick={() => onClickFilter(filter)}
            children={FILTER_TITLES[filter]}
        />
        )
    }

    renderClearButton (): JSX.Element | void {
        const { completedCount, onClickClearCompleted } = this.props
        if (completedCount! > 0) {
            return (
                <button
                    className='clearCompleted'
                    onClick={onClickClearCompleted}
                    children={'Clear completed'}
                />
            )
        }
    }

    render () {
        return (
            <footer className='footer-normal'>
                {this.renderTodoCount()}
                <ul className='filters'>
                    {(Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map((key) => (
                    <li key={key} children={this.renderFilterLink(TodoModel.Filter[key])} />
                    ))}
                </ul>
                {this.renderClearButton()}
            </footer>
        )
    }
}
