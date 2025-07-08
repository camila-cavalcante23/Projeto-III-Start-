import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import './ListaFrequencia.css';
import axios from "axios";

function ListaDeFrequencia() {
    const [eventos, setEventos] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState("");

    useEffect(() => {
        axios.get("https://localhost:44367/eventos")
            .then(res => setEventos(res.data))
            .catch(err => console.error(err));
    }, []);

    const buscarParticipantes = (id) => {
        setEventoSelecionado(id);
        axios.get(`https://localhost:44367/eventos/${id}/participantes`)
            .then(res => setParticipantes(res.data))
            .catch(err => console.error(err));
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Frequência", 14, 20);
        doc.autoTable({
            startY: 30,
            head: [["Nome", "Email", "CPF"]],
            body: participantes.map(p => [p.nome, p.email, p.cpf])
        });
        doc.save("lista_frequencia.pdf");
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

                {eventoSelecionado && participantes.length === 0 && (
                    <p>Nenhum participante para este evento.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ListaDeFrequencia;
