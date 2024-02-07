import React from 'react';



const GoalComponent = () => {

    return <article >
        <img
            src={require('../images/goal.png')}
            style={{ width: '75px', height: '75px', backgroundColor: 'transparent' }}
            alt={'goal'}
        />
    </article>;
};

export default GoalComponent;
