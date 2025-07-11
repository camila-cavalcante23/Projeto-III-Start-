import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 1. MUDANÇA PADRÃO: Trocamos a importação do axios
import api from "../../services/api";
import "./NewsDetail.css";
import Button from "../../components/Button/Button";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Footer from "../../components/Footer/Footer"

const NewsDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. MUDANÇA: Convertido para async/await e usando nossa 'api'
    useEffect(() => {
        const fetchNewsDetail = async () => {
            // Garante que o estado de loading e erro sejam resetados a cada busca
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/api/news/${id}`);
                setNews(response.data);
            } catch (error) {
                console.error("Erro ao carregar a notícia:", error);
                setError("Não foi possível carregar a notícia. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchNewsDetail();
    }, [id]); // O [id] garante que a busca é refeita se o id na URL mudar
    
    // 3. MELHORIA: Lógica de renderização mais robusta
    if (loading) {
        return <div>Carregando notícia...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    if (!news) {
        return <div>Notícia não encontrada.</div>;
    }

    return (
        <section className="details">
            <Navbar2/>
            <div className="news-detail">
                <h1>{news.titulo}</h1>
                <p className="meta">{new Date(news.dataCriacao).toLocaleDateString()}</p>
                <div className="image-public">
                    <img src={news.imagem} alt={news.titulo} className="news-image" />
                </div>
                <p>{news.conteudo}</p>
                <div className="btn-more">
                    <Button text="Veja mais" color="green" onClick={() => navigate("/noticias")} /> 
                </div>
            </div>
            <Footer/>
        </section>
    );
};

export default NewsDetail;