import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mention } from 'react-twitter-widgets';
// CSS
import '../styles/Home.css';
// Constants
const CAMPAIGN_TWITTER_HANDLE = 'MitchPierias';
const CAMPAIGN_TWITTER_HASHTAG = 'TagsForDays';

export default function HomeRoute() {
    
    return (
        <div>
            <h1>Plant a Tree Day</h1>
            <p>Help make the world a better place</p>
            <p>Display a collage of tweets her</p>
            <h2>How can you help?</h2>
            <h3>Step 1</h3>
            <p>Plant a tree</p>
            <h3>Step 2</h3>
            <p>Take a photo with you and said tree</p>
            <h3>Step 3</h3>
            <p>Post to twitter, making sure to include @{CAMPAIGN_TWITTER_HANDLE} and #{CAMPAIGN_TWITTER_HASHTAG}</p>
            <Mention username={CAMPAIGN_TWITTER_HANDLE} class="twitter-mention-button" data-show-count="false">Tweet to @mitchpierias</Mention>
            <h3>Step 4</h3>
            <p>Tell us about your tweet</p>
            <NavLink to="/publish">Click Here</NavLink>
        </div>
    )
}