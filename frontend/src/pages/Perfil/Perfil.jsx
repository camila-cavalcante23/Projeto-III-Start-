import React, { useEffect, useState } from "react";
import './Perfil.css';
import seta from '../../assets/seta2.png';
import logo from '../../assets/StartUFC-logo-verde.png';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {
      nome: "Usuário Exemplo",
      email: "usuario@email.com",
      cpf: "000.000.000-00",
      telefone: "(00) 00000-0000",
      foto: "https://via.placeholder.com/150",
    };
    setUser(userData);

    // Simulando eventos do usuário
    const eventosData = JSON.parse(localStorage.getItem("eventos")) || [
      { id: 1, titulo: "Evento 1", data: "2025-07-10" },
      { id: 2, titulo: "Evento 2", data: "2025-08-01" }
    ];
    setEventos(eventosData);
  }, []);

  return (
    <>
      <div className="Nav">
        <Link to="/">
          <img src={seta} alt="Voltar" className='seta' />
        </Link>

        <img src={logo} alt="logo" className="logo" />
        <h2 className="titulo">Informações pessoais</h2>
      </div>

      <div className="Nav1"></div>

      <div className="perfil-container">
        <h2>Perfil do Usuário</h2>
        <div className="traco1"></div>

        {user ? (
          <>
            <img src={user.foto} alt="Foto do usuário" className="foto-perfil" />
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
            <p><strong>Telefone:</strong> {user.telefone}</p>

            <div className="traco2"></div>

            <h3 className="config">Eventos Cadastrados</h3>
            {eventos.length > 0 ? (
              <ul className="eventos-lista">
                {eventos.map(ev => (
                  <li key={ev.id}>
                    <strong>{ev.titulo}</strong> - {ev.data}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Você não está cadastrado em nenhum evento.</p>
            )}

            <h3 className="config">Configurações</h3>
            <div className="botoes">
              <button className="edit1">Editar Perfil</button>
              <button className="exclu">Excluir Conta</button>
              <button className="sair">Sair</button>
            </div>
          </>
        ) : (
          <p>Carregando perfil...</p>
        )}
      </div>
    </>
  );
};

export default Perfil;
