import React, { useState, useEffect } from "react"; // 1. Importamos o 'useState' e 'useEffect'
import './EventosExclusivos.css';
import api from '../../services/api'; // 1. Importamos nossa 'api'
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

// A variável 'eventosMock' foi removida, pois agora buscaremos os dados reais.

function EventosExclusivos() {
    // 2. Criamos um estado para guardar os eventos que virão da API. Começa como uma lista vazia.
    const [eventos, setEventos] = useState([]);

    // 3. Usamos o useEffect para buscar os dados da API assim que a página carrega.
    // O array vazio [] no final significa que isso roda apenas uma vez.
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await api.get('/eventos'); // Usamos nossa 'api' para fazer a busca
                setEventos(response.data); // Guardamos a lista de eventos no nosso estado
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }
        };

        fetchEventos(); // Executamos a função de busca
    }, []);

    return (
        <div className="eventos-exclusivos">
            <NavbarAdmin />
            <div className="eventos-container">
                <h2 className="titulo-eventos">Eventos Exclusivos</h2>
                <div className="grid-eventos">
                    {/* 4. Mapeamos o estado 'eventos', que agora contém os dados reais da API */}
                    {eventos.map((evento) =>(
                        <div className="card-evento" key={evento.id}>
                            <img src={evento.imagem} alt="Imagem do evento" className="img-evento" />
                            <h3>{evento.titulo}</h3>
                            <p>{evento.conteudo}</p>
                            <button className="btn-ver-mais-evento">Conheça o Evento</button>
                        </div>
                    ))}
                </div>
                <Link to="/criarEvento"><button className="btn-criar-evento">Criar Evento</button></Link>
            </div>
            <Footer />
        </div>
    );
}

export default EventosExclusivos;