import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from "./components/MapComponent";
import {highLanderCoordinats} from "./constants/constants";
import axios from 'axios'

function App() {

    const goalPosition = {x: 0, y: 0}
    axios
        .get('http://localhost:8000/api/v1/goal/generate-goal')
        .then((res)=>{
        if(res.data.success){
            goalPosition.x = res.data.x
            goalPosition.y = res.data.y
            console.log(`goalPosition: ${goalPosition}`);
        }

    }).catch((error)=>{
        console.error(`error: ${error}`);
    })

  return (
    <div style={{width: '100wv', height: '100wh'}}>
        {/*todo: would wrap in better looking ui for the user*/}
      {/*<header>*/}
      {/*  Header*/}
      {/*</header>*/}
      <section>
        <MapComponent goalPosition={goalPosition} />
      </section>
        {/*todo: would app a modal or pop up that pops when the ball reaches the goal*/}
      {/*<footer>*/}
      {/*  Footer*/}
      {/*</footer>*/}
    </div>
  );
}

export default App;
