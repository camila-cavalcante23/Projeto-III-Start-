import React, { useState, useEffect } from "react"; // Adicionado useEffect
import api from '../../services/api';
import './CriarEvento.css';
import StartUFC from '../../assets/StartUFC-logo.png';
import Navbar2 from "../../components/Navbar/NavbarAdmin";
import { useAuth } from '../../context/AuthContext'; // Importado useAuth

function CriarEvento() {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagem, setImagem] = useState(null);
    const [local, setLocal] = useState('');
    const [dataHoraInicio, setDataHoraInicio] = useState(''); // YYYY-MM-DDTHH:mm
    const [dataHoraFim, setDataHoraFim] = useState('');     // CORRIGIDO: setDataHoraFim
    const [capacidade, setCapacidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    const { user } = useAuth(); // Obtém o objeto de usuário do contexto de autenticação

    // useEffect para carregar o token do localStorage (se necessário, já está no NavbarAdmin/LoginAdmin)
    // Este useEffect é mais para garantir que 'api' tenha o token antes de qualquer requisição.
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        // Se você quiser forçar o login se não houver token, descomente a linha abaixo:
        // else { navigate('/LoginAdmin'); }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagem) {
            setMensagem('Selecione uma imagem antes de enviar.');
            return;
        }

        const parsedCapacidade = parseInt(capacidade, 10);
        if (isNaN(parsedCapacidade) || parsedCapacidade <= 0) {
            setMensagem('A capacidade deve ser um número maior que zero.');
            return;
        }

        // Verifica se o usuário está logado para obter o UserId
        if (!user || (!user.nameid && !user.sub)) {
            setMensagem('Erro: Usuário não autenticado. Faça login novamente.');
            return;
        }
        const userId = user.nameid || user.sub; // Obtém o UserId do token decodificado

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result; // Ex: "data:image/png;base64,iVBORw0KGgo..."
            
            // Extrai o tipo MIME e a extensão da imagem
            const parts = base64String.split(';');
            const mimeType = parts[0].split(':')[1]; // Ex: "image/png"
            const extension = '.' + mimeType.split('/')[1]; // Ex: ".png"
            const base64Data = parts[1].split(',')[1]; // Apenas a parte base64 pura

            // Formata a imagem para o formato esperado pelo backend (List<ImageDetailsRequest>)
            const imageDetailsList = [{
                Base64: base64Data,
                Extension: extension
            }];

            // Extrair apenas a data (YYYY-MM-DD) e apenas a hora (HH:mm)
            const eventDate = dataHoraInicio ? new Date(dataHoraInicio).toISOString().split('T')[0] : ''; // YYYY-MM-DD
            const startTimeOnly = dataHoraInicio ? dataHoraInicio.substring(11, 16) : ''; // HH:mm
            const endTimeOnly = dataHoraFim ? dataHoraFim.substring(11, 16) : '';     // HH:mm

            const payload = {
                Name: titulo,
                Description: conteudo,
                Place: local,
                StartTime: startTimeOnly,
                EndTime: endTimeOnly,
                Date: eventDate,
                Capacity: parsedCapacidade,
                ImageDetails: imageDetailsList, // Adicionado a lista de ImageDetails
                UserId: userId // Adicionado o UserId do usuário logado
            };

            try {
                const response = await api.post('/Event/SaveEvent', payload);

                setMensagem('Evento cadastrado com sucesso!');
                setTitulo('');
                setConteudo('');
                setImagem(null);
                setLocal('');
                setDataHoraInicio('');
                setDataHoraFim('');
                setCapacidade('');
                document.querySelector('input[type="file"]').value = '';
            } catch (error) {
                console.error('Erro ao enviar evento:', error);
                setMensagem('Erro ao enviar evento. Verifique os dados e tente novamente.');

                if (error.response && error.response.data) {
                    console.error('Detalhes do erro do backend (JSON):', JSON.stringify(error.response.data, null, 2));
                    const backendErrorMessage = error.response.data.message ||
                                                (error.response.data.errors && Object.values(error.response.data.errors).flat().join(', ')) ||
                                                'Erro de validação. Verifique os campos.';
                    setMensagem(backendErrorMessage);
                }
            }
        };

        reader.readAsDataURL(imagem);
    };

    return (
        <React.Fragment>
            <Navbar2 />
            <div className="criar-evento-container">
                <div className="logo-com-bloco">
                    <img src={StartUFC} alt="Start UFC" className="logo-esquerda" />
                </div>
                <div className="bolinhas-verdes">
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                </div>
                <h2 className="titulo-pagina-evento">Criar um Evento</h2>
                <form onSubmit={handleSubmit} className="formulario-evento">
                    <label>Título do evento:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

                    <label>Descrição do evento:</label>
                    <textarea rows="8" value={conteudo} onChange={(e) => setConteudo(e.target.value)} required></textarea>

                    <label>Local do evento:</label>
                    <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} required />

                    <label>Data e Hora de Início:</label>
                    <input type="datetime-local" value={dataHoraInicio} onChange={(e) => setDataHoraInicio(e.target.value)} required />

                    <label>Data e Hora de Fim:</label>
                    <input type="datetime-local" value={dataHoraFim} onChange={(e) => setDataHoraFim(e.target.value)} required />

                    <label>Capacidade do evento:</label>
                    <input
                        type="number"
                        value={capacidade}
                        onChange={(e) => setCapacidade(e.target.value)}
                        required
                        min="1"
                    />

                    <label>Imagem do evento:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} required />

                    <button type="submit" className="btn-enviar">Criar Evento</button>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                </form>
            </div>
        </React.Fragment>
    );
}

export default CriarEvento;
