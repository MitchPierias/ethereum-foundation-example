import React, { Fragment } from 'react';
import { DrizzleContext } from 'drizzle-react';
import { Mention } from 'react-twitter-widgets';
// Components
import PublishElement from './../components/PublishElement';

export default class HomeContainer extends React.Component {

    state = {
        currentStage:0
    }
    
    render() {
        return (
            <DrizzleContext.Consumer>
                {({ drizzle, drizzleState, initialized }) => {

                    if (!initialized) return "Loading....";

                    return (
                        <Fragment>
                            <h2>How can you help?</h2>
                            <h2>Plant a tree</h2>
                            <h2>Take a photo with said tree</h2>
                            <h2>Post to Twitter</h2>
                            <h2>Lets us know about the link</h2>
                            <PublishElement drizzle={drizzle} drizzleState={drizzleState}/>
                        </Fragment>
                    )
                }}
            </DrizzleContext.Consumer>
        )
    }
}