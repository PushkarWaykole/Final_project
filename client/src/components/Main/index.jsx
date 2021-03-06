import styles from "./styles.module.css";
import Text from './Text'
import Feedback from "./Typing/Feedback"
import React from "react";
// import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import BIRDS from "vanta/dist/vanta.birds.min";
import RINGS from "vanta/dist/vanta.rings.min";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState,useEffect,useRef } from "react";

import Alert from './Alert'
import Typing from "./Typing/Typing";

import Bg from "./Bg";
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  //Vanta 
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        RINGS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          // colorMode: "lerpGradient"
        
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destory();
    };
  }, [vantaEffect]);


	return (
		<div className={styles.main_container} ref={vantaRef} >
			<nav className={styles.navbar}>
				<h1>Typing Utilies</h1>
				
				
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
      <Alert alert={alert}/>
	  <Typing />

	  
	  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <h1 style={{textAlign: "center"}}>Text tools </h1>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <Text />
      </div>
    </div>
  </div>

  <Feedback />
  {/* <Bg /> */}
</div>
      
	
			
      
			
		</div>
	);
};

export default Main;
