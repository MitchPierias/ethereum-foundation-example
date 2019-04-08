import React from 'react';

const DAYS:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS:string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];

interface DateElementProps {
    date:Date
}

const DateElement:React.FunctionComponent<DateElementProps> = ({ date }) => (
    <span className="date">
        <span className="day">{DAYS[date.getDay()]}</span>
        <span className="date">{date.getDate()+date.getOrdinalSuffix()}</span>
        <span className="month">{MONTHS[date.getMonth()]}</span>
    </span>
)

/**
 * Global Extension Declaration
 * @desc Defines extensions to global objects
 */
declare global {
    interface Date {
        getOrdinalSuffix(day?:number):string
    }
}

/**
 * Get Ordinal Suffix
 * @desc Date extension to attain the ordinal suffix from the current or specified day
 * @param day (optional) Gregorian calendar day
 * @returns Ordinal suffix
 * @author Mitch Pierias <github.com/MitchPierias>
 * @version 1.0.0
 * @note Function cannot be an arrow function
 */
if (!Date.prototype.getOrdinalSuffix) {
    Date.prototype.getOrdinalSuffix = function(day:number):string {
        // Get the date and last digit
        const date:number = day || this.getDate();
        const lastDigit = date % 10, lastTwoDigits = date % 100;
        // Return appropriate ordinal
        if (lastDigit == 1 && lastTwoDigits != 11) return "st";
        if (lastDigit == 2 && lastTwoDigits != 12) return "nd";
        if (lastDigit == 3 && lastTwoDigits != 13) return "rd";
        return "th";
    }
}

export default DateElement;