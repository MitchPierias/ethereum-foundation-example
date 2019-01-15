import React from 'react';
import EthService from '../services/ethService';
// Constants
const TweetIDPattern = /\d$/gi;

export default class PublishRoute extends React.Component {

    state = {
        tweetID:''
    }

    constructor() {
        super();
        // Bind callbacks
        this.didChangeInput = this.didChangeInput.bind(this);
        this.didSubmitTweet = this.didSubmitTweet.bind(this);
    }

    didChangeInput(event) {
        const tweetID = event.target.value;
        this.setState({ tweetID });
    }

    didSubmitTweet(event) {
        event.preventDefault();
        // Cleanse ID (Remove URL)
        const tweetID = this.state.tweetID.replace(/\D/gi,'');
        console.log(tweetID);
    }

    render() {

        return (
            <div>
                <h2>Publish</h2>
                <small>Describe here how to submit a tweet</small>
                <p>Login to twitter <small>(could use twitter api or skim cookies to sense if already logged)</small></p>
                <p>Right click and select copy link <small>Show image</small></p>
                <p>Paste the link below and publish</p>
                <form onSubmit={this.didSubmitTweet}>
                    <label htmlFor="tweetID">Tweet ID:</label>
                    <input type="text" name="tweetID" placeholder="Tweet ID" onChange={this.didChangeInput}></input>
                    <button type="submit">Publish</button>
                </form>
            </div>
        )
    }
}