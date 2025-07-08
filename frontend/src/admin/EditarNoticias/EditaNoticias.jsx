import React, { useEffect, useState } from "react";
import "./EditaNoticias.css";
import axios from "axios";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

function EditaNoticias() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = async () => {
        try {
            const response = await axios.get("https://localhost:44367/noticias");
            setNoticias(response.data);
        } catch (err) {
            console.error("Erro ao buscar notícias:", err);
        }
    };

    const handleSalvar = async (id) => {
        const noticia = noticias.find((n) => n.id === id);
        try {
            await axios.put(`https://localhost:44367/noticias/${id}`, noticia);
            alert("Notícia salva com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir notícia:", err);
        }
    };

    const handleExcluir = async (id) => {
        try {
            await axios.delete(`https://localhost:44367/noticias/${id}`);
            setNoticias((prev) => prev.filter((n) => n.id !== id));
            alert("Notícia excluida com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir notícia:", err);
        }
    };

    const handleChange = (id, field, value) => {
        setNoticias((prev) => 
            prev,map((n) => (n.id === id ? {...n, [field]: value } : n))
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