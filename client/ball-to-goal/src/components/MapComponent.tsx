import React from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api'


import {highLanderCoordinats} from "../constants/constants";
import BallComponent from "./BallComponent";
import GoalComponent from "./GoalComponent";


interface IMapComponentProps {
    goalPosition: { x: number, y: number };
}

//todo: would add here anouther socket to check the ball position according to the goal position.


const MapComponent: React.FC<IMapComponentProps> = (props: IMapComponentProps) => {
    const { goalPosition} = props;

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh'
    }

    const center = highLanderCoordinats

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env._GOOGLE_MAPS_API_KEY || 'AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI'
        // Todo: would retrieve it from the server as secert from the cloud in a specific api endpoint
    })


    if (loadError) return <div>Error loading maps</div>

    if (!isLoaded) return <div>Loading maps</div>


    return (
        <div
            style={{pointerEvents:'none'}}
        >

        <GoogleMap
            options={{
                gestureHandling: 'none',
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}>
             {/*todo: would add the ball and the goal as markets for better google maps api integration*/}
            {/*<Marker position={ballPosition}/>*/}
            {/*<Marker position={goalPosition} />*/}
            <BallComponent/>
            <GoalComponent x={goalPosition.x} y={goalPosition.y}/>
        </GoogleMap>
        </div>

    )
}

export default MapComponent;