import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { FaBars } from "react-icons/fa6"
import Logo from '../../assets/StartUFC-azul.png'
import { Link } from "react-router-dom"
import { FaTimes, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import Button from '../../components/Button/Button'
import { Link as ScrollLink} from 'react-scroll'
import axios from 'axios';  

function Navbar() {

const [isOpen, setIsOpen] = useState(false) 
const [user, setUser] = useState(null);
const [menuOpen, setMenuOpen] = useState(false);


useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('userId recuperado do localStorage:', userId); 
    
    if (userId) {
      axios.get(`https://localhost:44367/users/${userId}`)
        .then(response => {
          setUser(response.data);  
          console.log('User data loaded:', response.data);
        })

        
        .catch(error => {
          console.error('Erro ao pegar dados do usuário', error);
        });
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <>
        <nav> 
            <div className='navbar'>

                <Link to="/">
                    <img src={Logo} alt="" className='navbar-logo'/>
                </Link>
            
                <ul className={isOpen ? "nav-link active" : "nav-link"}>
                    
                    <li>
                        <ScrollLink to="about-id" smooth={true} offset={-70} duration={500}>Quem Somos</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="news-id" smooth={true} offset={-70} duration={500}>Notícias</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="germinar-id" smooth={true} offset={-70} duration={500}>Germinar</ScrollLink>
                    </li>

                    {!user ? (
                        <li>
                        <Link to="/login">
                            <Button text="Login" color="green" />
                        </Link>
                        </li>
                    ) : (
                        
                        <li className="user-menu">
                            <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
                                <div className="user-icon">
                                    <FaUser size={20} />
                                </div>
                                <span>{user.name}</span>
                                <FaChevronDown size={14} />
                            </div>

                            {menuOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/perfil" className='profile-name'>Meu Perfil</Link>
                                    <div className='btn-leave'>
                                        <button onClick={handleLogout} ><FaSignOutAlt /> Sair</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    )}  
                </ul>

                <button className="menu" onClick={toggleMenu}>
                    {isOpen ? <FaTimes/> : <FaBars/>}
                </button>

            </div>
        </nav>
    </>
  )
}

export default Navbar