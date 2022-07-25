import React, { useEffect, useRef, useState } from "react";
import "./Typing.css";

import Feedback from "./Feedback"

const getCloud = () => `Once there was a boy who became bored when he watched over the village sheep grazing on the hillside. To entertain himself he sang out Wolf Wolf The wolf is chasing the sheep.`.split(" ").sort(()=> Math.random() >0.5 ? 1:-1);

function Word(props) {
  const { text, active, correct } = props;

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }

  if (active === true) {
    return <span className="active">{text} </span>;
  }

  return <span>{text} </span>;
}

Word = React.memo(Word);

function Timer(props) {
  const { correctWords } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let id;
    if (props.startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [props.startCounting]);

  const minutes = timeElapsed / 60;
  return (
    <div>
      <p>Time: {timeElapsed} s</p>
      <p>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM </p>
    </div>
  );
}

export default function App() {
  const [finished, setFinished] = useState(false);
  const [userInput, setUserInput] = useState("");

  const cloud = useRef(getCloud());

  const [startCounting, setStartCounting] = useState(false);

  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const [correctWordArray, setCorrectWordArray] = useState([]);

  function processInput(value) {
    if (activeWordIndex === cloud.current.length) {
      return;
    }
    if (!startCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(" ")) {
      //the user  finished the word

      if (activeWordIndex === cloud.current.length - 1) {
        //overflow
        setStartCounting(false);
        setUserInput("Completed");
        setFinished(true);
      } else {
        setUserInput("");
      }
      setActiveWordIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }
  return (
    <div className="typing"> 

<div class="wrapper">
    <div class="typing-demo heading">
      Typing test ........</div>
</div>
      
      <div className="stats">
      <Timer
        startCounting={startCounting}
        correctWords={correctWordArray.filter(Boolean).length}
      />
      </div>

      <div className="text-box">
      <p className="text">
        {cloud.current.map((word, index) => {
          return (
            <Word
              text={word}
              active={index === activeWordIndex}
              correct={correctWordArray[index]}
            />
          );
        })}
      </p>
      </div>

      <div className="start">Start typing</div>
      <input
      className="input-field"
        style={{ height: "80px", border: "2px solid black" ,borderRadius: "30px",border:"none"}}
        type="text"
        value={userInput}
        placeholder="Type the word"
        onChange={(e) => processInput(e.target.value)}
      />
      

      
    </div>
  );
}
