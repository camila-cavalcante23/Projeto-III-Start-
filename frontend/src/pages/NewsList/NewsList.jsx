import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. MUDANÇA PADRÃO: Trocamos a importação
import api from '../../services/api';
import './NewsList.css';
import Button from '../../components/Button/Button';

const NewsList = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. MUDANÇA: Convertido para async/await e usando nossa 'api'
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Usamos nosso 'api' para buscar as notícias do endpoint correto
        const response = await api.get('/api/news');
        
        // A sua verificação de segurança é ótima! Vamos mantê-la.
        // Assumimos que 'response.data' é o array de notícias.
        if (Array.isArray(response.data)) {
          setNewsList(response.data);
        } else {
          console.error("Erro: Os dados recebidos da API não são um array!", response.data);
          setNewsList([]); // Define um array vazio para não quebrar a tela.
        }
      } catch (error) {
        console.error('Erro ao carregar as notícias:', error);
        setNewsList([]); // Em caso de erro na chamada, também garantimos que newsList seja um array.
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // O array vazio [] garante que a busca aconteça só uma vez.

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
      ) : newsList.length === 0 ? (
        <div className="no-news">Nenhuma notícia encontrada.</div>
      ) : (
        <>
          <div className='news-grid'>
            {/* O .slice(0, 3) mostra apenas as 3 primeiras notícias */}
            {newsList.slice(0, 3).map((news) => (
              <div key={news.id} className="news-card">
                <img src={news.imagem} alt={news.titulo} className="news-image" />
                <div className="card-content">
                  <h3>{news.titulo}</h3>
                  <p>{`${news.conteudo.substring(0, 150)}...`}</p>
                  <Link to={`/noticia/${news.id}`}>
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