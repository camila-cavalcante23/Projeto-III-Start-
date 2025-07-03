import React from "react";
import './UltimasNoticias.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import event from "../../assets/event6.png";


const noticiasMock = [
    {
        id: 1,
        imagem: "https://img.freepik.com/vetores-premium/pilhas-de-livros-para-leitura-pilha-de-livros-didaticos-para-educacao-isolado-no-fundo-branco-ilustracao-dos-desenhos-animados-do-vetor_76964-12652.jpg?w=2000",
        titulo: "Imagem de Livros",
        conteudo: "As imagens em livros desempenham um papel fundamental na comunicação e na experiência de leitura.",
    },
    {
        id: 2,
        imagem: "https://via.placeholder.com/400x200",
        titulo: "Notícia 2",
        conteudo: "Conteúdo da Notícia 1",
    },
    {
        id: 3,
        imagem: "https://via.placeholder.com/400x200",
        titulo: "Notícia 3",
        conteudo: "Conteúdo da Notícia 1",
    },
    {
        id: 4,
        imagem: "https://via.placeholder.com/400x200",
        titulo: "Notícia 4",
        conteudo: "Conteúdo da Notícia 1",
    },
        {
        id: 5,
        imagem: "https://via.placeholder.com/400x200",
        titulo: "Notícia 4",
        conteudo: "Conteúdo da Notícia 1",
    },
        {
        id: 6,
        imagem: "https://via.placeholder.com/400x200",
        titulo: "Notícia 4",
        conteudo: "Conteúdo da Notícia 1",
    },
        {
        id: 7,
        imagem: "https://via.placeholder.com/400x200",
        titulo: "Notícia 4",
        conteudo: "Conteúdo da Notícia 1",
    },
    {
        id: 8,
        imagem: "https://via.placeholder.com/400x200",
        titulo: "Notícia 4",
        conteudo: "Conteúdo da Notícia 1",
    },
];

function UltimasNoticias() {
    return (
        <div className="ultimas-noticias">
            <Navbar />
            <div className="noticias-container">
                <h2 className="titulo-noticias">últimas Notícias</h2>
                <div className="grid-noticias">
                    {noticiasMock.map((noticia) => (
                        <div className="card-noticia" key={noticia.id}>
                            <img src={noticia.imagem} alt="Imagem da noticia" className="img-noticia" />
                            <h3>{noticia.titulo}</h3>
                            <p>{noticia.conteudo}</p>
                            <button className="btn-ver-mais">Ver Mais</button>
                        </div>
                    ))}
                </div>
                <Link to="/criarNoticias"><button className="btn-criar-noticia">Criar Notícia</button></Link>
            </div>
            <Footer />
        </div>
    );
}

export default UltimasNoticias;