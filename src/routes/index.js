// Modules
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Components
import HomeRoute from './home';
import PublishRoute from './publish';
import ModerateRoute from './moderate';

export default function Routes() {

    return (
        <Router>
            <Switch>
                <Route path="/publish" component={PublishRoute}/>
                <Route path="/moderate" component={ModerateRoute}/>
                <Route component={HomeRoute}/>
            </Switch>
        </Router>
    )
}