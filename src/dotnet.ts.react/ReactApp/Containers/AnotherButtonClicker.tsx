import * as React from 'react'
import { Link } from 'react-router-dom'

import ButtonClicker from '../Components/ButtonClicker'

export default class AnotherButtonClicker extends React.Component<any, any> {
    constructor (props: any) {
        super(props)

        this.state = {
            startNumber: this.parseStartNumber()
        }
    }

    parseStartNumber (nextProps: any = null): number {
        debugger
        let currentStartNumber: number = 10
        let newStartNumber: number = 10

        if (this.props.match.params.startNumber !== undefined) {
            currentStartNumber = parseInt(this.props.match.params.startNumber, 10)
            if (isNaN(currentStartNumber)) {
                currentStartNumber = 10
            }
        }

        if (nextProps !== null && nextProps.match.params.startNumber !== undefined) {
            newStartNumber = parseInt(nextProps.match.params.startNumber, 10)
            if (isNaN(newStartNumber)) {
                newStartNumber = 10
            }
        } else {
            newStartNumber = 10
        }

        if (nextProps !== null && currentStartNumber !== newStartNumber) {
            return newStartNumber
        }

        return currentStartNumber
    }

    componentWillReceiveProps (nextProps: any) {
        this.setState({
            ...this.state,
            startNumber: this.parseStartNumber(nextProps)
        })
    }

    public render () {
        return <div>
            <ButtonClicker startNumber={this.state.startNumber} history={this.props.history} />
            <br />
            <Link to='/another-button-clicker/50'>Another 50</Link>
            <br />
            <Link to='/'>Home</Link>
        </div>
    }
}
