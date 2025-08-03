import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import './Noticias.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import Footer from '../../components/Footer/Footer';

// Array de meses com os nomes completos para exibição
const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [noticiasFiltradas, setNoticiasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Novos estados para o filtro com SELECT
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMes, setFiltroMes] = useState('');
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]); // NOVO estado para meses

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const response = await api.get('/news');
        const fetchedNews = response.data.data || response.data;
        
        const sortedNews = fetchedNews.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.CreatedDate || a.dataCriacao);
          const dateB = new Date(b.createdAt || b.CreatedDate || b.dataCriacao);
          return dateB - dateA;
        });

        const mappedNews = sortedNews.map(noticiaBackend => {
          const imageDetails = noticiaBackend.imageDetails || noticiaBackend.ImageDetails;
          let imageUrl = 'https://via.placeholder.com/400x250?text=Sem+Imagem';

          if (imageDetails && imageDetails.base64 && imageDetails.extension) {
            const extensionWithoutDot = imageDetails.extension.startsWith('.')
              ? imageDetails.extension.substring(1)
              : imageDetails.extension;
            imageUrl = `data:Image/${extensionWithoutDot};base64,${imageDetails.base64}`;
          }

          return {
            id: noticiaBackend.id || noticiaBackend.Id,
            title: noticiaBackend.title || noticiaBackend.Title || 'Título Desconhecido',
            content: noticiaBackend.content || noticiaBackend.Content || 'Nenhum conteúdo disponível.',
            imgURL: imageUrl,
            createdAt: noticiaBackend.createdAt
          };
        });
        
        setNoticias(mappedNews);
        setNoticiasFiltradas(mappedNews);
      } catch (err) {
        console.error("Ocorreu um erro ao buscar as notícias:", err);
        setError("Não foi possível carregar as notícias. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    carregarNoticias();
  }, []);

  // NOVO useEffect para extrair anos e meses após o carregamento das notícias
  useEffect(() => {
    if (noticias.length > 0) {
      // Extrai e ordena os anos únicos
      const anosUnicos = Array.from(new Set(
        noticias.map(n => new Date(n.createdAt).getFullYear())
      )).sort((a, b) => b - a);
      setAnosDisponiveis(["", ...anosUnicos]);

      // Extrai os meses únicos do ano selecionado, se houver
      const mesesDoAnoSelecionado = new Set(
        noticias
          .filter(n => filtroAno === '' || new Date(n.createdAt).getFullYear().toString() === filtroAno)
          .map(n => (new Date(n.createdAt).getMonth() + 1).toString().padStart(2, '0'))
      );
      
      const mesesDisponiveisFormatados = Array.from(mesesDoAnoSelecionado)
        .sort()
        .map(mesNum => ({
          value: mesNum,
          label: nomesMeses[parseInt(mesNum, 10) - 1]
        }));
      
      setMesesDisponiveis([{ value: "", label: "Todos os Meses" }, ...mesesDisponiveisFormatados]);
    } else {
      setAnosDisponiveis([]);
      setMesesDisponiveis([]);
    }
  }, [noticias, filtroAno]); // Depende das notícias e do ano do filtro

  // useEffect para a lógica de filtro com select
  useEffect(() => {
    let filtradas = noticias;

    if (filtroAno) {
      filtradas = filtradas.filter(noticia =>
        new Date(noticia.createdAt).getFullYear().toString() === filtroAno
      );
    }

    if (filtroMes) {
      filtradas = filtradas.filter(noticia => {
        const mes = (new Date(noticia.createdAt).getMonth() + 1).toString().padStart(2, '0');
        return mes === filtroMes;
      });
    }
    setNoticiasFiltradas(filtradas);
  }, [filtroAno, filtroMes, noticias]);

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

          <div className="noticias-filtros">
            <div className="filtro-item">
              <label htmlFor="filtro-ano">Ano:</label>
              <select
                id="filtro-ano"
                className="noticias-select-filtro"
                value={filtroAno}
                onChange={(e) => {
                  setFiltroAno(e.target.value);
                  setFiltroMes('');
                }}
              >
                <option value="">Todos os Anos</option>
                {anosDisponiveis.map(ano => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
            </div>
            <div className="filtro-item">
              <label htmlFor="filtro-mes">Mês:</label>
              <select
                id="filtro-mes"
                className="noticias-select-filtro"
                value={filtroMes}
                onChange={(e) => setFiltroMes(e.target.value)}
                disabled={!filtroAno}
              >
                {mesesDisponiveis.map(mes => (
                  <option key={mes.value} value={mes.value}>
                    {mes.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {noticiasFiltradas && noticiasFiltradas.length > 0 ? (
          <div className="noticias-grid">
            {noticiasFiltradas.map(noticia => (
              // --- AQUI ESTÁ A MUDANÇA PRINCIPAL: O LINK ENVOLVENDO TODO O CARD ---
              <Link to={`/noticiasDetalhadas/${noticia.id}`} className="news-card-link-wrapper" key={noticia.id}>
                <div className="news-card">
                  <img
                    src={noticia.imgURL}
                    alt={noticia.title}
                    className="news-card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://tse4.mm.bing.net/th/id/OIP.xjw1xa-BdDkEGABYQrueeAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3';
                    }}
                  />
                  <div className="news-card-content">
                    <h2 className="news-card-title">{noticia.title}</h2>
                    <p className="news-card-date">
                      {noticia.createdAt ? `Publicado em: ${new Date(noticia.createdAt).toLocaleDateString()}` : ''}
                    </p>
                    <p className="news-card-text">
                      {noticia.content ?
                        (noticia.content.length > 150 ? noticia.content.substring(0, 150) + '...' : noticia.content)
                        : 'Conteúdo indisponível.'}
                    </p>
                    {/* O LINK AQUI DENTRO FOI REMOVIDO PARA EVITAR DUPLICIDADE */}
                    <span className="news-card-read-more">Ler mais</span>
                  </div>
                </div>
              </Link>
              // --- FIM DA MUDANÇA ---
            ))}
          </div>
        ) : (
          <p className="no-news">Nenhuma notícia encontrada com os filtros selecionados.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Noticias;
