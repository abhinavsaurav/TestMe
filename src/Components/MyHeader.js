import React from 'react';
import './MyHeader.css';

const MyHeader = (props) =>{
    return (
        <div className="MyHeader">
            <div className="run-btn">{props.children}</div>
            &nbsp;&nbsp;
            <div className="heading">Test Editor</div>
        </div>
    )
};

export default MyHeader;