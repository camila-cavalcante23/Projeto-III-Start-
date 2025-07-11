import React, { useState, useEffect } from 'react'; // 1. Importamos useEffect
import { useNavigate, Link } from "react-router-dom";
import './EditarPerfil.css'; 
import seta from '../../assets/seta2.png'; 
import logo from '../../assets/StartUFC-logo-verde.png'; 
// 1. Importamos nossa api
import api from '../../services/api';

const EditarPerfil = () => {
  const navigate = useNavigate();
  
  // 2. Criamos estados para guardar os dados, o carregamento e os erros
  const [user, setUser] = useState({ nome: '', email: '', cpf: '', telefone: '', foto: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. Usamos useEffect para buscar os dados atuais do usuário na API
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await api.get(`/users/${userId}`);
          setUser(response.data);
        } catch (err) {
          console.error("Erro ao buscar dados do perfil", err);
          setError("Não foi possível carregar os dados do perfil.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      // Se não houver ID, redireciona para o login
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 4. A função handleSubmit agora é async e envia os dados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Usamos o método PUT para atualizar o recurso completo do usuário
      await api.put(`/users/${user.id}`, user);
      
      alert("Perfil atualizado com sucesso!");
      navigate("/perfil"); // Redireciona de volta ao perfil
    } catch (err) {
      console.error("Erro ao atualizar o perfil", err);
      alert("Erro ao atualizar o perfil. Tente novamente.");
    }
  };

  if (loading) {
    return <div>Carregando perfil...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="Nav"> 
        <Link to="/perfil"> {/* Alterado para voltar para a página de perfil */}
          <img src={seta} alt="Voltar" className='seta'/>
        </Link>
        <img src={logo} alt="logo" className="logo"/>
        <div className="Nav1"></div>
        <h2 className="titulo">Editar Perfil do Usuário</h2>
      </div>

      <div className="editar-perfil-container">
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" value={user.nome || ''} onChange={handleChange} placeholder="Nome" required />
          <input type="email" name="email" value={user.email || ''} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="cpf" value={user.cpf || ''} onChange={handleChange} placeholder="CPF" required />
          <input type="text" name="telefone" value={user.telefone || ''} onChange={handleChange} placeholder="Telefone" required />
          <input type="text" name="foto" value={user.foto || ''} onChange={handleChange} placeholder="URL da Foto" />
          {/* 5. Removi o campo de senha. A atualização de senha deve ser um processo separado e mais seguro. */}
          <button type="submit">Salvar Alterações</button>
        </form>
      </div>
    </>
  );
};

export default EditarPerfil;