import React from "react";
import './EventosExclusivos.css';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const eventosMock = [
    {
    id: 1,
    imagem: "https://img.freepik.com/vetores-premium/pilhas-de-livros-para-leitura-pilha-de-livros-didaticos-para-educacao-isolado-no-fundo-branco-ilustracao-dos-desenhos-animados-do-vetor_76964-12652.jpg?w=2000",
    titulo: "Evento sobre os livros",
    conteudo: "Livros para todos", 
    },
        {
    id: 2,
    imagem: "https://img.freepik.com/vetores-premium/pilhas-de-livros-para-leitura-pilha-de-livros-didaticos-para-educacao-isolado-no-fundo-branco-ilustracao-dos-desenhos-animados-do-vetor_76964-12652.jpg?w=2000",
    titulo: "Evento sobre os livros",
    conteudo: "Livros para todos", 
    },
    {
    id: 3,
    imagem: "https://img.freepik.com/vetores-premium/pilhas-de-livros-para-leitura-pilha-de-livros-didaticos-para-educacao-isolado-no-fundo-branco-ilustracao-dos-desenhos-animados-do-vetor_76964-12652.jpg?w=2000",
    titulo: "Evento sobre os livros",
    conteudo: "Livros para todos", 
    },
    {
    id: 4,
    imagem: "https://img.freepik.com/vetores-premium/pilhas-de-livros-para-leitura-pilha-de-livros-didaticos-para-educacao-isolado-no-fundo-branco-ilustracao-dos-desenhos-animados-do-vetor_76964-12652.jpg?w=2000",
    titulo: "Evento sobre os livros",
    conteudo: "Livros para todos", 
    },
];

function EventosExclusivos() {
    return (
        <div className="eventos-exclusivos">
            <NavbarAdmin />
            <div className="eventos-container">
                <h2 className="titulo-eventos">Eventos Exclusivos</h2>
                <div className="grid-eventos">
                    {eventosMock.map((evento) =>(
                        <div className="card-evento" key={evento.id}>
                            <img src={evento.imagem} alt="Imagem do evento" className="img-evento" />
                            <h3>{evento.titulo}</h3>
                            <p>{evento.conteudo}</p>
                            <button className="btn-ver-mais-evento">Conheça o Evento</button>
                        </div>
                    ))}
                </div>
                <Link to="/criarEvento"><button className="btn-criar-evento">Criar Evento</button></Link>
            </div>
            <Footer />
        </div>
    );
}

export default EventosExclusivos;