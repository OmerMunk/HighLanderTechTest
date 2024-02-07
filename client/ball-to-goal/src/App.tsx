import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from "./components/MapComponent";
import {highLanderCoordinats} from "./constants/constants";

function App() {
  return (
    <div style={{width: '100wv', height: '100wh'}}>
      <header>
        Header
      </header>
      <section>
        <MapComponent ballPosition={{lat: 32.077755408493545, lng: 34.78955186546355}} goalPosition={highLanderCoordinats} />
      </section>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
