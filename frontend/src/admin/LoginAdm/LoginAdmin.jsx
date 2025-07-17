import React, { useState } from 'react';
import './LoginAdmin.css'; 
import Navbar2 from "../../components/Navbar2/Navbar2";
// 1. MUDANÇA PADRÃO: Trocamos a importação do axios pela nossa 'api'
import api from '../../services/api'; 
import { useNavigate } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    //useAuth(); 

const [loading, setLoading] = useState(false); // Adicionando estado de loading

      const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // 1. DADOS CORRETOS PARA A API
        // O backend espera um objeto com as propriedades 'Login' e 'Password'
        const loginData = {
            Login: email,
            Password: password
        };

        try {
            // 2. ENDPOINT CORRETO
            // A rota correta é '/authenticate/authenticate'
            const response = await api.post('/authenticate/authenticate', loginData);

            // 3. LÓGICA DE SUCESSO CORRETA (TRATAMENTO DO TOKEN)
            if (response.status === 200 && response.data.success) {
                // O token JWT é a "chave" que a API nos dá
                const token = response.data.data.jwtToken;

                // Guardamos o token no localStorage para o utilizador continuar logado
                localStorage.setItem('authToken', token);

                // Configuramos o 'api' para enviar o token em todas as futuras requisições
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Redirecionamos para a página principal ou para um dashboard
                navigate("/adminDashboard");
            }
        } catch (err) {
            // 4. TRATAMENTO DE ERRO MELHORADO
            const errorMessage = err.response?.data?.message || 'Email ou senha inválidos. Tente novamente.';
            setError(errorMessage);
        } finally {
            setLoading(false);
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