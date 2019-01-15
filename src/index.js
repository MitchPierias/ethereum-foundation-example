import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// Components
import Router from './routes';
// CSS
import './styles/App.css';

const App = (
    <Fragment>
	    <Router/>
    </Fragment>
)

ReactDOM.render(App, document.getElementById('root'));