import React, { useState, useEffect, useRef } from 'react';
import './NavBarAdmn.css';
import { FaBars, FaTimes, FaArrowLeft } from "react-icons/fa";
import Logo from '../../assets/StartUFC-azul.png';
import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/Button/Button';
// 1. MUDANÇA PADRÃO: Trocamos a importação do axios
import api from '../../services/api';

// Renomeado para NavbarAdmin para melhor clareza
function NavbarAdmin() { 
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    // 2. MUDANÇA: Convertido para async/await e usando nossa 'api'
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await api.get(`/users/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.error('Erro ao pegar dados do usuário', error);
                }
            };
            fetchUserData();
        }
    }, []);

    // O restante do código não precisa de alterações na lógica de API
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsOpen(false);
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
        closeMenu();
        navigate('/');
    };

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMenu();
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <nav>
            <div className='navbar'>
                <div className="navbar-left">
                    <button onClick={handleGoBack} className="btn-voltar">
                        <FaArrowLeft /> Voltar
                    </button>

                    <Link to="/" onClick={handleLogoClick}>
                        <img src={Logo} alt="StartUFC Logo" className='navbar-logo' />
                    </Link>
                </div>

                <ul className={isOpen ? "nav-link active" : "nav-link"}>
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
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>


                    {!user && (
                        <li>
                            <Link to="/LoginAdmin" onClick={closeMenu}>
                                <Button text="Login Administrador" color="green" />
                            </Link>
                        </li>
                    )}

                    {user && (
                        <li className='user-info'>
                            <img
                                src={user.foto || 'https://via.placeholder.com/40'} 
                                alt="Perfil"
                                className="user-avatar"
                            />
                        </li>
                    )}
                </ul>
                <button className="menu" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </nav>
    );
}


export default NavbarAdmin;