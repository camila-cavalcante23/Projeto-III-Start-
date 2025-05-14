import React from 'react'
import './Info.css'
import { SlArrowRightCircle } from "react-icons/sl";
import { Link } from "react-router-dom"

const Info = () => {
  return (
    <div class="grid-container">
      <div className='grid'>
        <div className='box box1'>
          <Link to="/" className='grid-text'></Link>
        </div>
        <div className='box box2'>
        <Link to="/germinar-page" className='grid-text'>Germinar</Link>
          <SlArrowRightCircle />
        </div>
        <div className='box box3'>
          <Link to="/galeria" className='grid-text'>Galeria</Link>
            <SlArrowRightCircle />
        </div>
        <div className='box box4'>
          <Link to="/" className='grid-text'>Cadastre sua Startup</Link>
          <SlArrowRightCircle />
        </div>
       
        <div className="box box5">
          <Link to="/eventos" className="grid-text">Eventos</Link>
         <SlArrowRightCircle />
        </div>

        <div className='box box6'>
        <Link to="/apoiadores" className="grid-text">Apoiadores</Link>
          <SlArrowRightCircle />
        </div>
        <div className='box box7'>
          <Link to="/redesSociais" className='grid-text'>Redes Sociais</Link>
          <SlArrowRightCircle />
        </div>
        <div className='box box8'>
          <Link to="/" className='grid-text'>Acompanhe sua Startup</Link>
          <SlArrowRightCircle />
        </div>
      </div>
    </div>
  )
}

export default Info
