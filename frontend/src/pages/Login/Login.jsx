import React, { useState } from 'react';
import './login.css'; 
import Navbar2 from "../../components/Navbar2/Navbar2";
import api from '../../services/api'; 
import { useNavigate } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 2. USE O 'api' E REMOVA A URL BASE. DEIXE APENAS O FINAL DO ENDEREÇO.
      const response = await api.post('/users/login', {
        email: email,
        password: password
      });
   


      if (response.status === 200) {
        localStorage.setItem('userId', response.data.id); 
        navigate("/"); 
      }
    } catch (error) {
      setError(error.response?.data || "Erro ao fazer login");
      setSuccess('');
    }
  };

  return (
    <div>
   
      <Navbar2 />
      <div className="login-page-wrapper">
        <div className="container-login">
          <div className="side-bar-login">
            <p>Bem Vindo</p>
            <img className='img-logo' src="src/assets/StartUFC-logo-verde.png" alt="Logo" />
            <a>Não tem conta <br />na Start?</a>
            <a href="/register" className='button_btn_register'>Cadastra-se</a>
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
              <button type="submit" className="button-enter">Entrar</button> 
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;