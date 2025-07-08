import React, { useEffect, useState } from "react";
import "./NoticiasDetalhadas.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer  from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

function NoticiasDetalhada(){
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/noticias/${id}`);
                setNoticia(response.data);
            } catch (err){
                console.error("Erro ao buscar notícias", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticia();
    }, [id]);

    if(loading) return <p>Carregando...</p>;
    if(!noticia) return <p>Notícia não encontrada.</p>;

    return (
        <div className="noticia-detalhada">
            <Navbar />
            
            <div className="noticia-container">
                <h2 className="titulo-noticia">Notícias</h2>
                <h3 className="subtitulo-noticia">{noticia.titulo}</h3>
                <p className="data-noticia">{noticia.data}</p>

                <div className="imagem-noticia-container">
                    <img src={noticia.imagem} alt="Notícia" className="imagem-noticia" />
                
                <div className="bolinhas">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="texto-noticia">
                {noticia.conteudo.split("\n").map((paragrafo, idx) => (
                    <p key={idx}>{paragrafo}</p>
                ))}
            </div>
                <button className="btn-ver-mais">Ver Mais</button>
            </div> 
             <Footer />
        </div>
    );
}

export default NoticiasDetalhada;