import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EditarPerfil.css';  
import { Link } from 'react-router-dom'; 
import seta from '../../assets/seta2.png'; 
import logo from '../../assets/StartUFC-logo-verde.png';  

const EditarPerfil = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  
  const [user, setUser] = useState(storedUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user)); // Simulação de salvamento
    alert("Perfil atualizado com sucesso!");
    navigate("/perfil"); // Redireciona de volta ao perfil
  };

  return (
   <>
    <div className="Nav"> 
    <Link to="/">
          <img src={seta} alt="Voltar" className='seta'/>
        </Link>
      <img src={logo} alt="logo" className="logo"/>
      <div className="Nav1"></div>
      <h2 className="titulo">Perfil do Usuário</h2>
    </div>


    <div className="editar-perfil-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={user.nome} onChange={handleChange} placeholder="Nome" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="cpf" value={user.cpf} onChange={handleChange} placeholder="CPF" required />
        <input type="text" name="telefone" value={user.telefone} onChange={handleChange} placeholder="Telefone" required />
        <input type="text" name="foto" value={user.foto} onChange={handleChange} placeholder="URL da Foto" />
        <input type="text" name="senha" value={user.foto} onChange={handleChange} placeholder="Senha" />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>

    </>
  );
};

export default EditarPerfil;
