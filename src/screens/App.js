import './App.css';
import AlcoholItem from '../components/itemAlcohol';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import root from '../index';
import Bubble from '../components/bubble';
import useInterval from '../hooks/useInterval';
import useTimeout from '../hooks/useTimeout';
import Select from 'react-select';

/*
Ingresar graduacion del alcohol
Ingresar cantidad digerida
Ingresar peso
Ingresar sexo
Ingresar tiempo transcurrido

*/

const drinkOptions = [
  { value: 'Otra', label: '? OTRA', graduacion: '', ml: ''}, 
  { value: 'Vino', label: '🍷 VINO', graduacion: 13 , ml: 200},
  { value: 'Vodka', label: '🍸 VODKA', graduacion: 40, ml: 50},
  { value: 'Cerveza', label: '🍺 CERVEZA', graduacion: 8.5, ml: 500},
  { value: 'Sidra', label: '🍾 SIDRA', graduacion: 5, ml: 100},
  { value: 'Sake', label: '🍶 SAKE', graduacion: 15, ml: 150},
  { value: 'Ron', label: '🥃 RON', graduacion: 40, ml: 60},
  { value: 'Tequila', label: '🥃 TEQUILA', graduacion: 50, ml: 60},
  { value: 'Whisky', label: '🥃 WHISKY', graduacion: 43, ml: 100},
  { value: 'Gin', label: '🥃 GIN', graduacion: 37, ml: 50},
]


const customStyles = {
  control: (styles) => ({
      ...styles,
      borderRadius: '20px',
      borderStyle: 'solid',
      borderColor: '#ee6352',
      borderWidth: '2px',
      color: '#ee6352',
      boxShadow: '5px 5px',
      minHeight: '40px',
      height: '55px',
      minWidth: '200px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
    }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: 'transparent',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    background: 'linear-gradient(90deg, blue, red)',
    backgroundClip: 'text',
    backgoundSize: '10%',
    
  }),
  input : (styles, state) => ({ 
      ...styles,
      color: 'transparent',
      margin: 0
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
}





function App() {

  function calcularConcentracion(ml, graduacion, peso, sexo, tiempo) {
    let volumen = ml * (graduacion / 100);
    let masa = volumen * 0.789;
    let alcoholemia;
    if (sexo === 'Hombre') {
      alcoholemia = masa / (peso * 0.75);
    } else {
      alcoholemia = masa / (peso * 0.67);
    }
    alcoholemia = alcoholemia - (0.15 * tiempo);

    return alcoholemia;
  }

  const [alcohol, setAlcohol] = useState(0);
  const [counter, setCounter] = useState(0);
  const [bubblesState, setBubblesState] = useState([]);
  const bubbleRef = useRef(bubblesState);
  bubbleRef.current = bubblesState;

  const [ml, setMl] = useState('');
  const [graduacion, setGraduacion] = useState('');
  const [peso, setPeso] = useState(0);
  const [sexo, setSexo] = useState('Hombre');
  const [tiempo, setTiempo] = useState(0);

  const [error, setError] = useState(false);
  const [status, setStatus] = useState('Todo bien!');



  useInterval(() => {
    createBubble();
  }, 500);

  function createBubble() {
    setBubblesState([...bubblesState, <Bubble key={counter} idBubble={counter} onBubbleClick={destroyBubble}/>]);
    setCounter(counter + 1);
  }

  const destroyBubble = (bubbleNumber) => {
    setBubblesState(bubbleRef.current.filter((bubble) => bubble.key !== bubbleNumber.toString()));
  }

  useEffect(() => {
    if (alcohol >= 0.1 && alcohol <= 1){
      setStatus('Usted podria tener inestabilidad emocional..');
      if (alcohol >= 0.5){
        setStatus('Usted podria tener inestabilidad emocional, tambien no podes manejar')
      }
    } else if (alcohol > 1 && alcohol <= 2){
      setStatus('Usted podria tener problemas de coordinacion..');
    } else if (alcohol > 2 && alcohol <= 3){
      setStatus('Usted podria tener problemas de memoria..');
    } else if (alcohol > 3 && alcohol <= 4){
      setStatus('Usted podria tener problemas de respiracion.. (Te vas a morir llama ambulancia)');
    }
  }, [alcohol]);

  return (
    <div className='app-main' id='app-main'>
      <div className='bubble-container'>{bubblesState}</div>
      <div className='form-container'>
        <div style={{marginTop: '5%', marginLeft: '3.5%'}}>
          <h1 className='title'>Medidor de Alcoholemia</h1>
        </div>
        <div style={{minWidth: '63%', height: '2px', backgroundColor: '#ee6352', marginLeft: '3%', marginTop: '1%'}}/>
        <p style={{marginLeft: '3.5%'}}>By Sebastian Loucim, Agustin Butierrez y Marco Palazzo</p>


        <div style={{marginTop: '3%', overflow:'visible', alignSelf: 'center'}}>
          <Select
            styles={customStyles}
            defaultValue={drinkOptions[0]}
            isClearable={false}
            isRtl={false}
            isSearchable={false}
            name="Bebida"
            options={drinkOptions}
            onChange={(e) => {
              setGraduacion(e.graduacion)
              setMl(e.ml)
            }}
          />
        </div>
        
        <div style={{width: '70%', height: '2px', marginTop: '3%',backgroundColor: 'black', alignSelf: 'center'}}/>

        <div className='input-container' style={{marginTop: '3%'}}>
          <p style={{fontSize: '1em'}}>%</p>
          <input type={'number'} placeholder={'Graduacion del alcohol'} pattern="\d+\.?\d?(?!\d)" className='input' value={graduacion} onChange={(event) => {
            setGraduacion(event.target.value);
            console.log(graduacion);
          }}/>
        </div>

        <div className='input-container' style={{marginTop: '3%'}}>
          <p style={{fontSize: '1em', marginRight: '1%'}}>ml</p>
          <input type={'number'} placeholder={'Cantidad del alcohol'} className='input' value={ml} onChange={(event) => {
            setMl(event.target.value);
            console.log(ml);
          }}/>
        </div>

        <div className='input-container' style={{marginTop: '3%'}}>
          <p style={{fontSize: '1em', marginRight: '1%'}}>kg</p>
          <input type={'number'} placeholder={'Peso corporal'} className='input' onChange={(event) => {
            setPeso(event.target.value);
            console.log(peso);
          }}/>
        </div>

        <div className='input-container' style={{marginTop: '3%', justifyContent: 'space-evenly'}}>
          <div onChange={(event) => {
            setSexo(event.target.value);
            console.log(sexo);
          }}>
            <input type="radio" id="man" name="sexo" value="Hombre"/>
            <label htmlFor="man" className='radial-input-label'>Hombre</label>
          </div>
          <div onChange={(event) => {
            setSexo(event.target.value);
            console.log(sexo);
          }}>
            <input type="radio" id="woman" name="sexo" value="Mujer"/>
            <label htmlFor="woman" className='radial-input-label'>Mujer</label>
          </div>
        </div> 


        <div className='input-container' style={{marginTop: '3%'}}>
          <p style={{fontSize: '1em', marginRight: '1%'}}>hs</p>
          <input type={'number'} placeholder={'Horas transcurridas'} className='input' onChange={(event) => {
            setTiempo(event.target.value);
            console.log(tiempo);
          }}/>
        </div>


        <div className='button' style={{marginTop: '3%'}} onClick={() => {

          if (ml && graduacion && peso && sexo && tiempo && 
              graduacion > 0 && peso > 0 && tiempo > 0 && ml > 0){
                setError(false)
                setAlcohol(alcohol + calcularConcentracion(ml, graduacion, peso, sexo, tiempo));
          } else {
            setError(true);
          }
        }}>
          <p style={{fontSize: '1em', marginRight: '1%', backgroundColor: 'transparent', color: 'white', pointerEvents: 'none'}}>Añadir</p>
        </div>


        <div style={{width: '70%', height: '2px', marginTop: '3%',backgroundColor: 'black', alignSelf: 'center'}}/>
        <h2 style={{alignSelf: 'center'}}>Tu nivel de alcoholemia: {alcohol.toFixed(2)} g/L</h2>
        <h4 style={{alignSelf: 'center', marginTop: '-1%'}}>{status}</h4>
        {!error ? null : <h5 style={{alignSelf: 'center'}}>Introduce todos los campos de manera correcta...</h5>}

        <div style={{width: '100%', height: '5%'}}/>


      </div>
    </div>
  );
}

export default App;
