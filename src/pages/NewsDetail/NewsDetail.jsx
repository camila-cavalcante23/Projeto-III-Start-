import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

    useEffect(() => {
        axios.get(`http://localhost:5000/api/news/${id}`)
            .then(response => {
                setNews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao carregar a notícia:", error);
                setError("Erro ao carregar a notícia.");
                setLoading(false);
            });
    }, [id]);
    
    if (!news) return <div>Carregando notícia...</div>;

    if (news.error) return <div>{news.error}</div>;

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
