import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Não precisamos do axios por enquanto
import './NewsList.css';
import Button from '../../components/Button/Button';

// Dados fictícios para simular a resposta da API
const mockNewsData = [
  { id: 1, imagem: 'https://via.placeholder.com/400x200', titulo: 'Título da Notícia 1', conteudo: 'Este é um resumo do conteúdo da primeira notícia. Serve para testar o layout do card e ver como o texto se comporta no espaço disponível.', dataCriacao: new Date() },
  { id: 2, imagem: 'https://via.placeholder.com/400x200', titulo: 'Título da Notícia 2', conteudo: 'Resumo da segunda notícia. A estrutura de cards permite exibir múltiplas entradas de forma organizada e visualmente agradável para o usuário.', dataCriacao: new Date() },
  { id: 3, imagem: 'https://via.placeholder.com/400x200', titulo: 'Título da Notícia 3', conteudo: 'Terceiro e último resumo de notícia para esta seção. O layout é responsivo e se ajusta para telas menores, garantindo boa experiência.', dataCriacao: new Date() },
];

const NewsList = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  // Começamos com loading como false, pois não vamos esperar nada
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    /* A CHAMADA REAL PARA A API ESTÁ COMENTADA.
      Quando o backend estiver funcionando,  apagar
      o código abaixo e descomentar este.
    */
    // axios.get('http://localhost:5000/api/news')
    //   .then(response => {
    //     setNewsList(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Erro ao carregar as notícias', error);
    //     setLoading(false);
    //   });

    // Usando os dados fictícios
    setNewsList(mockNewsData);
    setLoading(false); // Definimos loading como false imediatamente

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