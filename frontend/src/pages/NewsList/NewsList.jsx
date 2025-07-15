import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './NewsList.css';
import Button from '../../components/Button/Button';

const NewsList = () => {
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // Adicionado estado de erro

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // 1. CORREÇÃO: O endpoint correto é '/news', sem o '/api'.
                const response = await api.get('/news');

                // 2. CORREÇÃO: Os dados estão dentro de response.data.data.
                if (response.data && Array.isArray(response.data.data)) {
                    setNewsList(response.data.data);
                } else {
                    console.error("Erro: Os dados recebidos da API não são um array!", response.data);
                    setNewsList([]);
                }
            } catch (err) {
                console.error('Erro ao carregar as notícias:', err);
                setError('Não foi possível carregar as notícias.');
                setNewsList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <section className="news-section-container" id='news-id'>
            <div className="news-header">
                <h1 className='news-title'>Últimas Notícias</h1>
                <div className="decorative-dots">
                    <span className="dot"></span>
                    <span className="dot dark"></span>
                    <span className="dot dark"></span>
                </div>
            </div>

            {loading ? (
                <div className="loading">Carregando notícias...</div>
            ) : error ? (
                <div className="no-news">{error}</div>
            ) : newsList.length === 0 ? (
                <div className="no-news">Nenhuma notícia encontrada.</div>
            ) : (
                <>
                    <div className='news-grid'>
                        {newsList.slice(0, 3).map((news) => (
                            <div key={news.id} className="news-card">
                                {/* 3. CORREÇÃO: A propriedade da imagem é 'imgURL' */}
                                <img src={news.imgURL || 'https://placehold.co/600x400/a7e5d5/333333?text=Notícia'} alt={news.title} className="news-image" />
                                <div className="card-content">
                                    {/* 4. CORREÇÃO: As propriedades são 'title' e 'content' */}
                                    <h3>{news.title}</h3>
                                    <p>{`${news.content.substring(0, 150)}...`}</p>
                                    <Link to={`/noticiasDetalhadas/${news.id}`}>
                                        <button className="ler-mais-btn">Ler mais</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='all-news-button-container'>
                        <Button text="Ir para notícias" color="green" onClick={() => navigate('/noticias')} />
                    </div>
                </>
            )}
        </section>
    );
};

export default NewsList;
