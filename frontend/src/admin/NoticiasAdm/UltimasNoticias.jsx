import React, { useState, useEffect } from "react"; // 1. Importamos o 'useState' e 'useEffect'
import './UltimasNoticias.css';
import api from '../../services/api'; // 1. Importamos nossa 'api'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import event from "../../assets/event6.png";

// A variável 'noticiasMock' foi removida.

function UltimasNoticias() {
    // 2. Criamos um estado para guardar as notícias que virão da API.
    const [noticias, setNoticias] = useState([]);

    // 3. Usamos o useEffect para buscar os dados da API assim que a página carrega.
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                // Usamos nossa 'api' para fazer a busca no endpoint de notícias
                const response = await api.get('/noticias'); 
                setNoticias(response.data); // Guardamos a lista de notícias no nosso estado
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            }
        };

        fetchNoticias(); // Executamos a função de busca
    }, []); // O array vazio [] garante que isso rode apenas uma vez.

    return (
        <div className="ultimas-noticias">
            <Navbar />
            <div className="noticias-container">
                <h2 className="titulo-noticias">Últimas Notícias</h2>
                <div className="grid-noticias">
                    {/* 4. Mapeamos o estado 'noticias', que agora contém os dados reais da API */}
                    {noticias.map((noticia) => (
                        <div className="card-noticia" key={noticia.id}>
                            <img src={noticia.imagem} alt="Imagem da noticia" className="img-noticia" />
                            <h3>{noticia.titulo}</h3>
                            <p>{noticia.conteudo}</p>
                            <button className="btn-ver-mais">Ver Mais</button>
                        </div>
                    ))}
                </div>
                <Link to="/criarNoticias"><button className="btn-criar-noticia">Criar Notícia</button></Link>
            </div>
            <Footer />
        </div>
    );
}

export default UltimasNoticias;