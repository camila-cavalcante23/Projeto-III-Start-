import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Eventos.css";
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";

// Imagens dos eventos
import event1 from '../../assets/event1.png';
import event2 from '../../assets/event2.png';
import event3 from '../../assets/event3.png';
import event4 from '../../assets/event4.png';
import event5 from '../../assets/event5.png';
import event6 from '../../assets/event6.png';

// dados de exemplo (com o campo "status")
const mockEventos = [
    { id: 1, titulo: "Palestra sobre inovação", imagem: event1, status: "em-andamento" },
    { id: 2, titulo: "Feira de Startups", imagem: event2, status: "em-andamento" },
    { id: 6, titulo: "Game Board", imagem: event6, status: "em-andamento" },
    { id: 3, titulo: "Gestão Pública: O caso 2", imagem: event3, status: "encerrado" },
    { id: 4, titulo: "Sertão do Inhamuns", imagem: event4, status: "encerrado" },
    { id: 5, titulo: "Edital Startup Nordeste", imagem: event5, status: "encerrado" }
];

const Eventos = () => {
    // Mantém o estado com todos os eventos
    const [eventos, setEventos] = useState(mockEventos);

    // Filtra os eventos em duas listas separadas
    const eventosEmAndamento = eventos.filter(evento => evento.status === 'em-andamento');
    const eventosEncerrados = eventos.filter(evento => evento.status === 'encerrado');

    // Função para renderizar um grid de eventos (evita repetição de código)
    const renderEventosGrid = (listaEventos) => (
        <div className="eventos-grid">
            {listaEventos.map(evento => (
                <div key={evento.id} className="evento-card">
                    <img src={evento.imagem} alt={evento.titulo} className="evento-imagem" />
                    <div className="evento-info">
                        <h3 className="evento-titulo">{evento.titulo}</h3>
                        <Link to={`/detalhesevento/${evento.id}`} className="evento-botao">
                            Conheça o evento
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="eventos-page">
            <Navbar2 />

            <main className="eventos-container">
                <header className="eventos-header">
                    <h1 className="main-title">Eventos</h1>
                </header>

                {/* Seção de Eventos em Andamento */}
                <section className="eventos-section">
                    <h2 className="section-title">Eventos em Andamento</h2>
                    {eventosEmAndamento.length > 0 ? (
                        renderEventosGrid(eventosEmAndamento)
                    ) : (
                        <p className="eventos-placeholder">Nenhum evento em andamento no momento.</p>
                    )}
                </section>

                {/* Seção de Eventos Encerrados */}
                <section className="eventos-section">
                    <h2 className="section-title">Eventos Encerrados</h2>
                    {eventosEncerrados.length > 0 ? (
                        renderEventosGrid(eventosEncerrados)
                    ) : (
                        <p className="eventos-placeholder">Nenhum evento encerrado para mostrar.</p>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Eventos;