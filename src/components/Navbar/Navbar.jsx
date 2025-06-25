import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import Logo from '../../assets/StartUFC-azul.png';
import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/Button/Button';
import { Link as ScrollLink } from 'react-scroll';
import axios from 'axios';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    // Efeito para buscar os dados do usuário ao carregar o componente
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`https://localhost:44367/users/${userId}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Erro ao pegar dados do usuário', error);
                    // Se o usuário não for encontrado ou houver erro, limpa o storage
                    localStorage.removeItem('userId');
                });
        }
    }, []);

    // Efeito para fechar o dropdown do usuário ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // Controla a abertura/fechamento do menu mobile e trava o scroll da página
    const toggleMenu = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        if (newIsOpen) {
            document.body.classList.add('menu-aberto');
        } else {
            document.body.classList.remove('menu-aberto');
        }
    };

    // Fecha o menu mobile (usado ao clicar nos links)
    const closeMenu = () => {
        if (isOpen) {
            setIsOpen(false);
            document.body.classList.remove('menu-aberto');
        }
    };

    // Função de logout
    const handleLogout = () => {
        localStorage.removeItem('userId');
        setUser(null);
        setMenuOpen(false);
        closeMenu(); // Garante que o menu mobile feche ao deslogar
        navigate('/'); // Redireciona para a home
    };

    const handleLogoClick = () => {
  // Comanda a janela a rolar para o topo com uma animação suave
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Também garante que o menu mobile seja fechado, caso esteja aberto
  closeMenu();
};

    return (
        <>
            <nav>
                <div className='navbar'>
                  <Link to="/" onClick={handleLogoClick}>
                    <img src={Logo} alt="StartUFC Logo" className='navbar-logo' />
                          </Link>

                    <ul className={isOpen ? "nav-link active" : "nav-link"}>
                        <li>
                            <ScrollLink to="about-id" smooth={true} offset={-70} duration={500} onClick={closeMenu}>
                                Quem Somos
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="news-id" smooth={true} offset={-70} duration={500} onClick={closeMenu}>
                                Notícias
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="germinar-id" smooth={true} offset={-70} duration={500} onClick={closeMenu}>
                                Germinar
                            </ScrollLink>
                        </li>

                        {!user ? (
                            <li>
                                <Link to="/login" onClick={closeMenu}>
                                    <Button text="Login" color="green" />
                                </Link>
                            </li>
                        ) : (
                            <li className="user-menu" ref={userMenuRef}>
                                <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
                                    <div className="user-icon">
                                        <FaUser size={20} />
                                    </div>
                                    <span>{user.name}</span>
                                    <FaChevronDown size={14} className={`chevron-icon ${menuOpen ? 'open' : ''}`} />
                                </div>
                                {menuOpen && (
                                    <div className="dropdown-menu">
                                        <Link to="/perfil" onClick={() => { setMenuOpen(false); closeMenu(); }}>
                                            <FaUser /> Meu Perfil
                                        </Link>
                                        <button onClick={handleLogout}>
                                            <FaSignOutAlt /> Sair
                                        </button>
                                    </div>
                                )}
                            </li>
                        )}
                    </ul>

                    <button className="menu" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;