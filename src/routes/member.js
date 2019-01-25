import React from 'react';
import { DrizzleContext } from 'drizzle-react';
// Components
import MemberElement from './../components/MemberElement';

export default function() {

    return (
        <DrizzleContext.Consumer>
            {({ drizzle, drizzleState, initialized }) => {
                if (!initialized) return "Loading....";
                return <MemberElement drizzle={drizzle} drizzleState={drizzleState}/>
            }}
        </DrizzleContext.Consumer>
    )
}