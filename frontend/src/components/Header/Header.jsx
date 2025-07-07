import React from 'react'
import './Header.css'
import Image from '../../assets/StartUFC-logo-simples.png'
import Logo from '../../assets/StartUFC-logo.png'
import Button from '../Button/Button'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  
  return (
    <header>
      <div className='header'>
        <div className="header-content">

          {/* Tudo que precisa ser alinhado à esquerda fica aqui dentro */}
          <div className='header-start'>
            <img src={Logo} alt="StartUFC Logo" className='header-logo' />
            <div className='text-initial'>
              <p>Impulsionando ideias, conectando </p>
              <p>futuros: onde a proatividade </p>
              <p> encontra o empreendedorismo</p>
            </div>
            
           <Link to="/register" className="header-cta-button">
          <Button text="Cadastre-se agora" color="green" />
           </Link>
          </div>

 
          <img src={Image} alt="Ilustração" className='header-img' />

        </div>
      </div>
    </header>
  );
};

export default Header;