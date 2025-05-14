import React from 'react'
import './Footer.css'
import Logo from '../../assets/StartUFC-logo-verde.png'
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillTikTok } from "react-icons/ai";


const Footer = () => {
  return (
    <footer>
        <div className='footer-content'>
            <div className='footer-grid'>
                <img src={ Logo } alt="" className='footer-logo'/>

                <div className='social-icons'>
                    <h2>siga nossas redes</h2>
                    <a href="https://www.instagram.com/startufc/" target="_blank" rel="noopener noreferrer">
                    <FaInstagramSquare />
                    </a>
                    <a href="https://www.tiktok.com/@startufc" target="_blank" rel="noopener noreferrer">
                    <AiFillTikTok />
                    </a>
                    <a href="https://www.linkedin.com/in/startufc-programa-de-incentivo-ao-empreendedorismo-9bbb61289/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                    </a>

                    <h2>contate-nos</h2>
                    <a href="mailto:startufc@crateus.ufc.br" >
                    <MdEmail />
                    </a>
                </div>
            </div>
            
            <hr />

            <div className='footer-copyright'>
                <div className='copyright'>
                    <p>&copy; 2025 StartUFC</p> 
                    <p>Todos os direitos reservados.</p>
                </div>
        
                <div className='address'>
                    <p>Avenida Professora Machadinha Lima, S/N, Príncipe Imperial, </p>
                    <p>Crateús-CE, CEP 63708-825</p>
                </div>
            </div>

        </div>
    </footer>
  )
}

export default Footer
