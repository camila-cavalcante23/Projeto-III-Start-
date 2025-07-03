import React from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams para pegar o ID da URL
import './DetalhesEvento.css'; 

import Footer from '../../components/Footer/Footer';
import Navbar2 from '../../components/Navbar2/Navbar2';
import Button from '../../components/Button/Button';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

// Importa a nossa fonte de dados centralizada
import { mockEventos } from '../../data/dadosEventos';

const DetalhesEvento = () => {
    // Pega o 'id' da URL (ex: o "6" de "/detalhesevento/6")
    const { id } = useParams();

    // Procura na lista o evento que tem o ID correspondente
    const evento = mockEventos.find(e => e.id === parseInt(id));

    // Se nenhum evento for encontrado, mostra uma mensagem de erro
    if (!evento) {
        return (
            <div>
                <Navbar2 />
                <div className="detalhe-evento-container" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h1>Evento não encontrado</h1>
                    <Link to="/eventos">Voltar para a lista de eventos</Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Se o evento for encontrado, renderiza a página com seus dados
    return (
        <div className="pagina-detalhes-evento">
            <Navbar2 />

            <header className="evento-banner" style={{ backgroundImage: `url(${evento.imagemDetalhe || evento.imagem})` }}>
                <div className="evento-banner-overlay">
                    <h1 className="evento-titulo-principal">{evento.titulo}</h1>
                </div>
            </header>
            
            <main className="evento-conteudo-wrapper">
                <section className="evento-descricao-main">
                    <h2>Sobre o Evento</h2>
                    {/* Renderiza a descrição que pode conter HTML */}
                    <div dangerouslySetInnerHTML={{ __html: evento.descricao }} />
                </section>

                <aside className="evento-info-sidebar">
                    <div className="info-card">
                        <h3>Detalhes</h3>
                        {/* As informações só aparecem se existirem nos dados do evento */}
                        {evento.data && (
                            <div className="info-item">
                                <FaCalendarAlt className="info-icon" />
                                <span>{evento.data}</span>
                            </div>
                        )}
                        {evento.horario && (
                            <div className="info-item">
                                <FaClock className="info-icon" />
                                <span>{evento.horario}</span>
                            </div>
                        )}
                        {evento.local && (
                            <div className="info-item">
                                <FaMapMarkerAlt className="info-icon" />
                                <span>{evento.local}</span>
                            </div>
                        )}

                        <div className="detalhe-evento-cta">
                       <Link to="/inscricaoevento" className="evento-cta-link"> 
                        <Button text="Inscreva-se" color="green" />
                       </Link>
                       </div>

                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    );
};

export default DetalhesEvento;