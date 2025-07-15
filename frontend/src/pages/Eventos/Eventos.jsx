import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Eventos.css";
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import api from '../../services/api';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await api.get('/event');

                if (response.data && Array.isArray(response.data.data)) {
                    setEventos(response.data.data);
                } else {
                    setEventos([]);
                }
            } catch (err) {
                setError("Não foi possível carregar os eventos.");
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

    // Lógica de filtragem baseada na data do evento
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // A API envia a data como uma string ISO (ex: "2025-08-15T00:00:00")
    const eventosEmAndamento = eventos.filter(evento => new Date(evento.date) >= hoje);
    const eventosEncerrados = eventos.filter(evento => new Date(evento.date) < hoje);

    const renderEventosGrid = (listaEventos) => (
        <div className="eventos-grid">
            {listaEventos.map(evento => (
                <div key={evento.id} className="evento-card">
                    <img 
                        src={evento.imageUrl || `https://placehold.co/600x400/a7e5d5/333333?text=${encodeURIComponent(evento.name)}`} 
                        alt={evento.name} 
                        className="evento-imagem" 
                    />
                    <div className="evento-info">
                        <h3 className="evento-titulo">{evento.name}</h3>
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
                    <h2 className="section-title">Próximos Eventos</h2>
                    {loading ? (
                        <p className="eventos-placeholder">Carregando...</p>
                    ) : error ? (
                        <p className="eventos-placeholder">{error}</p>
                    ) : eventosEmAndamento.length > 0 ? (
                        renderEventosGrid(eventosEmAndamento)
                    ) : (
                        <p className="eventos-placeholder">Nenhum evento futuro no momento.</p>
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