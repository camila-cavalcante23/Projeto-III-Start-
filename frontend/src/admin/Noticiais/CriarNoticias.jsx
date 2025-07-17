import React, { useState } from "react";
import api from '../../services/api';
import './CriarNoticias.css';
import StartUFC from '../../assets/StartUFC-logo.png';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

function CriarNoticias() {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagem, setImagem] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagem) {
            setMensagem('Selecione uma imagem antes de enviar.');
            return;
        }

        const reader = new FileReader();

        // Define o que acontece quando a leitura do arquivo termina
        reader.onloadend = async () => {
            const imagemBase64 = reader.result;

            // CORREÇÃO AQUI: Ajustando os nomes das propriedades para PascalCase
            // para corresponder ao DTO do C# (SaveNewsRequest)
            const payload = {
                Title: titulo,          // Mudado de 'titulo' para 'Title'
                Content: conteudo,      // Mudado de 'conteudo' para 'Content'
                ImageBase64: imagemBase64 // Mudado de 'imagemBase64' para 'ImageBase64'
            };

            try {
                const response = await api.post('/News/SaveNews', payload);

                setMensagem('Notícia enviada com sucesso!');
                setTitulo('');
                setConteudo('');
                setImagem(null);
                // Limpamos o campo de arquivo para o usuário
                document.querySelector('input[type="file"]').value = '';
            } catch (error) {
                console.error('Erro ao enviar notícia:', error);
                // Melhorando a mensagem de erro para o usuário
                setMensagem('Erro ao enviar notícia. Verifique os dados e tente novamente.');
                if (error.response && error.response.data) {
                    console.error('Detalhes do erro do backend:', error.response.data);
                    // Se o backend retornar uma mensagem de erro útil, exiba-a
                    setMensagem(error.response.data.message || 'Erro ao enviar notícia. Verifique os dados e tente novamente.');
                }
            }
        };

        // Inicia a leitura do arquivo. Quando terminar, o código acima em 'onloadend' será executado.
        reader.readAsDataURL(imagem);
    };

    return (
        <React.Fragment>
            <NavbarAdmin />
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
