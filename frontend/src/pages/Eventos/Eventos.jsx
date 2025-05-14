import React from 'react';
import { Link } from "react-router-dom";
import "./Eventos.css";  
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";

import event1 from '../../assets/event1.png';
import event2 from '../../assets/event2.png';
import event3 from '../../assets/event3.png';
import event4 from '../../assets/event4.png';
import event5 from '../../assets/event5.png';
import event6 from '../../assets/event6.png';

const eventos = [

    { id: 1, titulo: "Palestra sobre inovação", imagem: event1 },
    { id: 2, titulo: "Feira de Startups", imagem: event2 },
    { id: 3, titulo: "Gestão Pública: O caso 2", imagem: event3 },
    { id: 4, titulo: "Sertão do Inhamuns", imagem: event4 },
    { id: 5, titulo: "Edital Startup Nordeste", imagem: event5 },
    { id: 6, titulo: "Game Board", imagem: event6 }
  
];
const Eventos = () => {
    
    

    return ( 
        <div>
            <Navbar2/>  
            <div className="GeralEventos">
                <h1 className="tituloEventos">Eventos Exclusivos</h1>
                <div className="eventosGrid">
                    {eventos.map(evento => (
                        <div key={evento.id} className="eventoCard" onClick={() => handleClick(evento.id)}>
                          <img src={evento.imagem} alt={evento.titulo} className="eventoImagem" />

                            <div className="eventoInfo">
                            <p className="eventoTitulo">{evento.titulo}</p> 

                            <Link to ="/detalhesevento"className="eventoBotao">
                            Conheça o evento</Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};
  
export default Eventos;
