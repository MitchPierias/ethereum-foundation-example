import React, { Fragment } from 'react';
import { Tweet } from 'react-twitter-widgets';
// Styles
//import './../styles/Twitter.css';

export default class ModerateElement extends React.Component {

    state = {
        tweetId:'',
        error:false
    }

    constructor() {
        super();
        // Bind all your callback/handler functions here
        this.didSelectApprove = this.didSelectApprove.bind(this);
        this.didSelectDecline = this.didSelectDecline.bind(this);
    }

    componentWillMount() {
        this.props.drizzle.contracts.Bounty.methods["getRandomSubmission"]().call()
        .then(tweetId => {
            console.log(tweetId);
            this.setState({ tweetId });
        }).catch(err => {
            console.log(err);
        });
    }

    didSelectApprove() {
        const { tweetId } = this.state;
        this.props.drizzle.contracts.Bounty.methods["approveSubmission"](tweetId).send()
        .then(success => {
            if (success) console.log("Success! Tweet "+tweetId+" approved");
        }).catch(({ message }) => {
            const approvedPattern = /Already\sapproved/gi;
            if (approvedPattern.test(message)) {
                this.setState({ error:'Already approved' });
            } else {
                console.log(message);
            }
        });
    }

    didSelectDecline() {
        alert("Decline submission");
    }

    render() {
        return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                {(this.state.error) ? <div>{this.state.error}</div> : null}
                {(this.state.tweetId !== '')
                    ? <Tweet tweetId={this.state.tweetId}/>
                    : "Loading tweet..."
                }
                <span>
                    <button onClick={this.didSelectApprove}>Approve</button>
                    <button onClick={this.didSelectDecline}>Decline</button>
                </span>
            </div>
        )
    }
}