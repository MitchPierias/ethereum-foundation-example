import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import { ChainProvider } from './utils/ChainContext';
import Header from './components/Header';
import Carousel from './routes/Carousel';
import MemberRoute from './routes/member';
import ModerateRoute from './components/ModerateElement';
// CSS
import './styles/index.scss';
// Contracts ABIs
import BountyABI from './../build/contracts/Bounty.json';
const contracts = [BountyABI];

const App = (
    <ChainProvider contracts={contracts}>
        <BrowserRouter>
            <Header/>
            <svg height={80} width="100%" style={{minWidth:960}} viewBox="0 0 400 38.7" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="./../images/sway.png">
                <path d="M0,0c38.5,0,101.8,23.7,153.8,23.7S285.7,6.8,341.3,6.8S423.8,17.4,500,17.4v21.3L0,38.2V0z" fill="#FFFFFF"/>
            </svg>
            <section style={{overflow:"hidden"}}>
                <Carousel/>
                <footer>
                    <a href="/">Home</a>
                    <a href="/moderate">Moderate</a>
                    <a href="/me">Profile</a>
                </footer>
                <Switch>
                    <Route path="/moderate" component={ModerateRoute}/>
                    <Route path="/me" component={MemberRoute}/>
                </Switch>
            </section>
        </BrowserRouter>
    </ChainProvider>
)

ReactDOM.render(App, document.getElementById('root'));