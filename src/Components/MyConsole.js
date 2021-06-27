import React from "react";
import './MyConsole.css';


const MyConsole = ({codeData})=>{
    try{
        // throw "im a error";
        return (
            <div>
                <iframe 
                srcDoc={codeData.mycode}
                frameBorder="0"
                title="iframeResult"
                id="iframeResult"
                name="iframeResult"
                allowFullScreen="true">
                </iframe>
            </div>);
    }
    catch(error){
        const myError="Looks like something is not Right: "+error;
        return (
            <div>
                <iframe 
                srcDoc={myError}
                frameBorder="0"
                title="iframeResult"
                id="iframeResult"
                name="iframeResult"
                allowFullScreen="true">
                </iframe>
            </div>);
    }
}

export default MyConsole;