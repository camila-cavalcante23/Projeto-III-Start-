import React, { useState, useEffect } from 'react'; //  useState e useEffect para o futuro
import { Link } from "react-router-dom";
import "./Eventos.css";  
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";

// Imagens dos eventos
import event1 from '../../assets/event1.png';
import event2 from '../../assets/event2.png';
import event3 from '../../assets/event3.png';
import event4 from '../../assets/event4.png';
import event5 from '../../assets/event5.png';
import event6 from '../../assets/event6.png';

//  dados de exemplo 
const mockEventos = [
    { id: 1, titulo: "Palestra sobre inovação", imagem: event1 },
    { id: 2, titulo: "Feira de Startups", imagem: event2 },
    { id: 3, titulo: "Gestão Pública: O caso 2", imagem: event3 },
    { id: 4, titulo: "Sertão do Inhamuns", imagem: event4 },
    { id: 5, titulo: "Edital Startup Nordeste", imagem: event5 },
    { id: 6, titulo: "Game Board", imagem: event6 }
];

const Eventos = () => {
    // No futuro, troca isso pela chamada ao backend
    const [eventos, setEventos] = useState(mockEventos);

    return ( 
        <div className="eventos-page">
            <Navbar2 />  
            
            {/* Container principal que alinha com o resto do site */}
            <main className="eventos-container">
                <header className="eventos-header">
                    <h1 className="main-title">Eventos</h1>
                </header>

                <div className="eventos-grid">
                    {eventos.map(evento => (
                        // O card agora é o container, o link está no botão
                        <div key={evento.id} className="evento-card">
                            <img src={evento.imagem} alt={evento.titulo} className="evento-imagem" />
                            <div className="evento-info">
                                <h3 className="evento-titulo">{evento.titulo}</h3>
                                {/* O Link agora é dinâmico, levando para o ID de cada evento */}
                                <Link to={`/detalhesevento/${evento.id}`} className="evento-botao">
                                     Conheça o evento
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};
  
export default Eventos;