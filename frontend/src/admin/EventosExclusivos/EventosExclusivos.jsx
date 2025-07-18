import React, { useState, useEffect } from "react";
import './EventosExclusivos.css';
import api from '../../services/api';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom"; // Certifique-se de que Link está importado

function EventosExclusivos() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true); // Adiciona estado de carregamento
    const [error, setError] = useState(''); // Adiciona estado de erro

    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true); // Inicia o carregamento
            setError(''); // Limpa erros anteriores
            try {
                // AJUSTE: Endpoint correto para buscar todos os eventos
                // Manter '/Event' se for o endpoint correto do seu backend para listar eventos.
                const response = await api.get('/Event'); 
                
                // AJUSTE: Acessar response.data.data para obter o array real de eventos
                // O backend retorna um objeto com { success: true, message: ..., data: [...] }
                const fetchedEvents = response.data.data.map(eventoBackend => ({
                    id: eventoBackend.id,
                    // Mapeia 'name' do backend para 'titulo' OU 'Title' (se for o caso do seu BD)
                    titulo: eventoBackend.name || eventoBackend.Title, 
                    // Mapeia 'description' do backend para 'conteudo'
                    conteudo: eventoBackend.description || eventoBackend.Description, 
                    // ATENÇÃO: O backend não está retornando dados de imagem para eventos no EventResponseDTO.
                    // Usamos um placeholder por enquanto. Para exibir imagens reais, o backend
                    // precisaria ser modificado para incluir ImageDetailsDTO no EventResponseDTO.
                    imagem: 'https://placehold.co/300x200?text=Evento+Sem+Imagem', 
                    local: eventoBackend.place || eventoBackend.Place,
                    data: eventoBackend.date || eventoBackend.Date, // Ajuste se a propriedade for diferente
                    horaInicio: eventoBackend.startTime || eventoBackend.StartTime, // Ajuste se a propriedade for diferente
                    horaFim: eventoBackend.endTime || eventoBackend.EndTime, // Ajuste se a propriedade for diferente
                    capacidade: eventoBackend.capacity || eventoBackend.Capacity
                }));
                setEventos(fetchedEvents);
            } catch (err) {
                console.error("Erro ao buscar eventos:", err);
                // Adicionar uma mensagem para o usuário em caso de erro
                setError('Não foi possível carregar os eventos. Tente novamente mais tarde.');
                setEventos([]); // Limpa eventos em caso de erro
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchEventos();
    }, []); // Roda apenas uma vez na montagem do componente

    return (
        <div className="eventos-exclusivos">
            <NavbarAdmin />
            <div className="eventos-container">
                <h2 className="titulo-eventos">Gerenciar Eventos</h2> {/* Título ajustado para "Gerenciar" */}
                <div className="grid-eventos">
                    {loading ? (
                        <p>Carregando eventos...</p> // Mensagem de carregamento
                    ) : error ? (
                        <p className="error-message">{error}</p> // Mensagem de erro
                    ) : eventos.length > 0 ? (
                        eventos.map((evento) => (
                            <div className="card-evento" key={evento.id}>
                                <img src={evento.imagem} alt={`Imagem do evento ${evento.titulo}`} className="img-evento" />
                                <h3>{evento.titulo}</h3>
                                <p>{evento.conteudo}</p>
                                <p><strong>Local:</strong> {evento.local}</p>
                                <p><strong>Data:</strong> {evento.data ? new Date(evento.data).toLocaleDateString('pt-BR') : 'Data Indisponível'}</p> {/* Formatação de data */}
                                <p><strong>Horário:</strong> {evento.horaInicio} - {evento.horaFim}</p>
                                <p><strong>Vagas:</strong> {evento.capacidade}</p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum evento exclusivo disponível no momento.</p>
                    )}
                </div>
                <Link to="/criarEvento">
                    <button className="btn-criar-evento">Criar Novo Evento</button> {/* Texto ajustado */}
                </Link>
                <Link to="/editarEventos">
                    <button className="btn-editar-evento">Editar Evento</button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default EventosExclusivos;