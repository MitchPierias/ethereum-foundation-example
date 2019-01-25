import React from 'react';

export default function ScrollCard({ path, visible=true, component }) {

    return (
        <div className="scroll-card">
            {visible && component()}
        </div>
    )
}