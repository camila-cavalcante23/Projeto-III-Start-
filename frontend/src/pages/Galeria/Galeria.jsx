import React, { useState, useEffect } from "react";
import "./Galeria.css";
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Carrossel from "../../components/Carrossel/Carrossel";
import api from "../../services/api";

const getMimeType = (ext) => {
    switch (ext.toLowerCase()) {
        case "jpg":
        case "jpeg":
            return "jpeg";
        case "png":
            return "png";
        case "gif":
            return "gif";
        case "webp":
            return "webp";
        default:
            return ext.toLowerCase();
    }
};

const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const Galeria = () => {
    const [galerias, setGalerias] = useState([]);
    const [galeriasFiltradas, setGaleriasFiltradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [filtroAno, setFiltroAno] = useState('');
    const [filtroMes, setFiltroMes] = useState('');
    const [anosDisponiveis, setAnosDisponiveis] = useState([]);
    const [mesesDisponiveis, setMesesDisponiveis] = useState([]); // NOVO estado

    useEffect(() => {
        const fetchGalerias = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await api.get('/Gallery');
                if (response.data && Array.isArray(response.data.data)) {
                    let dados = response.data.data;
                    dados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    const galeriasComImagensFormatadas = dados.map(galeria => {
                        const imagensFormatadas = (galeria.imageDetails || [])
                            .map(imageDetails => {
                                if (imageDetails.base64 && imageDetails.extension) {
                                    const extension = imageDetails.extension.replace('.', '');
                                    const mimeType = getMimeType(extension);
                                    return `data:image/${mimeType};base64,${imageDetails.base64}`;
                                }
                                return null;
                            })
                            .filter(imgUrl => imgUrl !== null);
                        return { ...galeria, formattedImages: imagensFormatadas };
                    });

                    setGalerias(galeriasComImagensFormatadas);
                    setGaleriasFiltradas(galeriasComImagensFormatadas);
                } else {
                    console.error("Dados da API não são válidos:", response.data);
                    setGalerias([]);
                    setGaleriasFiltradas([]);
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

    // NOVO useEffect para extrair anos e meses após o carregamento
    useEffect(() => {
        if (galerias.length > 0) {
            // Extrai e ordena os anos únicos
            const anosUnicos = Array.from(new Set(
                galerias.map(g => new Date(g.createdAt).getFullYear())
            )).sort((a, b) => b - a);
            setAnosDisponiveis(["", ...anosUnicos]);

            // Extrai os meses únicos do ano selecionado
            const mesesDoAnoSelecionado = new Set(
                galerias
                    .filter(g => filtroAno === '' || new Date(g.createdAt).getFullYear().toString() === filtroAno)
                    .map(g => (new Date(g.createdAt).getMonth() + 1).toString().padStart(2, '0'))
            );
            
            const mesesDisponiveisFormatados = Array.from(mesesDoAnoSelecionado)
              .sort()
              .map(mesNum => ({
                value: mesNum,
                label: nomesMeses[parseInt(mesNum, 10) - 1]
              }));
              
            setMesesDisponiveis([{ value: "", label: "Todos os Meses" }, ...mesesDisponiveisFormatados]);
        } else {
          setAnosDisponiveis([]);
          setMesesDisponiveis([]);
        }
    }, [galerias, filtroAno]);

    useEffect(() => {
        let filtradas = galerias;

        if (filtroAno) {
            filtradas = filtradas.filter(galeria =>
                new Date(galeria.createdAt).getFullYear().toString() === filtroAno
            );
        }

        if (filtroMes) {
            filtradas = filtradas.filter(galeria => {
                const mes = (new Date(galeria.createdAt).getMonth() + 1).toString().padStart(2, '0');
                return mes === filtroMes;
            });
        }
        setGaleriasFiltradas(filtradas);
    }, [filtroAno, filtroMes, galerias]);

    return (
        <div className="pagina-galeria">
            <Navbar2 />
            <div className="galeria-container-principal">
                <h1 className="galeria-titulo-pagina">Galeria</h1>

                <div className="galeria-filtros">
                    <div className="filtro-item">
                        <label htmlFor="filtro-ano">Ano:</label>
                        <select
                            id="filtro-ano"
                            className="galeria-select-filtro"
                            value={filtroAno}
                            onChange={(e) => {
                                setFiltroAno(e.target.value);
                                setFiltroMes('');
                            }}
                        >
                            <option value="">Todos os Anos</option>
                            {anosDisponiveis.map(ano => (
                                <option key={ano} value={ano}>{ano}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filtro-item">
                        <label htmlFor="filtro-mes">Mês:</label>
                        <select
                            id="filtro-mes"
                            className="galeria-select-filtro"
                            value={filtroMes}
                            onChange={(e) => setFiltroMes(e.target.value)}
                            disabled={!filtroAno}
                        >
                            {mesesDisponiveis.map(mes => (
                                <option key={mes.value} value={mes.value}>
                                    {mes.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <p className="galeria-mensagem">Carregando galerias...</p>
                ) : error ? (
                    <p className="galeria-mensagem">{error}</p>
                ) : galeriasFiltradas.length === 0 ? (
                    <p className="galeria-mensagem">Nenhuma galeria encontrada com os filtros selecionados.</p>
                ) : (
                    galeriasFiltradas.map((galeria) => (
                        <div key={galeria.id} className="galeria-evento">
                            <h2 className="galeria-evento-titulo">{galeria.title}</h2>
                            <p className="galeria-evento-data">
                                Data: {new Date(galeria.createdAt).toLocaleDateString()}
                            </p>
                            <Carrossel imagens={galeria.formattedImages} />
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Galeria;
