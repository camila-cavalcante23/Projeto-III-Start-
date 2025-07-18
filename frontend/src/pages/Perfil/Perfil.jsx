import React, { useEffect, useState } from "react";
import './Perfil.css';
import seta from '../../assets/seta2.png';
import logo from '../../assets/StartUFC-logo-verde.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

// 1. IMPORTAMOS O NOSSO GESTOR DE AUTENTICAÇÃO
import { useAuth } from '../../context/AuthContext';

const Perfil = () => {
    // 2. OBTEMOS O UTILIZADOR E A FUNÇÃO DE LOGOUT DO NOSSO CONTEXTO
    // O 'user' já contém as informações decodificadas do token (como nome, email e id).
    const { user, logout } = useAuth();
    
    // Este estado guardará os detalhes completos do utilizador que vêm da API
    const [userDetails, setUserDetails] = useState(null);
    const [eventos, setEventos] = useState([]); // Mantemos o estado para os eventos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchProfileData = async () => {
            try {
                
                const userId = user.nameid || user.sub;

                // Buscamos os detalhes completos do utilizador
                const userResponse = await api.get(`/user/${userId}`);
                setUserDetails(userResponse.data.data);

                // NOTA: A busca de eventos foi comentada porque o endpoint `/user/${userId}/eventos`
                // não parece existir no backend. Quando o seu colega o criar, podemos descomentar esta parte.
                /*
                const eventosResponse = await api.get(`/user/${userId}/eventos`);
                setEventos(eventosResponse.data);
                */

            } catch (err) {
                console.error("Erro ao buscar dados do perfil:", err);
                setError("Não foi possível carregar os dados do perfil.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user, navigate]); // A dependência [user] garante que isto roda quando o utilizador muda

    // 4. A FUNÇÃO DE LOGOUT AGORA USA O MÉTODO CENTRAL DO CONTEXTO
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDeleteAccount = async () => {
        // Usamos uma confirmação simples, mas o ideal seria um modal personalizado.
        if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
            try {
                const userId = user.nameid || user.sub;
                await api.delete(`/user/${userId}`);
                // Usamos a função de logout central para limpar tudo
                handleLogout(); 
            } catch (err) {
                console.error("Erro ao excluir conta:", err);
                setError("Não foi possível excluir a conta. Tente novamente.");
            }
        }
    };

    if (loading) {
        return <div className="loading">Carregando perfil...</div>;
    }

    if (error) {
        return <div className="no-news">{error}</div>;
    }

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
                {/* 5. MOSTRAMOS OS DADOS VINDOS DO 'userDetails' */}
                {userDetails ? (
                    <>
                        <img src={userDetails.foto || 'https://placehold.co/150x150/a7e5d5/333333?text=Perfil'} alt="Foto do usuário" className="foto-perfil" />
                        <p><strong>Nome:</strong> {userDetails.name}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        {/* As propriedades Cpf e Phone precisam de ser retornadas pela API no endpoint GetById */}
                        <p><strong>CPF:</strong> {userDetails.cpf || 'Não informado'}</p>
                        <p><strong>Telefone:</strong> {userDetails.phone || 'Não informado'}</p>
                        
                        <div className="traco2"></div>
                        <h3 className="config">Eventos Cadastrados</h3>
                        {eventos.length > 0 ? (
                            <ul className="eventos-lista">
                                {eventos.map(ev => (
                                    <li key={ev.id}>
                                        <strong>{ev.titulo}</strong> - {new Date(ev.data).toLocaleDateString('pt-BR')}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Você não está cadastrado em nenhum evento.</p>
                        )}
                        <h3 className="config">Configurações</h3>
                        <div className="botoes">
                            <Link to="/editar-perfil">
                                <button className="edit1">Editar Perfil</button>
                            </Link>
                            <button className="exclu" onClick={handleDeleteAccount}>Excluir Conta</button>
                            <button className="sair" onClick={handleLogout}>Sair</button>
                        </div>
                    </>
                ) : (
                    <p>Não foi possível carregar os dados do usuário.</p>
                )}
            </div>
        </>
    );
};

export default Perfil;
