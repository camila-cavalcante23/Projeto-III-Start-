import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import './ListaFrequencia.css';
// 1. MUDANÇA PADRÃO: Trocamos a importação
import api from "../../services/api";

function ListaDeFrequencia() {
    const [eventos, setEventos] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState("");

    useEffect(() => {
        // 2. MUDANÇA: Convertido para async/await e usando 'api.get'
        const fetchEventos = async () => {
            try {
                const res = await api.get("/eventos");
                setEventos(res.data);
            } catch (err) {
                console.error("Erro ao buscar eventos:", err);
            }
        };
        fetchEventos();
    }, []);

    const buscarParticipantes = async (id) => {
        // Previne uma chamada à API se o usuário selecionar a opção "Selecione um evento"
        if (!id) {
            setParticipantes([]);
            setEventoSelecionado("");
            return;
        }

        setEventoSelecionado(id);
        try {
            // 3. MUDANÇA: Convertido para async/await e usando 'api.get'
            const res = await api.get(`/eventos/${id}/participantes`);
            setParticipantes(res.data);
        } catch (err) {
            console.error("Erro ao buscar participantes:", err);
            // Limpa a lista de participantes em caso de erro
            setParticipantes([]); 
        }
    };

    // A função de exportar PDF não faz chamadas à API, então ela não precisa de alterações.
    const exportarPDF = () => {
        const doc = new jsPDF();
        const eventoAtual = eventos.find(e => e.id === eventoSelecionado);
        const tituloEvento = eventoAtual ? eventoAtual.titulo : "Lista de Frequência";

        doc.text(tituloEvento, 14, 20);
        doc.autoTable({
            startY: 30,
            head: [["Nome", "Email", "CPF"]],
            body: participantes.map(p => [p.nome, p.email, p.cpf])
        });
        doc.save(`lista_frequencia_${tituloEvento}.pdf`);
    };

    return (
        <div className="lista-frequencia">
            <Navbar />
            <div className="conteudo">
                <h2>Lista de Frequência</h2>

                <select onChange={(e) => buscarParticipantes(e.target.value)} value={eventoSelecionado}>
                    <option value="">Selecione um evento</option>
                    {eventos.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.titulo}</option>
                    ))}
                </select>

                {participantes.length > 0 && (
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
                                        <td>{p.nome}</td>
                                        <td>{p.email}</td>
                                        <td>{p.cpf}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={exportarPDF}>Baixar PDF</button>
                    </>
                )}

                {/* Exibe uma mensagem se um evento foi selecionado mas não há participantes */}
                {eventoSelecionado && participantes.length === 0 && (
                    <p>Nenhum participante inscrito para este evento.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ListaDeFrequencia;