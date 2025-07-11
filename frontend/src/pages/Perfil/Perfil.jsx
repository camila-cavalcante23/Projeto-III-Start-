import React, { useEffect, useState } from "react";
import './Perfil.css';
import seta from '../../assets/seta2.png';
import logo from '../../assets/StartUFC-logo-verde.png';
// 1. Importamos as ferramentas necessárias
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Perfil = () => {
    // 2. Criamos os estados para guardar os dados, o carregamento e os erros
    const [user, setUser] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 3. O useEffect agora busca DUAS informações da API: os dados do usuário e os seus eventos inscritos.
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            // Se não há usuário logado, redireciona para a página de login
            navigate('/login');
            return;
        }

        const fetchProfileData = async () => {
            try {
                // 4. Usando Promise.all para buscar dados em paralelo, o que é mais eficiente
                const [userResponse, eventosResponse] = await Promise.all([
                    api.get(`/users/${userId}`),
                    api.get(`/users/${userId}/eventos`) // Confirme este endpoint com seu amigo
                ]);

                setUser(userResponse.data);
                setEventos(eventosResponse.data);

            } catch (err) {
                console.error("Erro ao buscar dados do perfil:", err);
                setError("Não foi possível carregar os dados do perfil.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [navigate]);

    // 5. Funções para os botões de ação
    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
            try {
                await api.delete(`/users/${user.id}`);
                alert("Conta excluída com sucesso.");
                handleLogout(); // Desloga o usuário após excluir a conta
            } catch (err) {
                console.error("Erro ao excluir conta:", err);
                alert("Não foi possível excluir a conta. Tente novamente.");
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
                {user ? (
                    <>
                        <img src={user.foto || 'https://via.placeholder.com/150'} alt="Foto do usuário" className="foto-perfil" />
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
                                        <strong>{ev.titulo}</strong> - {new Date(ev.data).toLocaleDateString('pt-BR')}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Você não está cadastrado em nenhum evento.</p>
                        )}
                        <h3 className="config">Configurações</h3>
                        {/* 6. Botões agora são funcionais */}
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