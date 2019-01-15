import React from 'react';
import { Tweet } from 'react-twitter-widgets';
import EthService from '../services/ethService';

export default class ModerateRoute extends React.Component {

    constructor() {
        super();
        // Bind all your callback/handler functions here
        this.didSelectApprove = this.didSelectApprove.bind(this);
    }

    didSelectApprove() {
        alert("Approve submission");
    }

    didSelectDecline() {
        alert("Decline submission");
    }

    render() {

        return (
            <div>
                <Tweet tweetId='511181794914627584'/>
                <button onClick={this.didSelectApprove}>Approve</button>
                <button onClick={this.didSelectDecline}>Decline</button>
            </div>
        )
    }
}