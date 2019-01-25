import React, { Fragment } from 'react';
import Lottie from 'react-lottie';
import * as animationData from './../json/feature.json';
// Constants
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default class Header extends React.Component {

    state = {
        keyframe:0, // This should update with what stage the user is in (info/photo/post/submit/moderate)
        isOpen:true,
        submissionDate:new Date(),
        rewardDate:new Date()
    }

    componentWillMount() {
        this.getPeriod('submissionDate');
        this.getPeriod('rewardDate');
    }

    getPeriod(datePeriod) {
        console.log(this.props.contracts.Bounty)
        this.props.contracts.Bounty.methods[datePeriod]().call().then(rawDate => {
            const date = new Date(rawDate * 1000);
            this.setState({[datePeriod]:date});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true, 
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
                                isStopped={false}
                                isPaused={false}/>
                    </span>
                    <span className="date">
                        <DateElement date={this.state.rewardDate}/>
                    </span>
                </div>
            </header>    
        )
    }
}

function DateElement({ date }) {
    return (
        <Fragment>
            <span className="day">{DAYS[date.getDay()]}</span>
            <span className="date">{date.getDate()+date.getOrdinalSuffix()}</span>
            <span className="month">{MONTHS[date.getMonth()]}</span>
        </Fragment>
    )
}

Date.prototype.getOrdinalSuffix = function(day) {
    // Get the date and last digit
    const date = day || this.getDate();
    const lastDigit = date % 10, lastTwoDigits = date % 100;
    // Return appropriate ordinal
    if (lastDigit == 1 && lastTwoDigits != 11) return "st";
    if (lastDigit == 2 && lastTwoDigits != 12) return "nd";
    if (lastDigit == 3 && lastTwoDigits != 13) return "rd";
    return "th";
}