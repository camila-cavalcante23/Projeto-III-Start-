import React, { useState, useEffect } from "react"; // Adicionado useEffect
import api from '../../services/api';
import './AdicionarImagem.css';
import StartUFC from '../../assets/StartUFC-logo.png';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import { useAuth } from '../../context/AuthContext'; // Importado useAuth

function AdicionarImagem() {
    const [titulo, setTitulo] = useState('');
    // Removido o estado 'conteudo' pois não é necessário para SaveGalleryRequest
    const [imagem, setImagem] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const { user } = useAuth(); // Obtém o objeto de usuário do contexto de autenticação

    // NOVO useEffect para carregar o token do localStorage
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        // Opcional: Redirecionar para a página de login se não houver token
        // else { navigate('/LoginAdmin'); }
    }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagem) {
            setMensagem('Selecione uma imagem antes de enviar.');
            return;
        }

        // Verifica se o usuário está logado para obter o UserId
        if (!user || (!user.nameid && !user.sub)) {
            setMensagem('Erro: Usuário não autenticado. Faça login novamente.');
            return;
        }
        const userId = user.nameid || user.sub; // Obtém o UserId do token decodificado

        const reader = new FileReader();

        // Define o que acontece quando a leitura do arquivo terminar
        reader.onloadend = async () => {
            const base64String = reader.result; // Ex: "data:image/png;base64,iVBORw0KGgo..."
            
            // Extrai o tipo MIME e a extensão da imagem
            const parts = base64String.split(';');
            const mimeType = parts[0].split(':')[1]; // Ex: "image/png"
            const extension = '.' + mimeType.split('/')[1]; // Ex: ".png"
            const base64Data = parts[1].split(',')[1]; // Apenas a parte base64 pura

            // Formata a imagem para o formato esperado pelo backend (List<ImageDetailsRequest>)
            const imageDetailsList = [{
                Base64: base64Data,
                Extension: extension
            }];

            // AJUSTE CRUCIAL AQUI: Payload alinhado com SaveGalleryRequest
            const payload = {
                Title: titulo,          // Mapeado de 'titulo' para 'Title'
                ImageDetails: imageDetailsList, // Adicionado a lista de ImageDetails
                UserId: userId          // Adicionado o UserId do usuário logado
            };

            try {
                // AJUSTE CRUCIAL AQUI: Endpoint correto para o GalleryController
                const response = await api.post('/Gallery/SaveGallery', payload);

                setMensagem('Imagem da Galeria enviada com sucesso!');
                setTitulo('');
                setImagem(null);
                // Limpa a seleção do input de arquivo
                document.querySelector('input[type="file"]').value = '';
            } catch (error) {
                console.error('Erro ao enviar imagem da galeria:', error);
                setMensagem('Erro ao enviar imagem da galeria. Tente novamente.');
                if (error.response && error.response.data) {
                    console.error('Detalhes do erro do backend (JSON):', JSON.stringify(error.response.data, null, 2));
                    const backendErrorMessage = error.response.data.message ||
                                                (error.response.data.errors && Object.values(error.response.data.errors).flat().join(', ')) ||
                                                'Erro de validação. Verifique os campos.';
                    setMensagem(backendErrorMessage);
                }
            }
        };

        reader.readAsDataURL(imagem);
    };

    return (
        <React.Fragment>
            <NavbarAdmin />
            <div className="adicionar-imagem-container">
                <div className="logo-com-bloco">
                    <img src={StartUFC} alt="Start UFC" className="logo-esquerda" />
                </div>
                <div className="bolinhas-verdes">
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                </div>
                {/* Título da página ajustado */}
                <h2 className="titulo-pagina">Adicionar Imagem à Galeria</h2>
                <form onSubmit={handleSubmit} className="formulario-imagem">
                    <label>Título da Imagem:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    
                    {/* Removido o campo de conteúdo */}
                    {/* <label>Conteúdo da Notícia:</label>
                    <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} required /> */}

                    <label>Imagem:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} required />
                    {/* Texto do botão ajustado */}
                    <button type="submit" className="btn-enviar">Adicionar Imagem</button>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                </form>
            </div>
        </React.Fragment>
    );
}

export default AdicionarImagem;
