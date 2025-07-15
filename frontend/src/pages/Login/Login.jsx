import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import Navbar2 from '../../components/Navbar2/Navbar2';
import { useAuth } from '../../context/AuthContext';
import './login.css'; 
import { FaSpinner } from 'react-icons/fa'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Adicionando estado de loading
    const navigate = useNavigate();
     const { login } = useAuth();

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
                navigate("/");
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
            <div className="login-page-wrapper">
                <div className="container-login">
                    <div className="side-bar-login">
                        <p>Bem Vindo de Volta!</p>
                        <img className='img-logo' src="/src/assets/StartUFC-logo-verde.png" alt="Logo" />
                        <p>Não tem uma conta?</p>
                        {/* Usando o componente Link para navegação correta em React */}
                        <Link to="/register" className='button_btn_register'>Cadastre-se</Link>
                    </div>
                    <div className="login-info">
                        <h1 className="login-title">Faça Login</h1>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="email" className="login-email-label">Email:</label>
                            <input
                                type="email"
                                className="login-email-input"
                                placeholder="Ex: antonio@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <br />
                            <label htmlFor="password" className="login-password-label">Senha:</label>
                            <input
                                type="password"
                                className="login-password-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <br />
                            <a href="#" className="reset-password">Esqueceu a senha?</a>
                            <br />
                            <button type="submit" className="button-enter" disabled={loading}>
                                {loading ? <FaSpinner className="spinner" /> : 'Entrar'}
                            </button>
                        </form>
                        {error && <p className="login-message login-error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
