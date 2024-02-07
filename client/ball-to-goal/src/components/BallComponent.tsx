import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {serverBaseUrl} from "../constants/constants";


const moveBy = 10; // how much to move the ball

const BallComponent: React.FC = () => {
    const socket = io(serverBaseUrl);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            let newX = position.x;
            let newY = position.y;

            switch (event.key) {
                case 'ArrowUp': newY -= moveBy; break;
                case 'ArrowDown': newY += moveBy; break;
                case 'ArrowLeft': newX -= moveBy; break;
                case 'ArrowRight': newX += moveBy; break;
                default: return; // ignore that non-arrow keys
            }

            setPosition({ x: newX, y: newY });
            socket.emit('moveBall', { x: newX, y: newY });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [position]);

    // Render your ball based on the position state
    return <article style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}>
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
