import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from "./components/MapComponent";
import {highLanderCoordinats} from "./constants/constants";
import axios from 'axios'
import Button from "./UI/Button/Button";

const fetchGoalPosition = async () => {
    const newGoalPosition = {lat: 0, lng: 0};
    const res = await axios.get('http://localhost:8000/api/v1/goal/generate-goal');
    if (res.data.success){
        newGoalPosition.lat = res.data.lat;
        newGoalPosition.lng = res.data.lng;
        return newGoalPosition;
    } else {
        return highLanderCoordinats;
    }
}

function App() {

    const [goalPosition, setGoalPosition] = useState(highLanderCoordinats);



    const getGoalPosition = async () => {
        const newGoalPosition = await fetchGoalPosition();
        setGoalPosition(newGoalPosition);
    }

    useEffect(()=>{
        getGoalPosition();
    },[])



  return (
    <div style={
        {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
        }
    }>
        {/*todo: would wrap in better looking ui for the user*/}
      <header style={{
          flexGrow: 1,
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
      }}>
          <img
              height={50}
              src={'https://static.wixstatic.com/media/7b8ddb_4b1b6b44308e4b8a9e71a1bf3c73a6f5~mv2.gif'}
          />
          <Button onClick={getGoalPosition}>reset</Button>
      </header>
      <section style={{flexGrow: 22}}>
        <MapComponent goalPosition={goalPosition} getGoalPosition={getGoalPosition}  />
      </section>
        {/*todo: would app a modal or pop up that pops when the ball reaches the goal*/}
      <footer style={{flexGrow: 1}}>
        Footer
      </footer>
    </div>
  );
}

export default App;
