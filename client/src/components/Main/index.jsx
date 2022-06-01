import styles from "./styles.module.css";
import Text from './Text'
import Feedback from "./Typing/Feedback"
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";
import Alert from './Alert'
import Typing from "./Typing/Typing";
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
  
	return (
		<div className={styles.main_container}>
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
  
</div>
      
	
			
      
			
		</div>
	);
};

export default Main;
