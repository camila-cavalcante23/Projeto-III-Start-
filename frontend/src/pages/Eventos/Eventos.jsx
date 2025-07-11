import React, { useState, useEffect } from 'react'; // 1. Importamos o useEffect
import { Link } from "react-router-dom";
import "./Eventos.css";
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import api from '../../services/api'; // 1. Importamos nossa api

// 2. Removemos os dados mock e as imagens locais. As imagens virão da API.

const Eventos = () => {
    // 3. Iniciamos o estado de eventos como uma lista vazia
    const [eventos, setEventos] = useState([]);

    // 4. Usamos o useEffect para buscar os dados da API assim que a página carrega
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await api.get('/eventos');
                setEventos(response.data);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }
        };
        fetchEventos();
    }, []); // Roda apenas uma vez quando o componente é montado.


    // O resto do seu código já está perfeito!
    // Ele vai filtrar e renderizar os eventos assim que o estado 'eventos' for preenchido.
    const eventosEmAndamento = eventos.filter(evento => evento.status === 'em-andamento');
    const eventosEncerrados = eventos.filter(evento => evento.status === 'encerrado');

    const renderEventosGrid = (listaEventos) => (
        <div className="eventos-grid">
            {listaEventos.map(evento => (
                <div key={evento.id} className="evento-card">
                    {/* A 'evento.imagem' agora virá da API */}
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

                <section className="eventos-section">
                    <h2 className="section-title">Eventos em Andamento</h2>
                    {eventosEmAndamento.length > 0 ? (
                        renderEventosGrid(eventosEmAndamento)
                    ) : (
                        <p className="eventos-placeholder">Nenhum evento em andamento no momento.</p>
                    )}
                </section>

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