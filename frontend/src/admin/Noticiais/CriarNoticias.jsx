import React, { useState } from "react";
// 1. MUDANÇA PADRÃO: Trocamos a importação do axios pela nossa 'api'
import api from '../../services/api';
import './CriarNoticias.css';
import StartUFC from '../../assets/StartUFC-logo.png';
import Navbar2 from "../../components/Navbar2/Navbar2";

function CriarNoticias() {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagem, setImagem] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!imagem){
            setMensagem('Selecione uma imagem antes de enviar.');
            return;
        }

        const reader = new FileReader();
        
        // Define o que acontece quando a leitura do arquivo termina
        reader.onloadend = async () => {
            const imagemBase64 = reader.result;
            
            const payload = {
                titulo,
                conteudo,
                imagemBase64
            };

            try {
                // 2. MUDANÇA PADRÃO: Usamos 'api.post' e removemos a URL base
                const response = await api.post('/api/noticias', payload);

                setMensagem('Notícia enviada com sucesso!');
                setTitulo('');
                setConteudo('');
                setImagem(null);
                // 3. MELHORIA: Limpamos o campo de arquivo para o usuário
                document.querySelector('input[type="file"]').value = '';
            } catch (error) {
                console.error('Erro ao enviar notícia:', error);
                setMensagem('Erro ao enviar notícia. Tente novamente.');
            }
        };

        // Inicia a leitura do arquivo. Quando terminar, o código acima em 'onloadend' será executado.
        reader.readAsDataURL(imagem);
    };

    return (
        <React.Fragment>
            <Navbar2 />
            <div className="criar-noticias-container">
                <div className="logo-com-bloco">
                    <img src={StartUFC} alt="Start UFC" className="logo-esquerda" />
                </div>
                <div className="bolinhas-verdes">
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                </div>
                <h2 className="titulo-pagina">Criar uma Notícia</h2>
                <form onSubmit={handleSubmit} className="formulario-noticia">
                    <label>Título da notícia:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    <label>Conteúdo da notícia:</label>
                    <textarea rows="8" value={conteudo} onChange={(e) => setConteudo(e.target.value)} required></textarea>
                    <label>Imagem da notícia:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} required />
                    <button type="submit" className="btn-enviar">Enviar Notícia</button>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                </form>
            </div>
        </React.Fragment>
    );
}

export default CriarNoticias;