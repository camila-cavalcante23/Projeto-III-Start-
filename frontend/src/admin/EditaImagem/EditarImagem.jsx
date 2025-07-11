import React, { useEffect, useState } from "react";
import "./EditarImagem.css";

import api from "../../services/api";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

function EditarImagem() {
    const [imagens, setImagens] = useState([]);

    useEffect(() => {
        fetchImagens();
    }, []);

    const fetchImagens = async () => {
        try {
           
            const response = await api.get("/imagens");
            setImagens(response.data);
        } catch (err) {
            console.error("Erro ao buscar imagens:", err);
        }
    };

    const handleSalvar = async (id) => {
        const imagem = imagens.find((i) => i.id === id);
        try {
          
            await api.put(`/imagens/${id}`, imagem);
            alert("Imagem salva com sucesso!");
        } catch (err) {
            console.error("Erro ao salvar imagem:", err);
        }
    };

    const handleExcluir = async (id) => {
        try {
           
            await api.delete(`/imagens/${id}`);
            setImagens((prev) => prev.filter((i) => i.id !== id));
            alert("Imagem exluida com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir imagem.", err);
        }
    };

    const handleChange = (id, field, value) => {
        setImagens((prev) => 
            prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
        );
    };

    return (
        <div className="editar-imagem">
            <NavbarAdmin/>
        <div className="container-editar">
            <h2>Editar Imagens</h2>
            <div className="grid-cards">
                {imagens.map((imagem) => (
                <div className="card" key={imagem.id}>
                    <img src={imagem.url} alt={imagem.titulo} />
                    <input type="text" value={imagem.titulo} onChange={(e) => handleChange(imagem.id, "titulo", e.target.value)} />
                    
               
                    <textarea value={imagem.descricao || ''} onChange={(e) => handleChange(imagem.id, "descricao", e.target.value)} placeholder="Digite uma descrição..." />

                    <div className="card-buttons">
                        <button className="salvar" onClick={() => handleSalvar(imagem.id)}>Salvar</button>
                        <button className="excluir" onClick={() => handleExcluir(imagem.id)}>Excluir</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default EditarImagem;