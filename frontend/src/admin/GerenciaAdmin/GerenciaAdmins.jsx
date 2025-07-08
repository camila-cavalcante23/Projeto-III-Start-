import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import "./GerenciaAdmins.css";
import axios from "axios";

function GerenciarAdmins() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Buscar os administradores na API
        axios.get("https://localhost:44367/admins")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Erro ao buscar administradores", error));
    }, []);

    const handleSalvar = (id) => {
        const usuario = usuarios.find(u => u.id === id);
        axios.put(`https://localhost:44367/admins/${id}`, usuario)
            .then(() => alert("Usuário atualizado com sucesso!"))
            .catch(err => console.error("Erro ao salvar", err));
    };

    const handleExcluir = (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este administradores?")) return;

        axios.delete(`https://localhost:44367/admins/${id}`)
            .then(() => {
                setUsuarios(prev => prev.filter(u => u.id !== id));
                alert("Usuário excluído com sucesso!");
            })
            .catch(err => console.error("Erro ao excluir", err));
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