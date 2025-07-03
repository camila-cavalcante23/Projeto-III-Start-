import React, { useState } from "react";
import axios from 'axios';
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

        // Envio de mensagem sem ser em Base64
       // const formData = new FormData();
       // formData.append('titulo', titulo);
       // formData.append('conteudo', conteudo);
       // formData.append('imagem', imagem);

       //Enviando em Base64
       const reader = new FileReader();
       reader.onloadend = async () => {
        const imagemBase64 = reader.result; // Isso já é uma string Base64
        
        const payload = {
        titulo,
        conteudo,
        imagemBase64
       };

        try {
            const response = await axios.post('http://localhost:5000/api/noticias', payload);

            setMensagem('Notícia enviada com sucesso!');
            setTitulo('');
            setConteudo('');
            setImagem(null);
        } catch (error) {
            console.error('Erro ao enviar notícia:', error);
            setMensagem('Erro ao enviar notícia. Tente novamente.');
        }
    };
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
