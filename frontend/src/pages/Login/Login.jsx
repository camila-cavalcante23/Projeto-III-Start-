import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import Navbar2 from '../../components/Navbar2/Navbar2'; // Para usuários normais
import { useAuth } from '../../context/AuthContext'; // Importar o contexto de autenticação
import './login.css'; 
import { FaSpinner } from 'react-icons/fa'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const { login } = useAuth(); // <--- ONDE VOCÊ PEGA A FUNÇÃO 'LOGIN' DO CONTEXTO

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const loginData = {
            Login: email, // Corresponde à propriedade esperada pelo backend
            Password: password // Corresponde à propriedade esperada pelo backend
        };

        try {
            const response = await api.post('/authenticate/authenticate', loginData);

            if (response.status === 200 && response.data.success) {
                const token = response.data.data.jwtToken;
                const userClaims = response.data.data.user || {}; // Pega informações do usuário se vierem na resposta, ou um objeto vazio

                // Chama a função 'login' do AuthContext, passando o token e os dados do usuário
                // Isso vai decodificar o token, salvar no localStorage e atualizar o estado 'user'
                // no contexto, o que fará com que o Navbar (e outros componentes que usam useAuth)
                // re-renderizem com as novas informações do usuário.
                await login(token, userClaims); // <--- AQUI ESTÁ A CHAVE DA CORREÇÃO

                navigate("/"); // Redireciona para a página principal após o login
            } else {
                // Caso a API retorne sucesso: false ou status diferente de 200
                setError(response.data.message || 'Erro desconhecido durante o login.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Email ou senha inválidos. Tente novamente.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar2 /> {/* Navbar para usuários não logados ou gerais */}
            <div className="login-page-wrapper">
                <div className="container-login">
                    <div className="side-bar-login">
                        <p>Bem Vindo de Volta!</p>
                        {/* Imagem do logo com caminho corrigido para ser mais robusto */}
                        <img className='img-logo' src="/StartUFC-logo-verde.png" alt="Logo StartUFC" />
                        <p>Não tem uma conta?</p>
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