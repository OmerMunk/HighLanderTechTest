import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from "./components/MapComponent";
import {highLanderCoordinats} from "./constants/constants";
import axios from 'axios'

function App() {

    const goalPosition = {x: 0, y: 0}
    axios.get('http://localhost:8000/api/v1/goal/generate-goal').then((res)=>{
        if(res.data.success){
            goalPosition.x = res.data.x
            goalPosition.y = res.data.y
            console.log(`goalPosition: ${goalPosition}`);
        }

    })

  return (
    <div style={{width: '100wv', height: '100wh'}}>
      <header>
        Header
      </header>
      <section>
        <MapComponent initialBallPosition={{lat: 32.077755408493545, lng: 34.78955186546355}} goalPosition={goalPosition} />
      </section>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
