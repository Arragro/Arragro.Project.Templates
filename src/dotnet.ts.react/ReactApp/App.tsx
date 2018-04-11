import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from 'app/containers/Layout'
import HomePage from 'app/containers/HomePage'
import AnotherButtonClicker from 'app/containers/AnotherButtonClicker'
import Formsy from 'app/containers/Formsy'

const test = () => <h3>Test!!!</h3>

export default class App extends React.Component {
    constructor (props: any) {
        super(props)
    }

    public render () {
        return <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/another-button-clicker' component={AnotherButtonClicker} />
                    <Route path='/another-button-clicker/:startNumber' component={AnotherButtonClicker} />
                    <Route exact path='/test' component={test} />
                    <Route exact path='/formsy' component={Formsy} />
                </Switch>
            </Layout>
        </Router>
    }
}
