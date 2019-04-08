import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';

interface ChainProps {
    
}

export interface ChainComponentProps {
    drizzle:any
    drizzleState:any
}

export type ChainComponent = React.FunctionComponent<ChainComponentProps>|React.ComponentClass<ChainComponentProps>

interface ChainProviderProps extends React.ComponentClass, React.FunctionComponent {
    contracts:any[]
    children:React.ComponentClass|React.FunctionComponent
}

export const withChain = (ComposedComponent:ChainComponent) => (props:ChainProps) => (
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
    return <DrizzleContext.Provider drizzle={drizzle} {...children}/>
}