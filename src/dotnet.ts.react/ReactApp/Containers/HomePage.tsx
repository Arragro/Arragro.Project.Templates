import * as React from 'react'
import { Link } from 'react-router-dom'

import ButtonClicker from '../Components/ButtonClicker'

export default class HomePage extends React.Component<any, any> {
    constructor (props: any) {
        super (props)
    }

    public render () {
        return <div>
            <ButtonClicker startNumber={0} history={this.props.history} />
            <br />
            <Link to='/another-button-clicker'>Another</Link>
        </div>
    }
}