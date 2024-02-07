import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://your-server-address");

const BallComponent: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            let newX = position.x;
            let newY = position.y;

            switch (event.key) {
                case 'ArrowUp': newY -= 5; break;
                case 'ArrowDown': newY += 5; break;
                case 'ArrowLeft': newX -= 5; break;
                case 'ArrowRight': newX += 5; break;
                default: return; // Ignore other keys
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
        <img
            src={require('../images/ball.png')}
            style={{ width: '75px', height: '75px', backgroundColor: 'transparent' }}
        />
    </article>;
};

export default BallComponent;
