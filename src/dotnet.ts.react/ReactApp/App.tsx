import './scss/site.scss'

import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './containers/HomePage'
import AnotherButtonClicker from './containers/AnotherButtonClicker'

const test = () => <h3>Test!!!</h3>

export default class App extends React.Component {
    constructor (props: any) {
        super(props)
    }

    public render () {
        return <Router>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/another-button-clicker' component={AnotherButtonClicker} />
                <Route path='/another-button-clicker/:startNumber' component={AnotherButtonClicker} />
                <Route exact path='/test' component={test} />
            </Switch>
        </Router>
    }
}
