import React, { useState, useEffect } from "react";
import "./Galeria.css"; 
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Carrossel from "../../components/Carrossel/Carrossel"; 
import api from "../../services/api";

const Galeria = () => {
    const [galerias, setGalerias] = useState([]);
    // Adicionando estados de loading e erro para uma melhor experiência
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGalerias = async () => {
            setLoading(true);
            setError('');
            try {
                // 1. CORREÇÃO: O endpoint correto é '/gallery'
                const response = await api.get('/gallery');

                // 2. CORREÇÃO: Os dados estão dentro de response.data.data
                if (response.data && Array.isArray(response.data.data)) {
                    setGalerias(response.data.data);
                } else {
                    console.error("Dados recebidos da API não são um array:", response.data);
                    setGalerias([]);
                }
            } catch (err) {
                console.error("Erro ao buscar galerias:", err);
                setError("Não foi possível carregar a galeria.");
            } finally {
                setLoading(false);
            }
        };
        fetchGalerias();
    }, []);

    return (
        <div className="pagina-galeria">
            <Navbar2 />
            <div className="galeria-container-principal">
                <h1 className="galeria-titulo-pagina">Galeria</h1>

                {loading ? (
                    <p className="galeria-mensagem">Carregando galerias...</p>
                ) : error ? (
                    <p className="galeria-mensagem">{error}</p>
                ) : galerias.length === 0 ? (
                    <p className="galeria-mensagem">Nenhuma galeria encontrada.</p>
                ) : (
                    // Mapeamos o estado 'galerias' com os dados reais
                    galerias.map((galeria) => (
                        <div key={galeria.id} className="galeria-evento">
                            {/* 3. CORREÇÃO: A propriedade é 'title' (em inglês) */}
                            <h2 className="galeria-evento-titulo">{galeria.title}</h2>
                            
                            {/* NOTA: A nossa API ainda não está a enviar as imagens para cada galeria.
                                 Isto será um próximo passo. Por enquanto, o carrossel não terá imagens.
                                 Quando o backend for atualizado para enviar as imagens, este código funcionará. */}
                            <Carrossel imagens={galeria.images || []} />
                        </div>
                    ))
                )}
            </div>
            <Footer /> 
        </div>
    );
};

export default Galeria;
