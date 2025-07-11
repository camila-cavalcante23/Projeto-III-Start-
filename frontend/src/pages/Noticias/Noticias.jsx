import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link para a seta de voltar
import api from '../../services/api.js';
import './Noticias.css'; 
import Navbar2 from '../../components/Navbar2/Navbar2';
import Footer from '../../components/Footer/Footer';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const response = await api.get('/news');
        console.log("Resposta completa da API:", response.data);
        setNoticias(response.data.data);
      } catch (err) {
        console.error("Ocorreu um erro ao buscar as notícias:", err);
        setError("Não foi possível carregar as notícias.");
      } finally {
        setLoading(false);
      }
    }

    carregarNoticias();
  }, []);

  if (loading) {
    // Aplicando a classe de estilo para a mensagem de loading
    return <p className="loading">Carregando notícias...</p>;
  }

  if (error) {
    // Aplicando a classe de estilo para a mensagem de erro
    return <p className="no-news">{error}</p>;
  }

  return (
    // Aplicando as classes do seu CSS
    <div className="noticias-page-background">
      {/* Navbar adicionada no topo */}
      <Navbar2 />

      <div className="noticias-container">
        
        <div className="header-noticias">
          <h1 className="title-noticias">Últimas Notícias</h1>
        </div>

        {noticias && noticias.length > 0 ? (
          <div className="noticias-grid">
            {noticias.map(noticia => (
              // Cada notícia agora é um "news-card"
              <div key={noticia.id} className="news-card">
                {noticia.imgURL && <img src={noticia.imgURL} alt={noticia.title} className="news-card-image" />}
                <div className="news-card-content">
                  <h2 className="news-card-title">{noticia.title}</h2>
                  <p className="news-card-text">{noticia.content}</p>
                  {/* Você pode adicionar um link aqui se quiser */}
                  {/* <Link to={`/noticias/${noticia.id}`} className="news-card-link">Ler mais</Link> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-news">Nenhuma notícia encontrada.</p>
        )}
      </div>

   
      <Footer />
    </div>
  );
}

export default Noticias;
