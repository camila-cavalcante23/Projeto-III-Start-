import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link para a seta de voltar e para o "Ler mais"
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
        const response = await api.get('/news'); // Endpoint para buscar notícias
        console.log("Resposta completa da API:", response.data);

        // A API retorna um objeto com { success: true, message: ..., data: [...] }
        const fetchedNews = response.data.data || response.data; // Pega o array de notícias

        // 1. GARANTIR A ORDEM: Ordena as notícias pela data de criação (mais recente primeiro)
        // Supondo que a propriedade da data seja 'createdAt' ou 'CreatedDate' no seu backend
        // Ajuste 'createdAt' para o nome real da propriedade da data no objeto da notícia.
        const sortedNews = fetchedNews.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.CreatedDate || a.dataCriacao); // Tenta nomes comuns para a data
          const dateB = new Date(b.createdAt || b.CreatedDate || b.dataCriacao);
          return dateB - dateA; // Ordena do mais novo para o mais antigo
        });

        // 2. Mapeamento de propriedades para garantir consistência (opcional, mas boa prática)
        const mappedNews = sortedNews.map(noticiaBackend => ({
          id: noticiaBackend.id || noticiaBackend.Id,
          title: noticiaBackend.title || noticiaBackend.Title || 'Título Desconhecido',
          content: noticiaBackend.content || noticiaBackend.Content || 'Nenhum conteúdo disponível.',
          // Use 'imageUrl', 'imgURL' ou 'image' dependendo de como sua API retorna a URL da imagem.
          // Adicione um fallback para uma imagem padrão se não houver URL.
          imgURL: noticiaBackend.imageUrl || noticiaBackend.imgURL || noticiaBackend.image || 'https://via.placeholder.com/400x250?text=Sem+Imagem'
        }));

        setNoticias(mappedNews);
      } catch (err) {
        console.error("Ocorreu um erro ao buscar as notícias:", err);
        setError("Não foi possível carregar as notícias. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    carregarNoticias();
  }, []);

  if (loading) {
    return <p className="loading">Carregando notícias...</p>;
  }

  if (error) {
    return <p className="no-news">{error}</p>;
  }

  return (
    <div className="noticias-page-background">
      <Navbar2 />

      <div className="noticias-container">
        
        <div className="header-noticias">
          <h1 className="title-noticias">Últimas Notícias</h1>
        </div>

        {noticias && noticias.length > 0 ? (
          <div className="noticias-grid">
            {noticias.map(noticia => (
              <div key={noticia.id} className="news-card">
                {/* Fallback de imagem e tratamento de erro de carregamento da imagem */}
                <img 
                  src={noticia.imgURL} 
                  alt={noticia.title} 
                  className="news-card-image" 
                  onError={(e) => { 
                    e.target.onerror = null; // Evita loop infinito de erro
                    e.target.src = 'https://via.placeholder.com/400x250?text=Imagem+N%C3%A3o+Dispon%C3%ADvel'; // Imagem de fallback
                  }}
                />
                <div className="news-card-content">
                  <h2 className="news-card-title">{noticia.title}</h2>
                  {/* Limita a exibição do conteúdo para um resumo, se desejar */}
                  <p className="news-card-text">
                    {noticia.content ? 
                     (noticia.content.length > 150 ? noticia.content.substring(0, 150) + '...' : noticia.content)
                     : 'Conteúdo indisponível.'}
                  </p>
                  {/* Link para a página de detalhes da notícia */}
                  <Link to={`/noticiasDetalhadas/${noticia.id}`} className="news-card-link">
                    Ler mais
                  </Link>
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