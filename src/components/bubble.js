import './bubble.css';
import React from 'react';
import useTimeout from '../hooks/useTimeout';

function Bubble({idBubble, onBubbleClick}) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const bubbleXPosition = getRandomInt(0, 100);
    
    const bubbleXString = bubbleXPosition.toString() + 'vw';
    console.log(bubbleXString);

    useTimeout(() => {
        onBubbleClick(idBubble);
    }, 4000);

    return (
        <div className='bubble' style={{width: '50px', height: '50px', left: bubbleXString}} >
            <div style={{display: 'flex', width: '70px', height: '100px', marginTop: '20%'}} onClick={() => onBubbleClick(idBubble)}/>
        </div>
    );
}

export default Bubble;
