import React from 'react';

export default function(props) {
    return (
        <div className="twitter-example" style={{width:"100%",display:"flex",flexDirection:"row",border:"2px solid #EDEDED",borderRadius:"1vw",alignContent:"stretch",alignItems:"stretch",padding:"0.5vw 1vw"}}>
            <span className="twitter-avatar" style={{flex:"0 0 6vw",backgroundColor:"#EDEDED",width:"6vw",height:"6vw",borderRadius:"3px",margin:"1vw 0.5vw"}}></span>
            <span style={{flex:"10 1",textAlign:"right",display:"flex",flexDirection:"column"}}>
                <span style={{flex:"none",backgroundColor:"#EDEDED",height:"2vw",margin:"1vw 0.5vw",borderRadius:"2px"}}></span>
                <span style={{flex:"10 1",backgroundColor:"#EDEDED",minHeight:"10vw",margin:"1vw 0.5vw",borderRadius:"2px"}}></span>
                {props.children}
            </span>
        </div>
    )
}