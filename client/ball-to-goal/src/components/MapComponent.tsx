import React from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api'

import Goal from '../images/goal.png'
import {highLanderCoordinats} from "../constants/constants";


interface IMapComponentProps {
    ballPosition: { lat: number, lng: number };
    goalPosition: { lat: number, lng: number };
}

const MapComponent: React.FC<IMapComponentProps> = (props) => {
    const {ballPosition, goalPosition} = props;
    const mapContainerStyle = {
        width: '90vw',
        height: '90vh'
    }
    const center = highLanderCoordinats
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env._GOOGLE_MAPS_API_KEY || 'AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI' //Todo: retrieve it from the server as secert /env
    })
    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) return <div>Loading maps</div>
    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={18} center={center}>
            <Marker position={ballPosition}/>
            <Marker position={goalPosition} />
        </GoogleMap>
    )
}

export default MapComponent;