import React from 'react';
import { DrizzleContext } from 'drizzle-react';
// Components
import HeaderElement from '../components/HeaderElement';

export default function() {

    return (
        <DrizzleContext.Consumer>
            {({ drizzle, drizzleState, initialized }) => {
                if (!initialized) return "Loading....";
                return <HeaderElement contracts={drizzle.contracts} drizzleState={drizzleState}/>
            }}
        </DrizzleContext.Consumer>
    )
}