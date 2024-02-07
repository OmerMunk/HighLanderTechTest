import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api'


import {highLanderCoordinats, serverBaseUrl} from "../constants/constants";
import BallComponent from "./BallComponent";
import GoalComponent from "./GoalComponent";
import io from "socket.io-client";


interface IMapComponentProps {
    goalPosition: { lat: number, lng: number };
    getGoalPosition: () => void;
}

//todo: would add here anouther socket to check the ball position according to the goal position.


const MapComponent: React.FC<IMapComponentProps> = (props: IMapComponentProps) => {
    const socket = io(serverBaseUrl);

    const {goalPosition} = props;

    const [ballPosition, setBallPosition] = useState(highLanderCoordinats);

    console.log(`ballPosition is ${ballPosition.lat} and ${ballPosition.lng}`);

    const setLat = (lat: number) => {
        console.log(`current lat is ${ballPosition.lat}`)
        console.log(`new lat is ${lat}`);
        setBallPosition(prevState => {return {lat, lng: prevState.lng}})
    }

    const setLng = (lng: number) => {
        console.log(`current lng is ${ballPosition.lng}`)
        console.log(`new lng is ${lng}`);
        setBallPosition(prevState => {return {lat: prevState.lat, lng}})
    }

    const mapContainerStyle = {
        width: '100%',
        height: '100%'
    }

    const center = highLanderCoordinats

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env._GOOGLE_MAPS_API_KEY || 'AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI'
        // Todo: would retrieve it from the server as secert from the cloud in a specific api endpoint
    })

    useEffect(() => {
        socket.on('ballInGoal', (result) => {
            console.log(`ballInGoal: ${result}`);
        })
    },[])


    if (loadError) return <div>Error loading maps</div>

    if (!isLoaded) return <div>Loading maps</div>


    return (
        <div
            style={{
                pointerEvents: 'none',
                height: '100%',
        }}
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

                <Marker
                    position={goalPosition}
                    icon={{
                        url: require('../images/goal.png'),
                        scaledSize: new window.google.maps.Size(100, 100)
                    }}
                >

                    <GoalComponent lat={goalPosition.lat} lng={goalPosition.lng}/>

                </Marker>
                <Marker
                    position={ballPosition}
                    icon={{
                        url: require('../images/ball.png'),
                        scaledSize: new window.google.maps.Size(60, 60)
                    }}
                >

                    <BallComponent
                        setLat={setLat}
                        setLng={setLng}
                        lat={ballPosition.lat}
                        lng={ballPosition.lng}
                    />

                </Marker>


            </GoogleMap>
        </div>

    )
}

export default MapComponent;