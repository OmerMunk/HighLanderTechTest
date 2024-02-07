import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api'


import {highLanderCoordinats, serverBaseUrl} from "../constants/constants";
import BallComponent from "./BallComponent";
import GoalComponent from "./GoalComponent";
import io from "socket.io-client";


interface IMapComponentProps {
    goalPosition: { lat: number, lng: number };
    getGoalPosition: () => void;
    showSuccessModal: () => void;
    buttonsEnabled: boolean;
    disableButtons: () => void;
    APIKey: string;
}

//todo: would add here anouther socket to check the ball position according to the goal position.


const MapComponent: React.FC<IMapComponentProps> = (props: IMapComponentProps) => {
    const socket = io(serverBaseUrl);

    const {goalPosition, showSuccessModal} = props;

    const [ballPosition, setBallPosition] = useState(highLanderCoordinats);


    const setLat = (lat: number) => {
        setBallPosition(prevState => {return {lat, lng: prevState.lng}})
    }

    const setLng = (lng: number) => {
        setBallPosition(prevState => {return {lat: prevState.lat, lng}})
    }

    const mapContainerStyle = {
        width: '100%',
        height: '100%'
    }

    const center = highLanderCoordinats

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: props.APIKey
        // Todo: would retrieve it from the server as secert from the cloud in a specific api endpoint
    })

    useEffect(() => {
        socket.on('ballInGoal', (result) => {
            showSuccessModal();
            props.disableButtons();
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
                        buttonsEnabled={props.buttonsEnabled}
                    />

                </Marker>


            </GoogleMap>
        </div>

    )
}

export default MapComponent;