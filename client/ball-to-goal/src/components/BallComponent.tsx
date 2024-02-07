import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {serverBaseUrl} from "../constants/constants";


const moveBy = 0.00004; // how much to move the ball

interface IBallComponentProps {
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    lat: number;
    lng: number;
}

const BallComponent = (props: IBallComponentProps) => {
    const socket = io(serverBaseUrl);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            let newLat = props.lat;
            let newLng = props.lng;

            switch (event.key) {
                case 'ArrowUp': newLat += moveBy; break;
                case 'ArrowDown': newLat -= moveBy; break;
                case 'ArrowLeft': newLng -= moveBy; break;
                case 'ArrowRight': newLng += moveBy; break;
                default: return; // ignore that non-arrow keys
            }
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown'){
                props.setLat(newLat);
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight'){
                props.setLng(newLng);
            }



            socket.emit('moveBall', { lat: newLat, lng: newLng });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.lat, props.lng]);

    // Render your ball based on the position state
    return <article>
        {/*todo: would adapt the coordinates to the google map convention*/}
        <img
            src={require('../images/ball.png')}
            // todo: for some reason my computer rendered the downloaded file as jpeg - would change to png
            style={{ width: '75px', height: '75px', backgroundColor: 'transparent' }}
            alt={'ball'}
        />
    </article>;
};

export default BallComponent;
