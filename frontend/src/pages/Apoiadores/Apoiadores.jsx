import React, { useState, useEffect } from "react"; // 1. Importamos as ferramentas do React
import "./Apoiadores.css"; 
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import api from "../../services/api"; // 1. Importamos nossa 'api'

const Apoiadores = () => {
    // 2. Criamos um estado para guardar a lista de apoiadores que virá da API
    const [apoiadores, setApoiadores] = useState([]);

    // 3. Usamos o useEffect para buscar os dados da API assim que a página carrega
    useEffect(() => {
        const fetchApoiadores = async () => {
            try {
                // (Confirme com seu amigo se o endpoint '/apoiadores' está correto)
                const response = await api.get('/apoiadores');
                setApoiadores(response.data); // Guardamos a lista no nosso estado
            } catch (error) {
                console.error("Erro ao buscar apoiadores:", error);
            }
        };
        fetchApoiadores();
    }, []); // O array vazio [] garante que isso rode apenas uma vez.

    return (
        <div className="apoiadores-page-wrapper">
            <Navbar2 />
            <main className="apoiadores-container">
                <h1 className="main-title">Conheça Nossos Parceiros</h1>
                
                {/* 4. Usamos o .map para criar dinamicamente um bloco para cada apoiador vindo da API */}
                {apoiadores.map((apoiador) => (
                    <article className="supporter-block" key={apoiador.id}>
                        <div className="supporter-info">
                            {/* Assumindo que o objeto 'apoiador' tem os campos 'nome' e 'descricao' */}
                            <h2>{apoiador.nome}</h2>
                            <p>{apoiador.descricao}</p>
                        </div>
                        <div className="supporter-logo">
                             {/* Assumindo que o objeto 'apoiador' tem o campo 'logoUrl' */}
                            <img src={apoiador.logoUrl} alt={`Logo do ${apoiador.nome}`} />
                        </div>
                    </article>
                ))}

            </main> 
            <Footer />
        </div>
    );
};

export default Apoiadores;