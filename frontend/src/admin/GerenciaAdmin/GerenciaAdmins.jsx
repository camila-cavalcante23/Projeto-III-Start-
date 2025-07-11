import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import "./GerenciaAdmins.css";
// 1. MUDANÇA PADRÃO: Trocamos a importação
import api from "../../services/api";

function GerenciarAdmins() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // 2. MUDANÇA: Convertido para async/await e usando 'api.get'
        const fetchAdmins = async () => {
            try {
                const response = await api.get("/admins");
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar administradores", error);
            }
        };
        fetchAdmins();
    }, []);

    const handleSalvar = async (id) => {
        const usuario = usuarios.find(u => u.id === id);
        try {
            // 3. MUDANÇA: Convertido para async/await e usando 'api.put'
            await api.put(`/admins/${id}`, usuario);
            alert("Usuário atualizado com sucesso!");
        } catch (err) {
            console.error("Erro ao salvar", err);
        }
    };

    const handleExcluir = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este administrador?")) return;
        
        try {
            // 4. MUDANÇA: Convertido para async/await e usando 'api.delete'
            await api.delete(`/admins/${id}`);
            setUsuarios(prev => prev.filter(u => u.id !== id));
            alert("Usuário excluído com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir", err);
        }
    };

    const handleChange = (id, field, value) => {
        setUsuarios(prev => 
            prev.map(u => u.id === id ? { ...u, [field]: value } : u)
        );
    };

    return (
        <div className="gerenciar-usuarios">
            <Navbar/>
            <div className="usuarios-container">
                <h2>Gerenciar Administradores</h2>
                <div className="usuarios-grid">
                    {usuarios.map(usuario => (
                        <div className="usuario-card" key={usuario.id}>
                            <input type="text" value={usuario.nome} onChange={(e) => handleChange(usuario.id, "nome", e.target.value)} placeholder="Nome" />
                            <input type="email" value={usuario.email} onChange={(e) => handleChange(usuario.id, "email", e.target.value)} placeholder="Email" />
                            <div className="usuario-actions">
                                <button onClick={() => handleSalvar(usuario.id)}>Salvar</button>
                                <button className="excluir" onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default GerenciarAdmins;