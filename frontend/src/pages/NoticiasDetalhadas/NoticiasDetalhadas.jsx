import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// 1. MUDANÇA PADRÃO: Trocamos a importação do axios
import api from '../../services/api'; 
import './NoticiasDetalhadas.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import Footer from '../../components/Footer/Footer';

function NoticiaDetalhadas() {
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); 
  const { id } = useParams();

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        // 2. MUDANÇA PADRÃO: Usamos 'api.get' e removemos a URL completa
        const response = await api.get(`/api/news/${id}`);
        setNoticia(response.data);
      } catch (err) {
        console.error("Erro ao carregar a notícia:", err);
        setError(`Não foi possível carregar a notícia. Verifique se a API está rodando no endereço correto. (Erro: ${err.message})`);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) {
    return <div className="loading">Carregando notícia...</div>;
  }

  if (error) {
    return <div className="no-news">{error}</div>;
  }

  if (!noticia) {
    return <div className="no-news">Notícia não encontrada.</div>;
  }

  return (
    <div className='noticia-detalhada-page'>
      <Navbar2 />
      <main className='noticia-detalhada-container'>
        <div className="header-detalhes">
          <Link to="/noticias" className="back-arrow-detalhes">←</Link>
          <p>Notícias</p>
        </div>
        <article className="noticia-article">
          <h1 className="noticia-titulo">{noticia.titulo}</h1>
          <p className="noticia-data">
            {new Date(noticia.dataCriacao).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div className="image-wrapper">
            <div className="dots dots-left"></div>
            <img src={noticia.imageUrl || 'https://via.placeholder.com/800x500'} alt={noticia.titulo} className="noticia-imagem-principal" />
            <div className="dots dots-right"></div>
          </div>
          <div className="noticia-corpo">
            {noticia.conteudo && noticia.conteudo.split('\n').map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default NoticiaDetalhadas;