import React, {useEffect} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api'

import io from 'socket.io-client';

import Goal from '../images/goal.png'
import {highLanderCoordinats} from "../constants/constants";
import BallComponent from "./BallComponent";


interface IMapComponentProps {
    initialBallPosition: { lat: number, lng: number };
    goalPosition: { lat: number, lng: number };
}

const socket = io('http://localhost:8000')

const MapComponent: React.FC<IMapComponentProps> = (props) => {
    const {initialBallPosition, goalPosition} = props;
    const [ballPosition, setBallPosition] = React.useState(initialBallPosition)

    const mapContainerStyle = {
        width: '90vw',
        height: '90vh'
    }

    const center = highLanderCoordinats

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env._GOOGLE_MAPS_API_KEY || 'AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI' //Todo: retrieve it from the server as secert /env
    })


    useEffect(()=>{
        socket.on('ballLocation', (location)=>{
            setBallPosition(location)
        })

        return () => {
            socket.off('ballLocation')
        }
    }, [])

    if (loadError) return <div>Error loading maps</div>

    if (!isLoaded) return <div>Loading maps</div>


    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}>
            <Marker position={ballPosition}/>
            <Marker position={goalPosition} />
            <BallComponent/>
        </GoogleMap>
    )
}

export default MapComponent;