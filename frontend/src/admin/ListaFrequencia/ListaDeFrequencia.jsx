import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin"; // Usar explicitamente NavbarAdmin
import Footer from "../../components/Footer/Footer";
import jsPDF from "jspdf";
import "jspdf-autotable"; 
import './ListaFrequencia.css';
import api from "../../services/api";
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

function ListaDeFrequencia() {
    const [eventos, setEventos] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState("");
    const [mensagem, setMensagem] = useState(''); 
    const [isLoadingEvents, setIsLoadingEvents] = useState(false); 
    const [isLoadingParticipants, setIsLoadingParticipants] = useState(false); 

    const { user, loading: loadingAuth, logout } = useAuth(); 
    const navigate = useNavigate();

    // Função para buscar os eventos
    const fetchEventos = async () => {
        setIsLoadingEvents(true);
        setMensagem('Carregando eventos...'); // Feedback de carregamento
        try {
            const res = await api.get("/events"); 
            // Assumindo que a API retorna um objeto com uma propriedade 'data' que é um array
            setEventos(res.data.data || res.data); // Flexibilidade para res.data ou res.data.data
            setMensagem(''); 
        } catch (err) {
            console.error("Erro ao buscar eventos:", err);
            if (err.response) {
                if (err.response.status === 401) {
                    setMensagem("Sessão expirada ou não autorizado. Redirecionando para o login...");
                    logout(); 
                    setTimeout(() => navigate('/login'), 2000);
                } else if (err.response.status === 403) {
                    setMensagem("Acesso negado para buscar eventos. Redirecionando...");
                    setTimeout(() => navigate('/'), 2000);
                } else {
                    setMensagem(`Erro ao carregar eventos: ${err.response.data.message || 'Erro desconhecido.'}`);
                }
            } else {
                setMensagem("Erro de rede ou servidor. Verifique sua conexão.");
            }
        } finally {
            setIsLoadingEvents(false);
        }
    };

    // Função para buscar os participantes de um evento
    const buscarParticipantes = async (id) => {
        if (!id) {
            setParticipantes([]);
            setEventoSelecionado("");
            setMensagem("Selecione um evento para ver os participantes.");
            return;
        }

        setEventoSelecionado(id);
        setIsLoadingParticipants(true);
        setMensagem('Carregando participantes...'); // Feedback de carregamento
        try {
            const res = await api.get(`/events/${id}/participants`); 
            // Assumindo que a API retorna um objeto com uma propriedade 'data' que é um array
            setParticipantes(res.data.data || res.data); 
            setMensagem('');
        } catch (err) {
            console.error("Erro ao buscar participantes:", err);
            if (err.response) {
                if (err.response.status === 401) {
                    setMensagem("Sessão expirada ou não autorizado. Redirecionando para o login...");
                    logout(); 
                    setTimeout(() => navigate('/login'), 2000);
                } else if (err.response.status === 403) {
                    setMensagem("Acesso negado para buscar participantes. Redirecionando...");
                    setTimeout(() => navigate('/'), 2000);
                } else {
                    setMensagem(`Erro ao carregar participantes: ${err.response.data.message || 'Erro desconhecido.'}`);
                }
            } else {
                setMensagem("Erro de rede ou servidor. Verifique sua conexão.");
            }
            setParticipantes([]); 
        } finally {
            setIsLoadingParticipants(false);
        }
    };

    // Efeito principal para verificação de autenticação e carregamento inicial de eventos
    useEffect(() => {
        // Exibe mensagem de carregamento do estado de autenticação
        if (loadingAuth) {
            setMensagem("Verificando credenciais de administrador...");
            return; 
        }

        // Caso o usuário não esteja logado
        if (!user) {
            setMensagem("Você não está autenticado. Redirecionando para o login...");
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        // Caso o usuário esteja logado, mas não seja um admin
        if (!user.isAdmin) {
            setMensagem("Acesso negado. Você não tem permissão de administrador para visualizar esta página. Redirecionando...");
            setTimeout(() => navigate('/'), 2000); // Redireciona para a página inicial padrão
            return;
        }

        // Se chegou até aqui, o usuário está autenticado E é admin.
        // Então, podemos prosseguir com o carregamento dos eventos.
        fetchEventos();

    }, [user, loadingAuth, navigate, logout]); // Dependências do useEffect

    // A função de exportar PDF não faz chamadas à API, então ela não precisa de alterações.
    const exportarPDF = () => {
        const doc = new jsPDF();
        const eventoAtual = eventos.find(e => e.id === eventoSelecionado);
        // Usar 'Title' como a propriedade do evento, com fallback para 'titulo' se necessário
        const tituloEvento = eventoAtual ? (eventoAtual.Title || eventoAtual.title || eventoAtual.titulo) : "Lista de Frequência"; 

        doc.text(`Lista de Frequência - ${tituloEvento}`, 14, 20);
        doc.autoTable({
            startY: 30,
            head: [["Nome", "Email", "CPF"]],
            // Usar 'name' como a propriedade do participante, com fallback para 'nome' se necessário
            body: participantes.map(p => [p.name || p.nome, p.email, p.cpf]) 
        });
        doc.save(`lista_frequencia_${tituloEvento.replace(/\s/g, '_')}.pdf`); 
    };

    // Lógica de renderização para exibir mensagens de carregamento/erro ou o conteúdo
    // Este bloco de retorno é para estados de carregamento de autenticação ou falta de permissão
    if (loadingAuth || !user || !user.isAdmin) {
        return (
            <div className="lista-frequencia">
                <NavbarAdmin/> {/* Mantemos NavbarAdmin aqui, pois a rota é protegida para admin */}
                <div className="conteudo">
                    <h2>Lista de Frequência</h2>
                    {/* Exibe a mensagem de acordo com o estado */}
                    <p className="mensagem">{mensagem}</p>
                </div>
                <Footer />
            </div>
        );
    }

    // Este bloco de retorno é para quando o usuário é um administrador e tem acesso
    return (
        <div className="lista-frequencia">
            <NavbarAdmin /> {/* Usar NavbarAdmin, já que a página é exclusiva para admins */}
            <div className="conteudo">
                <h2>Lista de Frequência</h2>

                {/* Exibe mensagens de erro/sucesso relacionadas a eventos/participantes */}
                {mensagem && (
                    <p className={`mensagem ${mensagem.includes('Erro:') || mensagem.includes('negado') || mensagem.includes('expirada') ? 'error' : 'success'}`}>
                        {mensagem}
                    </p>
                )}

                {isLoadingEvents ? (
                    <p>Carregando eventos...</p>
                ) : (
<select onChange={(e) => buscarParticipantes(e.target.value)} value={eventoSelecionado}>
    <option value="">Selecione um evento</option>
    {eventos.length > 0 ? (
        eventos.map(ev => (
            <option key={ev.id} value={ev.id}>{ev.title || ev.titulo}</option> // Use 'title' ou 'titulo' conforme o backend
        ))
    ) : (
        <option value="" disabled>Nenhum evento encontrado.</option>
    )}
</select>
                )}

                {isLoadingParticipants ? (
                    <p>Carregando participantes...</p>
                ) : participantes.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>CPF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participantes.map((p, idx) => (
                                    <tr key={idx}>
                                        <td>{p.name || p.nome}</td> 
                                        <td>{p.email}</td>
                                        <td>{p.cpf}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={exportarPDF} className="botao-download-pdf">Baixar PDF</button>
                    </>
                ) : eventoSelecionado && !isLoadingParticipants && (
                    <p className="mensagem">Nenhum participante inscrito para este evento.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ListaDeFrequencia;