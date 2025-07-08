import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown, FaBell } from "react-icons/fa";
import Logo from '../../assets/StartUFC-azul.png';
import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/Button/Button';
import { Link as ScrollLink } from 'react-scroll';
import axios from 'axios';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificacoesOpen, setNotificacoesOpen] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);
    const userMenuRef = useRef(null);
    const notificacoesRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`https://localhost:44367/users/${userId}`)
                .then(response => {
                    setUser(response.data);

                    // Simulando notificações para o usuário logado
                    setNotificacoes([
                        { id: 1, mensagem: "Você está inscrito no evento: Workshop React" },
                        { id: 2, mensagem: "Novo evento publicado: Hackathon 2025" }
                    ]);
                })
                .catch(error => {
                    console.error('Erro ao pegar dados do usuário', error);
                    localStorage.removeItem('userId');
                });
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (notificacoesRef.current && !notificacoesRef.current.contains(event.target)) {
                setNotificacoesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        if (newIsOpen) {
            document.body.classList.add('menu-aberto');
        } else {
            document.body.classList.remove('menu-aberto');
        }
    };

    const closeMenu = () => {
        if (isOpen) {
            setIsOpen(false);
            document.body.classList.remove('menu-aberto');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setUser(null);
        setMenuOpen(false);
        closeMenu();
        navigate('/');
    };

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                            <>
                                <li className="notificacoes" ref={notificacoesRef}>
                                    <div onClick={() => setNotificacoesOpen(!notificacoesOpen)} className="notificacao-icon">
                                        <FaBell size={20} />
                                        {notificacoes.length > 0 && <span className="badge">{notificacoes.length}</span>}
                                    </div>
                                    {notificacoesOpen && (
                                        <div className="dropdown-notificacoes">
                                            {notificacoes.map(n => (
                                                <div key={n.id} className="notificacao-item">{n.mensagem}</div>
                                            ))}
                                        </div>
                                    )}
                                </li>

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
                            </>
                        )}

                        {!user && (
                            <li>
                                <Link to="/LoginAdmin" onClick={closeMenu}>
                                    <Button text="Login Administrador" color="green" />
                                </Link>
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
