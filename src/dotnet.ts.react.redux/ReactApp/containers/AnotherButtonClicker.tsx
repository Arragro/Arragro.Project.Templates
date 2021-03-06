import * as React from 'react'

import ButtonClicker from '../components/ButtonClicker'

export default class AnotherButtonClicker extends React.Component<any, any> {
    constructor (props: any) {
        super(props)

        this.state = {
            startNumber: this.parseStartNumber()
        }
    }

    parseStartNumber (nextProps: any = null): number {
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
            <h1>Another Clicker</h1>
            <ButtonClicker startNumber={this.state.startNumber} history={this.props.history} />
        </div>
    }
}
