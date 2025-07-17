import React, { useEffect, useState } from "react";
import "./EditarEventos.css"; // Certifique-se de que este arquivo CSS existe
import api from "../../services/api";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin"; // Usando NavbarAdmin
import { useAuth } from '../../context/AuthContext'; // Importa useAuth

function EditarEventos() {
    const [eventos, setEventos] = useState([]);
    const [mensagem, setMensagem] = useState(''); // Estado para mensagens de feedback

    const { user } = useAuth(); // Obtém o objeto de usuário do contexto de autenticação

    // Efeito para configurar o cabeçalho de Autorização para todas as chamadas da API
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common['Authorization'];
            setMensagem("Você não está autenticado. Faça login para acessar.");
        }
    }, [user]); // Reexecuta quando o objeto 'user' muda (ex: após login/logout)

    // Efeito para buscar eventos ao carregar o componente
    useEffect(() => {
        // Busca eventos apenas se houver um token de autenticação (rota protegida)
        if (localStorage.getItem('authToken')) {
            fetchEventos();
        } else {
            setMensagem("Faça login para ver e editar os eventos.");
        }
    }, [user]); // Rebusca quando o objeto 'user' muda

    const fetchEventos = async () => {
        try {
            // Endpoint para buscar todos os eventos
            const response = await api.get("/Event"); // GET para /Event
            
            // Acessa response.data.data para obter o array real de eventos
            const fetchedEvents = response.data.data.map(eventoBackend => {
                // Formata TimeOnly (ex: "15:30:00") para HH:mm para o input
                const formattedStartTime = eventoBackend.startTime ? eventoBackend.startTime.substring(0, 5) : '';
                const formattedEndTime = eventoBackend.endTime ? eventoBackend.endTime.substring(0, 5) : '';
                
                // Formata DateOnly (ex: "2025-07-16") para o input datetime-local (apenas a data)
                const formattedDate = eventoBackend.date; // Já deve vir como YYYY-MM-DD

                // ATENÇÃO: O backend não está retornando dados de imagem para eventos no EventResponseDTO.
                // Usamos um placeholder por enquanto. Para exibir imagens reais, o backend
                // precisaria ser modificado para incluir ImageDetailsDTO no EventResponseDTO.
                const displayImageUrl = (eventoBackend.imageDetails && eventoBackend.imageDetails.length > 0)
                    ? `data:image/${eventoBackend.imageDetails[0].extension.substring(1)};base64,${eventoBackend.imageDetails[0].base64}`
                    : 'https://placehold.co/150x150?text=Sem+Imagem';

                return {
                    id: eventoBackend.id,
                    name: eventoBackend.name,             // Mapeia para 'name' (PascalCase)
                    description: eventoBackend.description, // Mapeia para 'description' (PascalCase)
                    place: eventoBackend.place,           // Mapeia para 'place' (PascalCase)
                    date: formattedDate,                  // Mapeia para 'date' (YYYY-MM-DD)
                    startTime: formattedStartTime,        // Mapeia para 'startTime' (HH:mm)
                    endTime: formattedEndTime,            // Mapeia para 'endTime' (HH:mm)
                    capacity: eventoBackend.capacity,     // Mapeia para 'capacity' (int)
                    userId: eventoBackend.creationUserId, // Assumindo creationUserId é o UserId
                    // Para a edição, precisamos armazenar os detalhes da imagem se existirem
                    imageDetails: eventoBackend.imageDetails || [],
                    displayUrl: displayImageUrl // URL para exibição
                };
            });
            setEventos(fetchedEvents);
            setMensagem(""); // Limpa mensagem de erro ao buscar com sucesso
        } catch (err) {
            console.error("Erro ao buscar eventos:", err);
            setMensagem("Erro ao carregar eventos. Verifique sua conexão ou autenticação.");
        }
    };

    // Lida com a mudança de campos de texto e números
    const handleChange = (id, field, value) => {
        setEventos((prev) =>
            prev.map((ev) =>
                ev.id === id ? { ...ev, [field]: value } : ev
            )
        );
    };

    // Lida com a mudança do arquivo de imagem
    const handleImageFileChange = (id, file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const parts = base64String.split(';');
            const mimeType = parts[0].split(':')[1];
            const extension = '.' + mimeType.split('/')[1];
            const base64Data = parts[1].split(',')[1];

            setEventos((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              // Substitui os detalhes da imagem existentes pelos novos
                              imageDetails: [{ base64: base64Data, extension: extension }],
                              displayUrl: `data:image/${extension.substring(1)};base64,${base64Data}`
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

        // Garante que o UserId esteja disponível
        const currentUserId = eventoToSave.userId || (user ? (user.nameid || user.sub) : null);
        if (!currentUserId) {
            setMensagem("Erro: ID do usuário não disponível para salvar o evento. Faça login novamente.");
            return;
        }

        // Payload alinhado com UpdateEventRequest (PascalCase para o backend)
        const payload = {
            Id: eventoToSave.id,
            Name: eventoToSave.name,
            Description: eventoToSave.description,
            Place: eventoToSave.place,
            // Certifique-se de que StartTime e EndTime são strings HH:mm
            StartTime: eventoToSave.startTime, 
            EndTime: eventoToSave.endTime,
            Date: eventoToSave.date, // Certifique-se de que é YYYY-MM-DD
            Capacity: parseInt(eventoToSave.capacity, 10), // Garante que é um número
            ImageDetails: eventoToSave.imageDetails, // Envia a lista de ImageDetails
            UserId: currentUserId
        };

        try {
            // Endpoint para atualizar um evento
            await api.put(`/Event`, payload); // PUT para /Event/{id}
            setMensagem("Evento salvo com sucesso!");
            fetchEventos(); // Rebusca para garantir consistência dos dados
        } catch (err) {
            console.error("Erro ao salvar evento:", err);
            setMensagem("Erro ao salvar evento. Verifique os dados e tente novamente.");
            if (err.response && err.response.data) {
                console.error('Detalhes do erro do backend (JSON):', JSON.stringify(err.response.data, null, 2));
                setMensagem(err.response.data.message || 'Erro ao salvar evento.');
            }
        }
    };

    const handleExcluir = async (id) => {
        try {
            // Endpoint para excluir um evento
            await api.delete(`/Event/${id}`); // DELETE para /Event/{id}
            setEventos((prev) => prev.filter((e) => e.id !== id));
            setMensagem("Evento excluído com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir evento:", err);
            setMensagem("Erro ao excluir evento. Tente novamente.");
            if (err.response && err.response.data) {
                console.error('Detalhes do erro do backend (JSON):', JSON.stringify(err.response.data, null, 2));
                setMensagem(err.response.data.message || 'Erro ao excluir evento.');
            }
        }
    };

    return (
        <div className="editar-eventos"> {/* Classe CSS ajustada */}
            <NavbarAdmin />
            <div className="container-editar">
                <h2>Editar Eventos</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>} {/* Exibe mensagens */}
                <div className="grid-cards">
                    {eventos.length > 0 ? (
                        eventos.map((evento) => (
                            <div className="card" key={evento.id}>
                                <img src={evento.displayUrl} alt={evento.name} className="img-evento" />
                                
                                <label>Título:</label>
                                <input
                                    type="text"
                                    value={evento.name} // Usa 'name' do estado
                                    onChange={(e) => handleChange(evento.id, "name", e.target.value)}
                                />
                                
                                <label>Descrição:</label>
                                <textarea
                                    rows="4" // Ajuste o número de linhas conforme necessário
                                    value={evento.description} // Usa 'description' do estado
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
                                    type="date" // Use type="date" para DateOnly
                                    value={evento.date}
                                    onChange={(e) => handleChange(evento.id, "date", e.target.value)}
                                />

                                <label>Hora de Início:</label>
                                <input
                                    type="time" // Use type="time" para TimeOnly
                                    value={evento.startTime}
                                    onChange={(e) => handleChange(evento.id, "startTime", e.target.value)}
                                />

                                <label>Hora de Fim:</label>
                                <input
                                    type="time" // Use type="time" para TimeOnly
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
