import React, { Fragment } from 'react';
// Components
import Header from './HeaderContainer';
import ScrollBox from './../components/ScrollBox';
import ScrollCard from './../components/ScrollCard';
// Routes
import HomeRoute from './home';
import ModerateRoute from './ModerateContainer';
import MemberRoute from './MemberContainer';
// CSS
import '../styles/Home.css';
// Constants
const CAMPAIGN_TWITTER_HANDLE = 'MitchPierias';
const CAMPAIGN_TWITTER_HASHTAG = 'PlantATreeDay2019';

export default class IndexRoute extends React.Component {

    state = {
        featuredIndex: 0
    }

    constructor() {
        super();
        this.didCompleteTask = this.didCompleteTask.bind(this);
    }

    didCompleteTask(event) {
        event.preventDefault();
        let { featuredIndex } = this.state;
        if (featuredIndex < 4) featuredIndex++;
        this.setState({ featuredIndex });
    }

    render() {
        const { view } = this.props.match.params;
        let featuredIndex = (!view) ? 0 : ['review','profile'].indexOf(view)+1;
        
        return (
            <Fragment>
                <Header/>
                <svg height={40} width="100%" viewBox="0 0 64 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,64 C 18,0 46,0 64,64" fill="#F6F6F6"/>
                </svg>
                <section>
                    <ScrollBox index={featuredIndex}>
                        <ScrollCard component={HomeRoute}/>
                        <ScrollCard component={ModerateRoute}/>
                        <ScrollCard component={MemberRoute}/>
                    </ScrollBox>
                    <footer>
                        <a href="/">Home</a>
                        <a href="/review">Moderate</a>
                        <a href="/profile">Profile</a>
                    </footer>
                </section>
            </Fragment>
        )
    }
}