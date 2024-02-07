import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api'


import {highLanderCoordinats, serverBaseUrl} from "../../constants/constants";
import BallComponent from "../BallComponent";
import io from "socket.io-client";


interface IMapComponentProps {
    goalPosition: { lat: number, lng: number };
    getGoalPosition: () => void;
    showSuccessModal: () => void;
    buttonsEnabled: boolean;
    disableButtons: () => void;
    APIKey: string;
}



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
    })

    useEffect(() => {
        socket.on('ballInGoal', (result) => {
            showSuccessModal();
            if(props.buttonsEnabled) {
                props.disableButtons();
            }

        })
    },[])


    if (loadError) return <div>Error loading maps</div>

    if (!isLoaded) return <div>Loading maps</div>


    return (
        <div
            className={'map-component-container'}
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

                <Marker
                    position={goalPosition}
                    icon={{
                        url: require('../../images/goal.png'),
                        scaledSize: new window.google.maps.Size(100, 100)
                    }}
                >


                </Marker>
                <Marker
                    position={ballPosition}
                    icon={{
                        url: require('../../images/ball.png'),
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