import React, { useEffect, useState } from "react";
import "./EditarEventos.css";
import api from "../../services/api";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import { useAuth } from '../../context/AuthContext';

function EditarEventos() {
    const [eventos, setEventos] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common['Authorization'];
            setMensagem("Você não está autenticado. Faça login para acessar.");
        }
    }, [user]);

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            fetchEventos();
        } else {
            setMensagem("Faça login para ver e editar os eventos.");
        }
    }, [user]);

    const fetchEventos = async () => {
        try {
            const response = await api.get("/Event");
            
            const fetchedEvents = response.data.data.map(eventoBackend => {
                const formattedStartTime = eventoBackend.startTime ? eventoBackend.startTime.substring(0, 5) : '';
                const formattedEndTime = eventoBackend.endTime ? eventoBackend.endTime.substring(0, 5) : '';
                const formattedDate = eventoBackend.date;

                // --- ATENÇÃO: ESTE É O PONTO CRÍTICO PARA O BACKEND ---
                // O backend PRECISA retornar os detalhes da imagem aqui
                // (base64 e extension, por exemplo) para que o frontend possa exibi-la
                // e, mais importante, REENVIÁ-LA caso o usuário não faça upload de uma nova.
                // Exemplo esperado do backend:
                // {
                //   "id": 1,
                //   "name": "Nome Evento",
                //   "imageDetails": [
                //     {
                //       "base64": "SUJBTSBBIENPUkFDQU8=", // A string Base64 da imagem
                //       "extension": ".png" // A extensão ou tipo MIME
                //     }
                //   ],
                //   // ... outras propriedades do evento
                // }
                // Se o backend retorna uma URL simples, então a lógica seria diferente
                // e você precisaria de um input diferente para a imagem.
                // Mas, como você está usando Base64 no handleImageFileChange,
                // estamos assumindo que o backend também trabalha com isso.

                let displayImageUrl = 'https://placehold.co/150x150?text=Sem+Imagem';
                let currentImageDetails = eventoBackend.imageDetails || [];

                if (currentImageDetails.length > 0 && currentImageDetails[0].base64 && currentImageDetails[0].extension) {
                    const base64 = currentImageDetails[0].base64;
                    const extension = currentImageDetails[0].extension.replace('.', ''); // Remove o ponto da extensão
                    displayImageUrl = `data:image/${extension};base64,${base64}`;
                }

                return {
                    id: eventoBackend.id,
                    name: eventoBackend.name,
                    description: eventoBackend.description,
                    place: eventoBackend.place,
                    date: formattedDate,
                    startTime: formattedStartTime,
                    endTime: formattedEndTime,
                    capacity: eventoBackend.capacity,
                    userId: eventoBackend.creationUserId,
                    imageDetails: currentImageDetails, // Armazena os detalhes da imagem retornados pelo backend
                    displayUrl: displayImageUrl // URL para exibição
                };
            });
            setEventos(fetchedEvents);
            setMensagem("");
        } catch (err) {
            console.error("Erro ao buscar eventos:", err);
            setMensagem("Erro ao carregar eventos. Verifique sua conexão ou autenticação.");
        }
    };

    const handleChange = (id, field, value) => {
        setEventos((prev) =>
            prev.map((ev) =>
                ev.id === id ? { ...ev, [field]: value } : ev
            )
        );
    };

    const handleImageFileChange = (id, file) => {
        if (!file) {
            // Se nenhum arquivo for selecionado (ex: o usuário limpou o campo),
            // você pode optar por remover a imagem ou manter a anterior.
            // Aqui, vamos limpar os detalhes da imagem e voltar para o placeholder.
            setEventos((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              imageDetails: [], // Limpa os detalhes da imagem
                              displayUrl: 'https://placehold.co/150x150?text=Sem+Imagem'
                          }
                        : item
                )
            );
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const parts = base64String.split(';');
            const mimeType = parts[0].split(':')[1];
            const extension = '.' + mimeType.split('/')[1]; // Ex: ".png", ".jpeg"
            const base64Data = parts[1].split(',')[1]; // Apenas a string Base64

            setEventos((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              // Substitui os detalhes da imagem existentes pelos novos
                              imageDetails: [{ base64: base64Data, extension: extension }],
                              displayUrl: `data:${mimeType};base64,${base64Data}` // Usa o mimeType real
                          }
                        : item
                )
            );
        };
        reader.readAsDataURL(file);
    };

    const handleSalvar = async (id) => {
        const eventoToSave = eventos.find((e) => e.id === id);
        if (!eventoToSave) {
            setMensagem("Evento não encontrado para salvar.");
            return;
        }

        const currentUserId = eventoToSave.userId || (user ? (user.nameid || user.sub) : null);
        if (!currentUserId) {
            setMensagem("Erro: ID do usuário não disponível para salvar o evento. Faça login novamente.");
            return;
        }

        const payload = {
            Id: eventoToSave.id,
            Name: eventoToSave.name,
            Description: eventoToSave.description,
            Place: eventoToSave.place,
            StartTime: eventoToSave.startTime,
            EndTime: eventoToSave.endTime,
            Date: eventoToSave.date,
            Capacity: parseInt(eventoToSave.capacity, 10),
            // Aqui, ImageDetails pode ser um array vazio se nenhuma imagem foi selecionada/retornada
            // ou conter o novo/existente Base64 se a imagem foi carregada/retornada.
            ImageDetails: eventoToSave.imageDetails, 
            UserId: currentUserId
        };

        try {
            await api.put(`/Event`, payload);
            setMensagem("Evento salvo com sucesso!");
            fetchEventos();
        } catch (err) {
            console.error("Erro ao salvar evento:", err);
            if (err.response && err.response.data) {
                console.error('Detalhes do erro do backend (JSON):', JSON.stringify(err.response.data, null, 2));
                setMensagem(err.response.data.message || 'Erro ao salvar evento.');
            } else {
                setMensagem("Erro ao salvar evento. Verifique os dados e tente novamente.");
            }
        }
    };

    const handleExcluir = async (id) => {
        try {
            await api.delete(`/Event/${id}`);
            setEventos((prev) => prev.filter((e) => e.id !== id));
            setMensagem("Evento excluído com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir evento:", err);
            if (err.response && err.response.data) {
                console.error('Detalhes do erro do backend (JSON):', JSON.stringify(err.response.data, null, 2));
                setMensagem(err.response.data.message || 'Erro ao excluir evento.');
            } else {
                setMensagem("Erro ao excluir evento. Tente novamente.");
            }
        }
    };

    return (
        <div className="editar-eventos">
            <NavbarAdmin />
            <div className="container-editar">
                <h2>Editar Eventos</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>}
                <div className="grid-cards">
                    {eventos.length > 0 ? (
                        eventos.map((evento) => (
                            <div className="card" key={evento.id}>
                                <img src={evento.displayUrl} alt={evento.name} className="img-evento" />
                                
                                <label>Título:</label>
                                <input
                                    type="text"
                                    value={evento.name}
                                    onChange={(e) => handleChange(evento.id, "name", e.target.value)}
                                />
                                
                                <label>Descrição:</label>
                                <textarea
                                    rows="4"
                                    value={evento.description}
                                    onChange={(e) => handleChange(evento.id, "description", e.target.value)}
                                />

                                <label>Local:</label>
                                <input
                                    type="text"
                                    value={evento.place}
                                    onChange={(e) => handleChange(evento.id, "place", e.target.value)}
                                />

                                <label>Data:</label>
                                <input
                                    type="date"
                                    value={evento.date}
                                    onChange={(e) => handleChange(evento.id, "date", e.target.value)}
                                />

                                <label>Hora de Início:</label>
                                <input
                                    type="time"
                                    value={evento.startTime}
                                    onChange={(e) => handleChange(evento.id, "startTime", e.target.value)}
                                />

                                <label>Hora de Fim:</label>
                                <input
                                    type="time"
                                    value={evento.endTime}
                                    onChange={(e) => handleChange(evento.id, "endTime", e.target.value)}
                                />

                                <label>Capacidade:</label>
                                <input
                                    type="number"
                                    value={evento.capacity}
                                    onChange={(e) => handleChange(evento.id, "capacity", e.target.value)}
                                    min="1"
                                />

                                <label>Alterar Imagem:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageFileChange(evento.id, e.target.files[0])}
                                />

                                <div className="card-buttons">
                                    <button className="salvar" onClick={() => handleSalvar(evento.id)}>
                                        Salvar
                                    </button>
                                    <button className="excluir" onClick={() => handleExcluir(evento.id)}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum evento para editar no momento.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditarEventos;