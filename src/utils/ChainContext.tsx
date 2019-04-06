import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';

interface ChainProps {}

interface ChainProviderProps extends React.ComponentClass {
    contracts:any[]
}

export const withChain= (ComposedComponent:React.ComponentClass | React.StatelessComponent) => (props:ChainProps) => (
    <DrizzleContext.Consumer>
        {({ drizzle, drizzleState, initialized }:any) => {
            if (!initialized) return "Loading....";
            return <ComposedComponent {...props} drizzle={drizzle} drizzleState={drizzleState}/>
        }}
    </DrizzleContext.Consumer>
)

export const ChainProvider = ({ contracts, children }:ChainProviderProps) => {
    const options = { contracts }
    const drizzleStore = generateStore(options);
    const drizzle = new Drizzle(options, drizzleStore);
    return <DrizzleContext.Provider drizzle={drizzle} children={children}/>
}