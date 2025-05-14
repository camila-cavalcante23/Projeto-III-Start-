import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Noticias.css'
import Navbar2 from '../../components/Navbar2/Navbar2';
import Footer from '../../components/Footer/Footer';
import Button from "../../components/Button/Button";

function Noticias() {

  const [currentPage, setCurrentPage] = useState(1);  
  const [newsPerPage] = useState(10);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:44367/api/news')
      .then((response) => {
        setAllNews(response.data);
        setLoading(false);  
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias', error);
        setLoading(false); 
      });
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = allNews.slice(indexOfFirstNews, indexOfLastNews);

  if (loading) {
    return <div className="loading">Carregando notícias...</div>;
  }

  if (allNews.length === 0) {
    return <div className="no-news">Nenhuma notícia encontrada.</div>;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className='allNews'>
      <Navbar2/>
      <div className="allNews-container">
        <h1 className='title-allNews'>Todas as Notícias</h1>
        <ul className='allNews-list'>
          {currentNews.map((news) => (
            <li key={news.id}>
              <Link to={`/noticia/${news.id}`}>
                <h3>{news.titulo}</h3>
                <p className="meta">{new Date(news.dataCriacao).toLocaleDateString()}</p>
                <p>{news.conteudo.substring(0, 300)}...</p> 
              </Link> 
            </li>
          ))}
        </ul>
        <div className="pagination">
          {currentPage > 1 && (
            <Button text="Página Anterior" color="green" onClick={() => paginate(currentPage - 1)} />
          )}

          {currentNews.length === newsPerPage && (
            <Button text="Próxima Página" color="green" onClick={() => paginate(currentPage + 1)} />
          )}
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Noticias
