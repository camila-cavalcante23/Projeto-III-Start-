import React, { useState, useEffect } from "react";
import './EventosExclusivos.css';
import api from '../../services/api';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

function EventosExclusivos() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                // AJUSTE: Endpoint correto para buscar todos os eventos
                const response = await api.get('/Event'); 
                
                // AJUSTE: Acessar response.data.data para obter o array real de eventos
                // O backend retorna um objeto com { success: true, message: ..., data: [...] }
                const fetchedEvents = response.data.data.map(eventoBackend => ({
                    id: eventoBackend.id,
                    titulo: eventoBackend.name,       // Mapeia 'name' do backend para 'titulo'
                    conteudo: eventoBackend.description, // Mapeia 'description' do backend para 'conteudo'
                    // ATENÇÃO: O backend não está retornando dados de imagem para eventos no EventResponseDTO.
                    // Usamos um placeholder por enquanto. Para exibir imagens reais, o backend
                    // precisaria ser modificado para incluir ImageDetailsDTO no EventResponseDTO.
                    imagem: 'https://placehold.co/300x200?text=Evento+Sem+Imagem', 
                    local: eventoBackend.place,
                    data: eventoBackend.date,
                    horaInicio: eventoBackend.startTime,
                    horaFim: eventoBackend.endTime,
                    capacidade: eventoBackend.capacity
                }));
                setEventos(fetchedEvents);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
                // Adicionar uma mensagem para o usuário em caso de erro
                setEventos([]); // Limpa eventos em caso de erro
            }
        };

        fetchEventos();
    }, []); // Roda apenas uma vez na montagem do componente

    return (
        <div className="eventos-exclusivos">
            <NavbarAdmin />
            <div className="eventos-container">
                <h2 className="titulo-eventos">Eventos Exclusivos</h2>
                <div className="grid-eventos">
                    {eventos.length > 0 ? (
                        eventos.map((evento) => (
                            <div className="card-evento" key={evento.id}>
                                <img src={evento.imagem} alt="Imagem do evento" className="img-evento" />
                                <h3>{evento.titulo}</h3>
                                <p>{evento.conteudo}</p>
                                <p><strong>Local:</strong> {evento.local}</p>
                                <p><strong>Data:</strong> {evento.data}</p>
                                <p><strong>Horário:</strong> {evento.horaInicio} - {evento.horaFim}</p>
                                <p><strong>Vagas:</strong> {evento.capacidade}</p>
                                <button className="btn-ver-mais-evento">Conheça o Evento</button>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum evento exclusivo disponível no momento.</p>
                    )}
                </div>
                <Link to="/criarEvento"><button className="btn-criar-evento">Criar Evento</button></Link>
            </div>
            <Footer />
        </div>
    );
}

export default EventosExclusivos;
