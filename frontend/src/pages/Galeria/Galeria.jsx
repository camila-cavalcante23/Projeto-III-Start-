import React, { useState, useEffect } from "react"; // 1. Importamos as ferramentas do React
import "./Galeria.css"; 
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Carrossel from "../../components/Carrossel/Carrossel"; 
import api from "../../services/api"; // 1. Importamos nossa api

// 2. Removemos os dados mock e todas as importações de imagens locais.
// As imagens e informações da galeria agora virão do backend.

const Galeria = () => {
  
    // 3. Criamos o estado para armazenar as galerias que virão da API
    const [galerias, setGalerias] = useState([]);

    // 4. Usamos o useEffect para buscar os dados da API quando a página carregar
    useEffect(() => {
        const fetchGalerias = async () => {
            try {
                // (Confirme com seu amigo se o endpoint '/galeria' está correto)
                const response = await api.get('/galeria');
                setGalerias(response.data);
            } catch (error) {
                console.error("Erro ao buscar galerias:", error);
            }
        };
        fetchGalerias();
    }, []); // O array vazio [] garante que a busca aconteça só uma vez.

    return (
        <div className="pagina-galeria">
            <Navbar2 />
            <div className="galeria-container-principal">
                <h1 className="galeria-titulo-pagina">Galeria</h1>

                {/* 5. Mapeamos o estado 'galerias' com os dados reais vindos da API */}
                {galerias.map((galeria) => (
                    <div key={galeria.id} className="galeria-evento">
                        {/* Assumindo que o objeto 'galeria' tem os campos 'titulo' e 'descricao' */}
                        <h2 className="galeria-evento-titulo">{galeria.titulo}</h2>
                        <p className="galeria-evento-descricao">{galeria.descricao}</p>
                        
                        {/* Renderiza o seu componente Carrossel para cada galeria */}
                        {/* Assumindo que o objeto 'galeria' tem um array 'imagens' com as URLs */}
                        <Carrossel imagens={galeria.imagens} />
                    </div>
                ))}
            </div>

            <div className="algo">

            </div>
            <Footer /> 
        </div>
        
    );
};

export default Galeria;