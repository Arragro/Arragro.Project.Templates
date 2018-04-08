import * as React from 'react'

export interface IButtonClickerProps {
    startNumber?: number
    history: any
}

export interface IButtonClickerState {
    counter: number
}

export default class ButtonClicker extends React.Component<IButtonClickerProps, IButtonClickerState> {
    constructor (props: IButtonClickerProps) {
        super(props)

        this.state = {
            counter: props.startNumber === undefined ? 0 : props.startNumber
        }
    }

    public componentWillReceiveProps (nextProps: IButtonClickerProps) {
        if (this.props.startNumber !== nextProps.startNumber) {
            this.setState({
                ...this.state,
                counter: nextProps.startNumber === undefined ? 0 : nextProps.startNumber
            })
        }
    }

    public render () {
        return <div>
                <h3>Hello, {this.state.counter}</h3>
                <button onClick={this.buttonClick.bind(this)}>Click Me!</button>
                <br />
                <button onClick={this.redirect.bind(this)}>Test!!!</button>
            </div>
    }

    private buttonClick () {
        this.setState(state => ({
            ...state,
            counter: this.state.counter + 1
        }), () => {
            console.log(this.state.counter)
        })
    }

    private redirect () {
        this.props.history.push('/test')
    }
}
