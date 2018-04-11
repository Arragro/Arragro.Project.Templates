import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout, HomePage, AnotherButtonClicker, Todos, Formsy } from './containers'

export const App = () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/todos' component={Todos} />
            <Route exact path='/another-button-clicker' component={AnotherButtonClicker} />
            <Route path='/another-button-clicker/:startNumber' component={AnotherButtonClicker} />
            <Route exact path='/formsy' component={Formsy} />
        </Switch>
    </Layout>
)
