import React, { useEffect, useState } from 'react';

interface IGoalComponentProps {
    lat: number;
    lng: number
}

const GoalComponent = (props:IGoalComponentProps) => {
    const {lat, lng} = props;

    return <article >
        {/*todo: would adapt the coordinates to the google map convention*/}
        <img
            src={require('../images/goal.png')}
            // todo: for some reason my computer rendered the downloaded file as jpeg - would change to png
            style={{ width: '75px', height: '75px', backgroundColor: 'transparent' }}
            alt={'goal'}
        />
    </article>;
};

export default GoalComponent;
