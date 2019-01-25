import React from 'react';
import { DrizzleContext } from 'drizzle-react';
// Components
import PublishElement from '../components/PublishElement';

export default function PublishRoute() {

    return (
        <DrizzleContext.Consumer>
            {({ drizzle, drizzleState, initialized }) => {

                if (!initialized) return "Loading....";

                return (
                    <PublishElement drizzle={drizzle} drizzleState={drizzleState}/>
                )
            }}
        </DrizzleContext.Consumer>
    )
}