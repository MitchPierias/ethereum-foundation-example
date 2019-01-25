import React from 'react';
import { DrizzleContext } from 'drizzle-react';
// Components
import HeaderElement from './../components/HeaderElement';

export default function() {

    return (
        <DrizzleContext.Consumer>
            {({ drizzle, drizzleState, initialized }) => {
                if (!initialized) return "Loading....";
                return <HeaderElement drizzle={drizzle} drizzleState={drizzleState}/>
            }}
        </DrizzleContext.Consumer>
    )
}