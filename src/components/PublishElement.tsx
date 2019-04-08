import React from 'react';
// Components
import TwitterMock from "./TwitterMock";
import { withChain, ChainComponentProps } from '../utils/ChainContext';

interface PublishProps extends ChainComponentProps {
    mention:string
    hashtag:string
}

interface PublishState {
    tweetId:string
}

class PublishElement extends React.Component<PublishProps, PublishState> {

    state:PublishState = {
        tweetId:''
    }

    constructor(props:PublishProps) {
        super(props);
        // Bindings
        this.didChangeInput = this.didChangeInput.bind(this);
        this.didSubmitTweet = this.didSubmitTweet.bind(this);
    }

    didChangeInput(event:React.ChangeEvent<HTMLInputElement>) {
        const tweetId = event.target.value;
        this.setState({ tweetId });
    }

    didSubmitTweet(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Cleanse ID (Remove URL)
        const tweetId = this.state.tweetId.replace(/\D/gi,'');
        this.props.drizzle.contracts.Bounty.methods["publishSubmission"](tweetId).send()
        .then((success:boolean) => {
            if (success) console.log("Success!")
            this.setState({ tweetId:'' });
        }).catch((err:Error) => {
            console.log(err);
        });
    }

    render() {
        return (
            <TwitterMock>
                <form onSubmit={this.didSubmitTweet}>
                    <input type="text" name="tweetId" placeholder="Paste Tweet ID here" defaultValue={this.state.tweetId} onChange={this.didChangeInput}></input>
                    <button type="submit">Publish</button>
                </form>
            </TwitterMock>
        )
    }
}

export default withChain(PublishElement);