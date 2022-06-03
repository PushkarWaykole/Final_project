import React,{useState} from 'react'
import "./styles.module.css";
const Text = (props) => {
    const [text, setText] = useState("")

    const handleOnChange=(e)=>{
        setText(e.target.value);
    }

    const changeToUpper=()=>{
        console.log("Uppercase was clicked");
        let newText=text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase","success")
      }
    
      const changeToLower=()=>{
        console.log("Lower case was clicked");
        let newText=text.toLowerCase()
        setText(newText);
        props.showAlert("Converted to Lowercase","success")
      }
    
      const clearText=()=>{
        console.log("Clear text was clicked");
        let newText="";
        setText(newText);
        props.showAlert("Text cleared successfully","success")
      }
    
      const reverseTheText=()=>{
        let newText=text.split("").reverse().join("");
        setText(newText);
        props.showAlert("Text reversed successfully","success")
      }
    
      const handleCopy=()=>{
        
        navigator.clipboard.writeText(text);
        props.showAlert("Text copied to clipboard successfully","success")
      }
    
      
    
      const removeSpaces=()=>{
        let newText=text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Removed spaces  successfully","success")
      }
  return (
    <div id="unsplash">
        <h2 style={{textAlign: "center"}} className="head">This is a text analyzer</h2>
        <textarea autocomplete="on" style={{width: "100%",textAlign: "center",height: "40%",margin:"20px 0",fontSize: "40px"}}className="form-control" placeholder="Type or paste your content here" cursor="text" value={text} onChange={handleOnChange} id="myBox" rows="2"></textarea >
        
    <div className="text-center my-5 " >
        
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={changeToUpper}>Convert To Upper Case</button>
      <button disabled={text.length===0}  className="btn btn-primary mx-2 my-1" onClick={changeToLower}>Convert To Lower Case</button>
      <button disabled={text.length===0}  className="btn btn-primary mx-2 my-1" onClick={reverseTheText}>Reverse the text</button>
      <button disabled={text.length===0}  className="btn btn-primary mx-2 my-1" onClick={handleCopy}>Copy text</button>
      <button disabled={text.length===0}  className="btn btn-primary mx-2 my-1" onClick={removeSpaces}>Remove Extra Spaces</button>
      <button disabled={text.length===0} className="btn btn-danger mx-2 my-1" onClick={clearText}>Clear</button>
      </div>

      <div className=" text-center my-5" >
        <h2>Your text Summary</h2>
        <p>{text.split(/\s+/).filter((a1)=>{return a1.length!==0}).length} words and {text.length} characters</p>
        <p>{(0.008*text.split(" ").length) || 0} Minutes to read</p>
        <h3>Preview</h3>
        <p>{text.length>0?text:"Nothing to preview"}</p>
      </div>
    </div>
  )
}

export default Text