import React, { useState } from 'react';
import './NovoMembro.css';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import api from '../../services/api'; 
import { useNavigate } from 'react-router-dom';

const NovoMembro = () => { 

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
    formData.append('cpf', cpf); // O backend espera 'cpf' ou 'matricula'? Verifique se o nome do campo está correto.
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);

    if (image) {
      formData.append('image', image);
    }

    try {
      // 2. MUDANÇA PADRÃO: Usamos 'api.post' e removemos a URL base.
      // O cabeçalho 'Content-Type' é adicionado automaticamente pelo Axios
      // quando ele detecta que você está enviando um FormData.
      const response = await api.post('/users/register', formData);

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
      <NavbarAdmin/>
      <div className="container-register-membro">
        <div className="side-bar-register-membro">
          <div></div>
          <div></div>
          <p id='ti1' style={{ color: 'white' }}>Bem Vindo</p>
          <img className='img-logo' src="src/assets/StartUFC-logo-verde.png" alt="Logo" />
          <div></div>
        </div>
        <div className="register-info-membro">
          <h1 className="register-title-membro">Adicionar Novo Membro</h1>
          <form onSubmit={handleRegister}>
            <label htmlFor="full-name" className="register-full-name-label-membro">Nome Completo:</label>
            <input
              type="text"
              className="register-full-name-input-membro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            {/* O label diz "Matricula", mas o código usa "cpf". Verifique qual o correto para o backend */}
            <label htmlFor="tax-number" className="register-tax-number-label-membro">Matricula:</label>
            <input
              type="text"
              className="register-tax-number-input-membro"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <br />
            <label htmlFor="email" className="register-email-label-membro">Email:</label>
            <input
              type="email"
              className="register-email-input-membro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: antonio@gmail.com"
              required
            />
            <br />
            <label htmlFor="phone" className="register-phone-label-membro">Telefone:</label>
            <input
              type="tel"
              className="register-phone-input-membro"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: (88) 99657 - 5242"
              required
            />
            <br />
            <label htmlFor="password" className="register-password-label-membro">Senha:</label>
            <input
              type="password"
              className="register-password-input-membro"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label htmlFor="image" className="register-image-label-membro">Imagem (opcional):</label>
            <input
              type="file"
              className="register-image-input-membro"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <br />
            <button type="submit" className="create-account-button-membro" tabIndex="3">Criar Conta</button> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default NovoMembro;