import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';
// Components
import Router from './routes';
import MemberRoute from './routes/member';
import ModerateRoute from './routes/moderate';
// CSS
import './styles/App.css';
// Contracts ABIs
import BountyABI from './../build/contracts/Bounty.json'

const options = { contracts:[BountyABI] }
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const App = (
    <DrizzleContext.Provider drizzle={drizzle}>
        <BrowserRouter>
            <Switch>
                <Route path="/moderate" component={ModerateRoute}/>
                <Route path="/me" component={MemberRoute}/>
                <Route component={Router}/>
            </Switch>
        </BrowserRouter>
    </DrizzleContext.Provider>
)

ReactDOM.render(App, document.getElementById('root'));