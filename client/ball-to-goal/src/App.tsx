import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from "./components/MapComponent";
import {highLanderCoordinats} from "./constants/constants";
import axios from 'axios'



function App() {


    const goalPosition = {lat: 0, lng: 0}

    const getGoalPosition = () => {
        axios
            .get('http://localhost:8000/api/v1/goal/generate-goal')
            .then((res)=>{
                if(res.data.success){
                    goalPosition.lat = res.data.lat
                    goalPosition.lng = res.data.lng
                }

            }).catch((error)=>{
            console.error(`error: ${error}`);
        })
    }

    getGoalPosition();

  return (
    <div style={
        {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'stretch',
            alignItems: 'stretch',
            alignContent: 'stretch',
            height: '100vh',
            flexBasis: '100%'
        }
    }>
        {/*todo: would wrap in better looking ui for the user*/}
      <header style={{flexGrow: 1}}>
        Header
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
