import React from 'react';
import { Mention } from 'react-twitter-widgets';
// Components
import ScrollBox from '../components/ScrollBox/ScrollBox';
import ScrollCard from '../components/ScrollBox/ScrollCard';
import PublishRoute from './publish';
import TwitterExample from '../components/TwitterExample';
// Constants
const CAMPAIGN_TWITTER_HANDLE = 'MitchPierias';
const CAMPAIGN_TWITTER_HASHTAG = 'PlantATreeDay2019';

interface HomeProps {

}

interface HomeState {
    featuredIndex:number
}

export default class HomeRoute extends React.Component<HomeProps, HomeState> {

    state:HomeState = {
        featuredIndex: 0
    }

    constructor(props:HomeProps) {
        super(props);
        // Bindings
        this.didCompleteTask = this.didCompleteTask.bind(this);
    }

    didCompleteTask(event:React.TouchEvent<HTMLButtonElement>) {
        event.preventDefault();
        let { featuredIndex } = this.state;
        if (featuredIndex < 4) featuredIndex++;
        this.setState({ featuredIndex });
    }

    render() {
        const { featuredIndex } = this.state;
        return (
            <ScrollBox index={featuredIndex}>
                <ScrollCard index={0}>
                    <div style={{textAlign:"center",display:"flex",flexDirextion:"row",justifyContent:"space-between"}}>
                        <span>Step 1</span>
                        <span>Plant a tree</span>
                    </div>
                    <p>National Tree Day aims to inspire, educate and recruit Australians to actively care for our unique land and create future generations of committed environmental custodians.</p>
                    <button className={featuredIndex>0?'done':''} onClick={this.didCompleteTask} name="complete" data-task={0}>Done! I did it!</button>
                </ScrollCard>
                <ScrollCard index={1}>
                    <span>Take a photo with you and said tree</span>
                    <button className={featuredIndex>1?'done':''} onClick={this.didCompleteTask} name="complete" data-task={0}>Done</button>
                </ScrollCard>
                <ScrollCard index={2}>
                    <button className={`badge ${featuredIndex>2?'done':''}`} onClick={this.didCompleteTask} name="complete" data-task={0}>Done</button>
                    <span style={{marginBottom:"1vw"}}>Post to twitter, making sure to include @{CAMPAIGN_TWITTER_HANDLE} and #{CAMPAIGN_TWITTER_HASHTAG}</span>
                    <TwitterExample>
                        <span style={{margin:"-0.5vw 0.5vw 0px 0px"}}>
                            <Mention username={CAMPAIGN_TWITTER_HANDLE} class="twitter-mention-button" data-show-count="false">Tweet to @{CAMPAIGN_TWITTER_HANDLE}</Mention>
                        </span>
                    </TwitterExample>
                </ScrollCard>
                <ScrollCard index={3}>
                    <span>Tell us about your tweet</span>
                    <PublishRoute mention={CAMPAIGN_TWITTER_HANDLE} hashtag={CAMPAIGN_TWITTER_HASHTAG}/>
                </ScrollCard>
            </ScrollBox>
        )
    }
}