import * as React from 'react'

import ButtonClicker from '../components/ButtonClicker'

export default class HomePage extends React.Component<any, any> {
    constructor (props: any) {
        super(props)
    }

    public render () {
        return <div>
            <ButtonClicker startNumber={0} history={this.props.history} />
        </div>
    }
}
