import React from 'react';
import { Tweet } from 'react-twitter-widgets';
import { withChain, ChainComponentProps } from '../utils/ChainContext';

interface ModerateProps extends ChainComponentProps {}

interface ModerateState {
    tweetId:string
    error:boolean|string
}

class ModerateElement extends React.Component<ModerateProps, ModerateState> {

    state:ModerateState = {
        tweetId:'',
        error:false
    }

    constructor(props:ModerateProps) {
        super(props);
        // Bindings
        this.didSelectApprove = this.didSelectApprove.bind(this);
        this.didSelectDecline = this.didSelectDecline.bind(this);
    }

    componentWillMount() {
        this.props.drizzle.contracts.Bounty.methods["getRandomSubmission"]().call()
        .then((tweetId:string) => {
            console.log(tweetId);
            this.setState({ tweetId });
        }).catch((err:Error) => {
            console.log(err);
        });
    }

    didSelectApprove() {
        const { tweetId } = this.state;
        this.props.drizzle.contracts.Bounty.methods["approveSubmission"](tweetId).send()
        .then((success:boolean) => {
            if (success) console.log("Success! Tweet "+tweetId+" approved");
        }).catch((error:Error) => {
            const approvedPattern = /Already\sapproved/gi;
            if (approvedPattern.test(error.message)) {
                this.setState({ error:'Already approved' });
            } else {
                console.log(error.message);
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

export default withChain(ModerateElement);