import React from 'react';
import { DrizzleContext } from 'drizzle-react';
// Components
import ModerateElement from '../components/ModerateElement';

export default function() {

    return (
        <DrizzleContext.Consumer>
            {({ drizzle, drizzleState, initialized }) => {
                if (!initialized) return "Loading....";
                return <ModerateElement drizzle={drizzle} drizzleState={drizzleState}/>
            }}
        </DrizzleContext.Consumer>
    )
}