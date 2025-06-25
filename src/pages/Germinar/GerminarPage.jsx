
import './Germinar.css'
import Img from '../../assets/foto1Start.png'
import Navbar2 from '../../components/Navbar2/Navbar2';
import React, { useState } from 'react';

const GerminarPage = () => {

  return (
    <section className='germinarPage' id='germinar-id'>
       <Navbar2/>
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
          </div>
        </div>
    </section>
  )
}

export default GerminarPage
