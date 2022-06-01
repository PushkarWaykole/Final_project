import React, { useEffect, useRef, useState } from "react";
import "./Typing.css";

import Feedback from "./Feedback"
////////////////////////////////https://www.youtube.com/watch?v=Hpf2OmYnqhw
const getCloud = () => `The Yellow Wallpaper by Charlotte Perkins Gilman explores a woman's descent into madness after she's confined to a room with yellow wallpaper to help her nervous disorder. It is a groundbreaking short story that drew attention to mental health and women's rights when it was released and has influenced many writers, including Alice Walker and Sylvia Plath.`.split(" ");

function Word(props) {
  const { text, active, correct } = props;

  // const rerender = useRef(0);

  // useEffect(() => {
  //   rerender.current += 1;
  // });

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
      Typing test ............
    </div>
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
        style={{width: "100%", height: "80px", border: "2px solid black" ,borderRadius: "30px",border:"none"}}
        type="text"
        value={userInput}
        placeholder="Type the word"
        onChange={(e) => processInput(e.target.value)}
      />
      

      
    </div>
  );
}
