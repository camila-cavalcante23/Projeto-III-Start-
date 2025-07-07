import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewsList.css';
import Button from '../../components/Button/Button';

const NewsList = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. COLOQUE A URL REAL 
    const apiUrl = 'URL';

    axios.get(apiUrl)
      .then(response => {
        // 2. ESTE CONSOLE.LOG
        // Ele vai te mostrar a estrutura exata do que o backend está enviando.
        // Procure nele qual é o nome da propriedade que contém o array de notícias.
        console.log('Resposta completa recebida da API:', response.data);

        // =================================================================
        // 3. PONTO PRINCIPAL DA ATUALIZAÇÃO!
     
        //    Estou usando 'results' como exemplo, mas pode ser 'data', 'noticias', 'items', etc.
        //    Troque 'results' pelo nome correto que você viu no console.
        const dadosRecebidos = response.data.results; 
        // =================================================================

        // 4. VERIFICAÇÃO DE SEGURANÇA
        // Antes de atualizar o estado, garantimos que o que recebemos é realmente um array.
        if (Array.isArray(dadosRecebidos)) {
          setNewsList(dadosRecebidos);
        } else {
          console.error("Erro: Os dados recebidos não são um array!", dadosRecebidos);
          //um array vazio para não quebrar a tela.
          setNewsList([]);
        }
      })
      .catch(error => {
        console.error('Erro ao carregar as notícias:', error);
        // Em caso de erro na chamada, também garantimos que newsList seja um array.
        setNewsList([]);
      })
      .finally(() => {
        setLoading(false);
      });

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
      ) : newsList.length === 0 ? (
        <div className="no-news">Nenhuma notícia encontrada.</div>
      ) : (
        <>
          <div className='news-grid'>
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