import React, { useState, useEffect } from 'react'; // 1. Importamos useState e useEffect
import { useParams, Link } from 'react-router-dom'; 
import './DetalhesEvento.css'; 

import Footer from '../../components/Footer/Footer';
import Navbar2 from '../../components/Navbar2/Navbar2';
import Button from '../../components/Button/Button';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../../services/api'; // 1. Importamos nossa api

// import { mockEventos } from '../../data/dadosEventos'; // 2. Removemos os dados de mentira

const DetalhesEvento = () => {
    const { id } = useParams(); // Pega o 'id' da URL
    
    // 3. Criamos estados para guardar o evento e para controlar o carregamento
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);

    // 4. Usamos useEffect para buscar os dados do evento específico assim que a página carrega
    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await api.get(`/eventos/${id}`); // Busca o evento pelo ID
                setEvento(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do evento:", error);
                setEvento(null); // Garante que, em caso de erro, a mensagem "não encontrado" apareça
            } finally {
                setLoading(false); // Termina o carregamento, seja com sucesso ou erro
            }
        };

        fetchEvento();
    }, [id]); // O [id] garante que, se o ID na URL mudar, a busca será feita novamente.

    // 5. Adicionamos uma tela de carregamento enquanto os dados não chegam
    if (loading) {
        return (
            <div>
                <Navbar2 />
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <h1>Carregando...</h1>
                </div>
                <Footer />
            </div>
        );
    }
    
    // Se, após o carregamento, o evento não for encontrado, mostra a mensagem de erro
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

    // Se o evento foi encontrado, exibe os detalhes
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
                    {/* Assumindo que a descrição pode conter HTML */}
                    <div dangerouslySetInnerHTML={{ __html: evento.descricao }} />
                </section>

                <aside className="evento-info-sidebar">
                    <div className="info-card">
                        <h3>Detalhes</h3>
                        
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
                           <Link to={`/inscricaoevento/${evento.id}`} className="evento-cta-link"> 
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