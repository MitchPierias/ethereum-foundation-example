import React, { Fragment } from 'react';
// Constants
const TweetIDPattern = /\d$/gi;

export default class PublishElement extends React.Component {

    state = {
        tweetID:''
    }

    constructor() {
        super();
        // Bind callbacks
        this.didChangeInput = this.didChangeInput.bind(this);
        this.didSubmitTweet = this.didSubmitTweet.bind(this);
    }

    componentWillMount() {
        this.props.drizzle.contracts.Foundation.methods["countMembers"]().call()
        .then(response => {
            console.log(response+" members");
        }).catch(err => {
            console.log(err);
        })
    }

    didChangeInput(event) {
        const tweetID = event.target.value;
        this.setState({ tweetID });
    }

    didSubmitTweet(event) {
        event.preventDefault();
        // Cleanse ID (Remove URL)
        const tweetID = this.state.tweetID.replace(/\D/gi,'');
        this.props.drizzle.contracts.Foundation.methods["publishSubmission"](tweetID).send()
        .then(success => {
            if (success) console.log("Success!")
            this.setState({ tweetID:'' });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Fragment>
                <p>Login to twitter <small>(could use twitter api or skim cookies to sense if already logged)</small></p>
                <p>Right click and select copy link <small>Show image</small></p>
                <p>Paste the link below and publish</p>
                <form onSubmit={this.didSubmitTweet}>
                    <input type="text" name="tweetID" placeholder="Paste Tweet ID here" defaultValue={this.state.tweetID} onChange={this.didChangeInput}></input>
                    <button type="submit">Publish</button>
                </form>
            </Fragment>
        )
    }
}