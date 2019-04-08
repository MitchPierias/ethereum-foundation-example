import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './../../json/feature.json';
import { withChain, ChainComponentProps } from './../../utils/ChainContext';
// Components
import DateElement from './DateElement'

interface HeaderLottieOptions {
    loop:boolean
    autoplay:boolean
    animationData:any
    rendererSettings: {
        preserveAspectRatio:string
    }
}

interface HeaderProps extends ChainComponentProps {
    
}

interface HeaderState {
    isOpen:boolean
    submissionDate:Date
    rewardDate:Date
}

class Header extends React.Component<HeaderProps, HeaderState> {

    state:HeaderState = {
        isOpen:true,
        submissionDate:new Date(),
        rewardDate:new Date()
    }

    componentWillMount() {
        this.getPeriod('submissionDate');
        this.getPeriod('rewardDate');
    }

    getPeriod(datePeriod:string) {
        this.props.drizzle.contracts.Bounty.methods[datePeriod]().call().then((rawDate:number) => {
            const date = new Date(rawDate * 1000);
            if (datePeriod === 'submissionDate')
                this.setState({ submissionDate:date });
            else if (datePeriod === 'rewardDate')
                this.setState({ rewardDate:date });
        }).catch((error:Error) => {
            console.log(error);
        });
    }

    render() {

        const defaultOptions:HeaderLottieOptions = {
            loop: false,
            autoplay: false, 
            animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        return (
            <header>
                <h1>Plant A Tree Day</h1>
                <h2>Making the world a greener place</h2>
                <div className="schedule">
                    <span className="date">
                        <DateElement date={this.state.submissionDate}/>
                    </span>
                    <span>
                        <Lottie options={defaultOptions}
                                height={300}
                                width={300}
                                isStopped={true}
                                isPaused={true}/>
                    </span>
                    <DateElement date={this.state.rewardDate}/>
                </div>
                <h2>How can you help?</h2>
            </header>    
        )
    }
}

export default withChain(Header);