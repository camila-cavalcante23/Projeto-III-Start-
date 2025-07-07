

import React, { useState } from 'react';
import './LoginAdmin.css'; 
import Navbar2 from "../../components/Navbar2/Navbar2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('https://localhost:44367/users/login', {
                email: email,
                password: password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                localStorage.setItem('userId', response.data.id); 
                navigate("/"); 
            }
        } catch (error) {
            setError(error.response?.data || "Erro ao fazer login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Navbar2 />
    
            <div className="container-login-admin">
                <div className="side-bar-login-admin">
                    <div></div>
                    <p className="sidebar-text">Faz parte do START?</p>
                    <p className='sidebar-text2'>Faça login para acessar</p>
                    <p></p>
                    <img className='img-logo-admin' src="/src/assets/StartUFC-logo-verde.png" alt="Logo" />
                    <div></div>
                </div>
                <div className="login-info-admin">
                    <h1 className="login-title-admin">Login Administrador</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email" className="login-email-label-admin">Email:</label>
                        <input 
                            type="email" 
                            className="login-email-input-admin" 
                            placeholder="Ex: antonio@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <label htmlFor="password" className="login-password-label-admin">Senha:</label>
                        <input 
                            type="password" 
                            className="login-password-input-admin" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <a href="#" className="reset-password-admin">Esqueceu a senha?</a>
                        <button type="submit" className="button-enter-admin" disabled={isLoading}>
                            {isLoading ? <FaSpinner className="spinner" /> : 'Entrar'}
                        </button> 
                    </form>
                    
                    {error && <p className="login-message login-error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;