import React, { useState } from 'react';
import './login.css'; 
import Navbar2 from "../../components/Navbar2/Navbar2";
import axios from 'axios';
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
      const response = await axios.post('https://localhost:44367/users/login', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
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
      <div className="container-login">
        <div className="side-bar-login">
          <div></div>
          <p style={{ color: 'white' }}>Bem Vindo</p>
          <img className='img-logo' src="src/assets/StartUFC-logo-verde.png" alt="Logo" />
          <a style={{ color: 'white' }}>Não tem conta na Start?</a>
          <a href="/register" className='button_btn_register'>Cadastra-se</a>
          <div></div>
        </div>
        <div className="login-info">
          <h1 className="login-title">Faça Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="login-email-label">Email:</label>
            <input 
              type="email" 
              className="login-email-input" 
              placeholder="Ex: antonio@gmail.com" 
              tabIndex="1" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <br />
            <label htmlFor="password" className="login-password-label">Senha:</label>
            <input 
              type="password" 
              className="login-password-input" 
              tabIndex="2" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <br />
            <a tabIndex="4" href="URL" className="reset-password">Esqueceu a senha?</a>
            <br />
            <button type="submit" className="button-enter" tabIndex="3" >Entrar</button> 
          </form>
          
          {/* {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>} */}

        </div>
      </div>
    </div>
  );
};

export default Login;

