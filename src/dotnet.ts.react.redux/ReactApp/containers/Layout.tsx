import * as React from 'react'

import Alert from '@components/Alert'
import NavBar from '@components/NavBar'

export interface ILayoutProps {
    children: any
}

export default class Layout extends React.Component<ILayoutProps, any> {
    constructor (props: ILayoutProps) {
        super(props)
        this.state = {}
    }

    public render () {
        const { children } = this.props

        return (
            <div>
                <Alert stack={{ limit: 10 }} position='bottom-right' effect='bouncyflip' timeout={3000} />
                <NavBar />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='app-container'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
