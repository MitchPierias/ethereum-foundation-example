import React from 'react';
// Styles
import './ScrollBox.scss';

interface ScrollCardProps {
    index:number
}

const ScrollCard:React.FunctionComponent<ScrollCardProps> = ({ children, index=0 }) => (
    <div className="scroll-card" data-idx={index}>
        {children}
    </div>
)

export default ScrollCard;