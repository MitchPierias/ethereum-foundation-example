import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mention } from 'react-twitter-widgets';

export default class HomeRoute extends React.Component {

    render() {

        return (
            <div>
                <h1>Plant a Tree Day</h1>
                <p>Help make the world a better place</p>
                <p>Display a collage of tweets her}</p>
                <h2>How to join the cause</h2>
                <p>Plant a tree</p>
                <p>Take a photo with you and your tree</p>
                <p>Post to twitter. Be sure to mention ACCOUNT and tag HASHTAG</p>
                <Mention username="mitchpierias" class="twitter-mention-button" data-show-count="false">Tweet to @mitchpierias</Mention>
                <p>Tell us about your</p>
                <NavLink to="/publish">tweet here</NavLink>
            </div>
        )
    }
}