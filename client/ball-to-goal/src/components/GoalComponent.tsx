import React, { useEffect, useState } from 'react';

interface IGoalComponentProps {
    x: number;
    y: number
}

const GoalComponent = (props:IGoalComponentProps) => {
    const {x, y} = props;


    // Render your ball based on the position state
    return <article style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>
        <img
            src={require('../images/ball.png')}
            style={{ width: '75px', height: '75px', backgroundColor: 'transparent' }}
        />
    </article>;
};

export default GoalComponent;
