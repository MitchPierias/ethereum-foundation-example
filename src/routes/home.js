import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Mention } from 'react-twitter-widgets';
// Components
import PublishRoute from './publish';
import ModerateRoute from './moderate';
// CSS
import '../styles/Home.css';
// Constants
const CAMPAIGN_TWITTER_HANDLE = 'MitchPierias';
const CAMPAIGN_TWITTER_HASHTAG = 'TagsForDays';

export default function HomeRoute() {

    return (
        <Fragment>
            <header>
                <h1>National Tree Day</h1>
                <h2>Making the world a better place</h2>
                <div className="schedule">
                    <span className="date">
                        <span className="day">Friday</span>
                        <span className="date">26th</span>
                        <span className="month">July</span>
                    </span>
                    <span>
                        <img src="./tree.png" alt="Tree graphic"/>
                    </span>
                    <span className="date">
                        <span className="day">Saturday</span>
                        <span className="date">27th</span>
                        <span className="month">July</span>
                    </span>
                </div>
            </header>
            <svg height={40} width="100vw" viewBox="0 0 64 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,64 C 18,0 46,0 64,64" fill="white"/>
            </svg>
            <section style={{overflow:"hidden"}}>
                <h2>How can you help?</h2>
                <div className="step-container">
                    <span className="step-box">
                        <h3 className="step-title">Step 1</h3>
                        <span>Plant a tree</span>
                    </span>
                    <span className="step-box">
                        <h3 className="step-title">Step 2</h3>
                        <span>Take a photo with you and said tree</span>
                    </span>
                    <span className="step-box">
                        <h3 className="step-title">Step 3</h3>
                        <span>Post to twitter, making sure to include @{CAMPAIGN_TWITTER_HANDLE} and #{CAMPAIGN_TWITTER_HASHTAG}</span>
                        <Mention username={CAMPAIGN_TWITTER_HANDLE} class="twitter-mention-button" data-show-count="false">Tweet to @mitchpierias</Mention>
                    </span>
                    <span className="step-box">
                        <h3 className="step-title">Step 4</h3>
                        <span>Tell us about your tweet</span>
                        <PublishRoute/>
                    </span>
                </div>
            </section>
            <ModerateRoute/>
        </Fragment>
    )
}