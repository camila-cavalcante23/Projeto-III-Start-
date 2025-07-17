import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import "./GerenciaAdmins.css";
import api from "../../services/api";
import { useAuth } from '../../context/AuthContext'; // Importar o contexto de autenticação
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário

function GerenciarAdmins() {
    const [usuarios, setUsuarios] = useState([]);
    const [mensagem, setMensagem] = useState(''); // Para mensagens de sucesso/erro
    // CORREÇÃO AQUI: Adicione setLoadingAuth à desestruturação
    const { user, loadingAuth, setLoadingAuth } = useAuth(); // Obter usuário, estado de carregamento e o setter do AuthContext
    const navigate = useNavigate(); // Hook para navegação

    // Efeito para configurar o token e verificar a autenticação/autorização
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Se não há token, remove o cabeçalho e define mensagem de erro
            delete api.defaults.headers.common['Authorization'];
            setMensagem("Você não está autenticado. Redirecionando para o login...");
            // Redireciona após um pequeno delay para que a mensagem seja vista
            setTimeout(() => navigate('/login'), 2000); 
            return; // Interrompe a execução
        }

        // Verifica se o usuário é admin após o carregamento da autenticação
        if (!loadingAuth) {
            if (!user || !user.isAdmin) { 
                setMensagem("Acesso negado. Você não tem permissão de administrador. Redirecionando...");
                setTimeout(() => navigate('/'), 2000); // Redireciona para a página inicial
            } else {
                fetchUsers(); // Apenas busca os usuários se for admin
            }
        }
    // Removi setLoadingAuth das dependências do useEffect aqui, pois ele é um setter do contexto
    // e não deveria causar re-render desnecessárias ao mudar
    }, [user, loadingAuth, navigate]); // Dependências: user, loadingAuth, navigate para re-executar quando mudarem


    const fetchUsers = async () => {
        try {
            const response = await api.get("/User"); 
            
            const fetchedUsers = response.data.data.map(userBackend => ({
                id: userBackend.id,
                nome: userBackend.name,
                email: userBackend.email,
                isAdmin: userBackend.isAdmin
            }));

            setUsuarios(fetchedUsers);
            setMensagem('');
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setMensagem("Erro ao carregar usuários. Verifique sua conexão ou permissões.");
        }
    };

    const handleSalvar = async (id) => {
        const usuarioToUpdate = usuarios.find(u => u.id === id);
        if (!usuarioToUpdate) {
            setMensagem("Usuário não encontrado para salvar.");
            return;
        }

        const payload = {
            id: usuarioToUpdate.id,
            name: usuarioToUpdate.nome,
            email: usuarioToUpdate.email,
            isAdmin: usuarioToUpdate.isAdmin
        };

        try {
            await api.put(`/User/${id}`, payload); 
            setMensagem("Usuário atualizado com sucesso!");
        } catch (err) {
            console.error("Erro ao salvar usuário:", err);
            const errorMessage = err.response?.data?.message || 'Erro ao salvar usuário.';
            setMensagem(`Erro: ${errorMessage}`);
        }
    };

    const handleExcluir = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
        
        try {
            await api.delete(`/User/${id}`);
            setUsuarios(prev => prev.filter(u => u.id !== id));
            setMensagem("Usuário excluído com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir usuário:", err);
            const errorMessage = err.response?.data?.message || 'Erro ao excluir usuário.';
            setMensagem(`Erro: ${errorMessage}`);
        }
    };

    const handleChange = (id, field, value) => {
        setUsuarios(prev => 
            prev.map(u => u.id === id ? { ...u, [field]: value } : u)
        );
    };

    const handleToggleAdminStatus = (id) => {
        setUsuarios(prev =>
            prev.map(u => 
                u.id === id ? { ...u, isAdmin: !u.isAdmin } : u
            )
        );
    };

    if (loadingAuth || (!user || !user.isAdmin)) {
        return (
            <div className="gerenciar-usuarios">
                <Navbar/>
                <div className="usuarios-container">
                    <h2>Gerenciar Administradores</h2>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                    {!user && <p>Verificando autenticação...</p>}
                    {user && !user.isAdmin && <p>Você não tem permissão para acessar esta página.</p>}
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="gerenciar-usuarios">
            <Navbar/>
            <div className="usuarios-container">
                <h2>Gerenciar Administradores</h2>
                {mensagem && (
                    <p className={`mensagem ${mensagem.includes('Erro:') ? 'error' : 'success'}`}>
                        {mensagem}
                    </p>
                )}
                <div className="usuarios-grid">
                    {usuarios.length > 0 ? (
                        usuarios.map(usuario => (
                            <div className="usuario-card" key={usuario.id}>
                                <label>ID: {usuario.id}</label>
                                <label>Nome:</label>
                                <input 
                                    type="text" 
                                    value={usuario.nome} 
                                    onChange={(e) => handleChange(usuario.id, "nome", e.target.value)} 
                                    placeholder="Nome" 
                                />
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    value={usuario.email} 
                                    onChange={(e) => handleChange(usuario.id, "email", e.target.value)} 
                                    placeholder="Email" 
                                />
                                <div className="admin-status">
                                    <label>Administrador:</label>
                                    <input 
                                        type="checkbox" 
                                        checked={usuario.isAdmin} 
                                        onChange={() => handleToggleAdminStatus(usuario.id)} 
                                    />
                                </div>
                                <div className="usuario-actions">
                                    <button onClick={() => handleSalvar(usuario.id)}>Salvar</button>
                                    {/* Evitar que um admin delete a si mesmo, ou adicione um check */}
                                    {usuario.id !== user.id && ( 
                                        <button className="excluir" onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum usuário encontrado.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default GerenciarAdmins;