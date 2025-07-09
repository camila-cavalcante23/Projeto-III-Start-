import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './Noticias.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import Footer from '../../components/Footer/Footer';
import Button from "../../components/Button/Button";

// --- DADOS DE EXEMPLO (MOCK) ---
// Use este array para ver o layout dos cards.
const mockNewsData = [
  { id: 1, titulo: 'Start-up local recebe investimento anjo', conteudo: 'Nós certo objetivo auxiliar Startups nas suas fases de ideação e desenvolvimento. Após serem aprovadas em nosso processo seletivo, as startups passam por...', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80' },
  { id: 2, titulo: 'Nova tecnologia promete revolucionar o agronegócio', conteudo: 'Nós certo objetivo auxiliar Startups nas suas fases de ideação e desenvolvimento. Após serem aprovadas em nosso processo seletivo, as startups passam por...', imageUrl: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=500&q=80' },
  { id: 3, titulo: 'Como a inteligência artificial está mudando o mercado', conteudo: 'Nós certo objetivo auxiliar Startups nas suas fases de ideação e desenvolvimento. Após serem aprovadas em nosso processo seletivo, as startups passam por...', imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80' },
  { id: 4, titulo: 'Dicas essenciais para o seu pitch de negócios', conteudo: 'Nós certo objetivo auxiliar Startups nas suas fases de ideação e desenvolvimento. Após serem aprovadas em nosso processo seletivo, as startups passam por...', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80' },
  { id: 5, titulo: 'O ecossistema de inovação da nossa região cresce 20%', conteudo: 'Nós certo objetivo auxiliar Startups nas suas fases de ideação e desenvolvimento. Após serem aprovadas em nosso processo seletivo, as startups passam por...', imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80' },
  { id: 6, titulo: 'Conheça as finalistas do prêmio Inovação 2025', conteudo: 'Nós certo objetivo auxiliar Startups nas suas fases de ideação e desenvolvimento. Após serem aprovadas em nosso processo seletivo, as startups passam por...', imageUrl: 'https://images.unsplash.com/photo-1560439539-5da74e7c4157?w=500&q=80' },
];
// --- FIM DOS DADOS DE EXEMPLO ---


function Noticias() {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(9);
  const [loading, setLoading] = useState(true); // Alterado para true
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    // Simulando um carregamento e usando os dados de exemplo
    setTimeout(() => {
      setAllNews(mockNewsData);
      setLoading(false);
    }, 500); // Espera 0.5 segundo para simular o loading

    /*
      // SEU CÓDIGO ORIGINAL (MANTENHA-O COMENTADO POR ENQUANTO)
      axios.get('http://localhost:44367/api/news')
        .then((response) => {
          const newsWithImages = response.data.map(news => ({
            ...news,
            imageUrl: news.imageUrl || 'https://via.placeholder.com/400x250'
          }));
          setAllNews(newsWithImages);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar notícias', error);
          setLoading(false);
        });
    */
  }, []);

  // O resto do seu componente continua igual...
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = allNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // O if de loading precisa vir primeiro
  if (loading) {
    return <div className="loading">Carregando notícias...</div>;
  }
  
  if (allNews.length === 0) {
    return <div className="no-news">Nenhuma notícia encontrada.</div>;
  }

  return (
    <div className='noticias-page-background'>
      <Navbar2 />
      <main className="noticias-container">
        <div className="header-noticias">
        
          <h1 className='title-noticias'>Últimas Notícias</h1>
        </div>

        <div className='noticias-grid'>
          {currentNews.map((news) => (
            <div key={news.id} className="news-card">
              <img src={news.imageUrl} alt={news.titulo} className="news-card-image" />
              <div className="news-card-content">
                <h3 className="news-card-title">{news.titulo}</h3>
                <p className="news-card-text">{news.conteudo.substring(0, 120)}...</p>
                <Link to={`/noticia/${news.id}`} className="news-card-link">
                  <Button text="Leia mais" color="green" onClick={() => {}} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {currentPage > 1 && (
            <Button text="Página Anterior" color="green" onClick={() => paginate(currentPage - 1)} />
          )}
          {allNews.length > indexOfLastNews && (
            <Button text="Próxima Página" color="green" onClick={() => paginate(currentPage + 1)} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Noticias;