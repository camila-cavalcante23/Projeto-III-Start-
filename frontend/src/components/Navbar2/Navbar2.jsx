import React, { useState } from 'react'
import './Navbar2.css'
import { FaBars } from "react-icons/fa6"
import seta from '../../assets/seta.png'
import { Link } from "react-router-dom"
import { FaTimes } from 'react-icons/fa'

function Navbar2() {

const [isOpen, setIsOpen] = useState(false) 
const toggleMenu = () => setIsOpen(!isOpen)

  
  return (
    <>
        <nav className='nav2'> 
            <div className='navbar2'>

                <Link to="/">
                    <img src={seta} alt="" className='navbar2-seta'/>
                </Link>
            </div>
        </nav>
    </>
  )
}

export default Navbar2