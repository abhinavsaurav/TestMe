// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import MyConsole from './Components/MyConsole';
import MyEditor from './Components/MyEditor';
import MyHeader from './Components/MyHeader';
import './App.css';

const App= () => {
  const [code,setCode] = useState({dummy:false,mycode:"<html>I'm dummy!</html>"});
  const [myConfig,setMyConfig]= useState("");

    useEffect(()=>{
        const editor = window.ace.edit("editor",{
            theme: "ace/theme/tomorrow_night_blue",
            mode: "ace/mode/html",
            autoScrollEditorIntoView: true,
            maxLines: 100,
            minLines: 50
        });
        setMyConfig(editor);
    },[]);

    const runButtonRun = (e) =>{
        const codeVal = myConfig.getValue();
        const val= !code.dummy;
        setCode({...code,dummy:val,mycode:codeVal});
    };


  return (
    <div className="App">
      <div>
      <MyHeader >
        <button type="button" className="mybtn" onClick={runButtonRun}>Run Code</button>
      </MyHeader>
      </div>
      <div className="content-body">
        <MyEditor runButtonRun={runButtonRun}/>
        <MyConsole codeData={code}/>
      </div>
    </div>
  );
}

export default App;
