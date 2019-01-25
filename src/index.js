import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';
// Components
import Router from './routes';
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
            <Route path="/:view?" component={Router}/>
        </BrowserRouter>
    </DrizzleContext.Provider>
)

ReactDOM.render(App, document.getElementById('root'));