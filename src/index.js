import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';
// Components
import Router from './routes';
// CSS
import './styles/App.css';
// Contracts ABIs
import FoundationABI from './../build/contracts/Foundation.json'

const options = { contracts:[FoundationABI] }
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const App = (
    <DrizzleContext.Provider drizzle={drizzle}>
	    <Router/>
    </DrizzleContext.Provider>
)

ReactDOM.render(App, document.getElementById('root'));