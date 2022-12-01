import './App.css';
import AlcoholItem from '../components/itemAlcohol';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import root from '../index';
import Bubble from '../components/bubble';
import useInterval from '../hooks/useInterval';
import useTimeout from '../hooks/useTimeout';

/*
Ingresar graduacion del alcohol
Ingresar cantidad digerida
Ingresar peso
Ingresar sexo
Ingresar tiempo transcurrido

*/



function App() {

  const [counter, setCounter] = useState(0);

  const [bubblesState, setBubblesState] = useState([]);
  const bubbleRef = useRef(bubblesState);
  bubbleRef.current = bubblesState;

  useInterval(() => {
    createBubble();
  }, 500);

  function createBubble() {
    setBubblesState([...bubblesState, <Bubble key={counter} idBubble={counter} onBubbleClick={destroyBubble}/>]);
    // setTimeout(() => {
    //   setBubblesState(bubbleRef.current.filter((bubble) => bubble.key !== counter.toString()));
    // }, 5000);
    setCounter(counter + 1);
    //console.log(bubblesState);
  }

  const destroyBubble = (bubbleNumber) => {
    setBubblesState(bubbleRef.current.filter((bubble) => bubble.key !== bubbleNumber.toString()));
  }

  return (
    <div className='app-main' id='app-main'>
      <div className='bubble-container'>{bubblesState}</div>
      <div className='form-container'>
        <div style={{marginTop: '5%', marginLeft: '3.5%'}}>
          <h1 className='title'>Medidor de Alcoholemia</h1>
        </div>
        <div style={{minWidth: '63%', height: '2px', backgroundColor: '#ee6352', marginLeft: '3%', marginTop: '1%'}}/>
        <p style={{marginLeft: '3.5%'}}>By Sebastian Loucim, Agustin Butierrez y Marco Palazzo</p>

        
        <div className='input-container'>
          <p style={{fontSize: '1em'}}>%</p>
          <input type={'number'} placeholder={'Graduacion del alcohol'} className='input'/>
        </div>
        <div style={{width: '100%', height: '5%'}}/>
        <div className='input-container'>
          <p style={{fontSize: '1em', marginRight: '1%'}}>ml</p>
          <input type={'number'} placeholder={'Cantidad del alcohol'} className='input'/>
        </div>
        {/* <input type={'text'} placeholder={'Graduacion del alcohol'} className='input'/>
        <input type={'text'} placeholder={'Cantidad digerida'} className='input'/>
        <input type={'text'} placeholder={'Peso'} className='input'/>
        <input type={'text'} placeholder={'Sexo'} className='input'/>
        <input type={'text'} placeholder={'Tiempo transcurrido'} className='input'/> */}
        {/* <button className='button'>AÑADIR</button> */}
      </div>
    </div>
  );
}

export default App;
