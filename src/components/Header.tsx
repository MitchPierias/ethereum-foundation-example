import React, { Fragment } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../json/feature.json';
import { withChain } from '../utils/ChainContext';
// Constants
const DAYS:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS:string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];

interface HeaderLottieOptions {
    loop:boolean
    autoplay:boolean
    animationData:any
    rendererSettings: {
        preserveAspectRatio:string
    }
}

interface HeaderProps {
    drizzle:any
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

interface DateElementProps {
    date:Date
}

const DateElement = ({ date }:DateElementProps):JSX.Element => (
    <span className="date">
        <span className="day">{DAYS[date.getDay()]}</span>
        <span className="date">{date.getDate()+date.getOrdinalSuffix()}</span>
        <span className="month">{MONTHS[date.getMonth()]}</span>
    </span>
)

declare global {
    interface Date {
        getOrdinalSuffix(day?:number):string
    }
}

Date.prototype.getOrdinalSuffix = (day:number):string => {
    // Get the date and last digit
    const date = day || this.getDate();
    const lastDigit = date % 10, lastTwoDigits = date % 100;
    // Return appropriate ordinal
    if (lastDigit == 1 && lastTwoDigits != 11) return "st";
    if (lastDigit == 2 && lastTwoDigits != 12) return "nd";
    if (lastDigit == 3 && lastTwoDigits != 13) return "rd";
    return "th";
}

export default withChain(Header);