import React, { useEffect, useState } from "react";
import './Perfil.css';
import seta from '../../assets/seta2.png'; 
import logo from '../../assets/StartUFC-logo-verde.png';
import { Link } from 'react-router-dom';  

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulando dados do usuário (substituir depois por dados do backend)
    const userData = JSON.parse(localStorage.getItem("user")) || {
      nome: "Usuário Exemplo",
      email: "usuario@email.com",
      cpf: "000.000.000-00",
      telefone: "(00) 00000-0000",
      foto: "https://via.placeholder.com/150", // Foto genérica
    };
    setUser(userData);
  }, []);

  return (
    <>
    <div className="Nav"> 
    <Link to="/">
          <img src={seta} alt="Voltar" className='seta'/>
        </Link>

      <img src={logo} alt="logo" className="logo"/>

      <div className="Nav1"></div>
      <h2 className="titulo"> Informações pessoais</h2>
    </div>
     
    <div className="perfil-container">

        <div className="traco1 "></div>
        <div className="traco2"></div>
        <h2 className="config">  Configurações</h2>
      {user ? (
        <div>
          <img src={user.foto} alt="Foto do usuário" className="foto-perfil" />
          <p><strong>Nome:</strong> {user.nome}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>CPF:</strong> {user.cpf}</p>
          <p><strong>Telefone:</strong> {user.telefone}</p>
          <button className="edit1">Editar Perfil</button>
          <button className="exclu">Excluir Conta</button>
          <button className="sair"> Sair</button>
        </div>
      ) : (
        <p>Carregando perfil...</p>
      )}
    </div>
    </>
  );
};

export default Perfil;
