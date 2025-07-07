import React, { useState } from 'react';
import './register.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cpf', cpf);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://localhost:44367/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });

    if (response.status === 200) {
      setSuccess('Conta criada com sucesso!');
      setTimeout(() => {
        navigate('/login'); 
      }, 1500);
    }
    } catch (error) {
      setError(error.response?.data || 'Erro ao criar conta');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
    <Navbar2 />
    <div className="register-page-wrapper">
        
        <div className="container-register">
            <div className="side-bar-register">
  
                <p>Bem Vindo</p>
                <img className='img-logo' src="/src/assets/StartUFC-logo-verde.png" alt="Logo" />
                <p>Já tem conta na Start?</p>
                <a href="/login" className='button-btn-login'>Logar</a>
            </div>
            <div className="register-info">
                <h1 className="register-title">Crie sua conta</h1>
                <form onSubmit={handleRegister}>
                
                    <label htmlFor="full-name" className="register-full-name-label">Nome Completo:</label>
                    <input
                        type="text"
                        className="register-full-name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="tax-number" className="register-tax-number-label">CPF:</label>
                    <input
                        type="text"
                        className="register-tax-number-input"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="register-email-label">Email:</label>
                    <input
                        type="email"
                        className="register-email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: antonio@gmail.com"
                        required
                    />
                    <label htmlFor="phone" className="register-phone-label">Telefone:</label>
                    <input
                        type="tel"
                        className="register-phone-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (88) 99657 - 5242"
                        required
                    />
                    <label htmlFor="password" className="register-password-label">Senha:</label>
                    <input
                        type="password"
                        className="register-password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="image" className="register-image-label">Imagem (opcional):</label>
                    <input
                        type="file"
                        className="register-image-input"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type="submit" className="create-account-button" disabled={loading}>
                        {loading ? 'Criando...' : 'Criar Conta'}
                    </button> 
                </form>
                {error && <p className="register-message register-error-message">{error}</p>}
                {success && <p className="register-message register-success-message">{success}</p>}
            </div>
        </div>
    </div>
    </div>
);
};

export default Register;