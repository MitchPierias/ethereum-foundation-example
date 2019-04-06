import React from 'react';
// Styles
import './ScrollBox.scss';

export default function ScrollCard({ children, index=0 }) {

    return (
        <div className="scroll-card" data-idx={index}>
            {children}
        </div>
    )
}