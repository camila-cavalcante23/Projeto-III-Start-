import React, { useEffect, useState } from "react";
import "./EditaNoticias.css";

import api from "../../services/api";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

function EditaNoticias() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = async () => {
        try {
            // 2. MUDANÇA PADRÃO: Usamos 'api.get'
            const response = await api.get("/noticias");
            setNoticias(response.data);
        } catch (err) {
            console.error("Erro ao buscar notícias:", err);
        }
    };

    const handleSalvar = async (id) => {
        const noticia = noticias.find((n) => n.id === id);
        try {
            // 3. MUDANÇA PADRÃO: Usamos 'api.put'
            await api.put(`/noticias/${id}`, noticia);
            alert("Notícia salva com sucesso!");
        } catch (err) {
            // 4. CORREÇÃO: Mensagem de erro ajustada para "salvar"
            console.error("Erro ao salvar notícia:", err);
        }
    };

    const handleExcluir = async (id) => {
        try {
            // 5. MUDANÇA PADRÃO: Usamos 'api.delete'
            await api.delete(`/noticias/${id}`);
            setNoticias((prev) => prev.filter((n) => n.id !== id));
            alert("Notícia excluida com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir notícia:", err);
        }
    };

    const handleChange = (id, field, value) => {
        setNoticias((prev) => 
           
            prev.map((n) => (n.id === id ? {...n, [field]: value } : n))
        );
    };

    return (
        <div className="editar-noticia">
        <NavbarAdmin/>
        <div className="container-editar">
            <h2>Editar Notícias</h2>
            <div className="grid-cards">
                {noticias.map((noticia) => (
                    <div className="card" key={noticia.id}>
                        <img src={noticia.imagem} alt={noticia.titulo} />
                        <input type="text" value={noticia.titulo} onChange={(e) => handleChange(noticia.id, "titulo", e.target.value)} />
                        <textarea value={noticia.conteudo} onChange={(e) => handleChange(noticia.id, "conteudo", e.target.value)} />
                        <div className="card-buttons">
                            <button className="salvar" onClick={() => handleSalvar(noticia.id)}>Salvar</button>
                            <button className="exluir" onClick={() => handleExcluir(noticia.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default EditaNoticias;