
import './Germinar.css'
import Img from '../../assets/foto1Start.png'
import Button from '../../components/Button/Button'
import React, { useState } from 'react';

const Germinar = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    alert('Botão clicado!');
  };


  return (
    <section className='germinar' id='germinar-id'>
   
      <h1 className='title-g'>Germinar</h1>
        <div className='germinar-content'>

          <div className='text-germinar'>
            <p>O projeto foi criado com objetivo de auxiliar Startups nas suas fases de criação e desenvolvimento. 
              Apoios como este são de suma importância para a consolidação de novos negócios e para o 
              desenvolvimento regional.
            </p>
            <img src={Img} alt="" className='img-g'/>
          </div>
          <div className='btn-right'>
            <Button text="Ir para Germinar" onClick={handleClick} color="green" />
          </div>
        </div>
    </section>
  )
}

export default Germinar
