import React, { useState, useEffect, useRef } from 'react';
import './NavbarAdmn.css';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown, FaBell } from "react-icons/fa";
import Logo from '../../assets/StartUFC-azul.png';
import { Link, useNavigate } from "react-router-dom";
import Button from '../Button/Button';
import { Link as ScrollLink } from 'react-scroll';

//  gestor de autenticação
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

function NavbarAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const notificacoesRef = useRef(null);
    const navigate = useNavigate();

   
    const { user, logout } = useAuth();

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
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
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
                        
                        {/* ==================================================================== */}
                        {/* ||              LINKS SEMPRE VISÍVEIS          || */}
                        {/* ==================================================================== */}
                        {/* Estes links agora estão fora da condição, então sempre aparecerão. */}
    <li>
                        <Link to="/cadastrarMembro" onClick={closeMenu}>
                            Cadastrar Novo Membro
                        </Link>
                    </li>
                    <li>
                        <Link to="/eventosExclusivos" onClick={closeMenu}>
                            Eventos Exclusivos
                        </Link>
                    </li>
                    <li>
                        <Link to="/adicionarImagem" onClick={closeMenu}>
                            Adicionar Imagens
                        </Link>
                    </li>
                    <li>
                        <Link to="/ultimasNoticias" onClick={closeMenu}>
                            Últimas Notícias
                        </Link>
                    </li>

                        {/* A lógica condicional agora aplica-se apenas aos botões de autenticação */}
                        {!user ? (
                            // Se NÃO houver utilizador, mostra os botões de Login
                            <>
                                <li>
                                    <Link to="/login" onClick={closeMenu}>
                                        <Button text="Login" color="green" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/LoginAdmin" onClick={closeMenu}>
                                        <Button text="Login Administrador" color="green" />
                                    </Link>
                                </li>
                            </>
                        ) : (
                            // Se HOUVER utilizador, mostra o menu de perfil e notificações
                            <>
                                <li className="user-menu" ref={userMenuRef}>
                                    <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
                                        <div className="user-icon"><FaUser size={20} /></div>
                                        {/* O nome vem do token JWT, que o nosso AuthContext decodificou */}
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
                    </ul>
                    <button className="menu" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>
        </>
    );
}

export default NavbarAdmin;
