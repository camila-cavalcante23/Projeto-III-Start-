import React, { useState } from "react";
import axios from 'axios';
import './AdicionarImagem.css'
import StartUFC from '../../assets/StartUFC-logo.png';
import Navbar2 from "../../components/Navbar2/Navbar2";

function AdicionarImagem() {
    const [titulo, setTitulo] = useState('');
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

            setMensagem('Imagem enviada com sucesso!');
            setTitulo('');
            setConteudo('');
            setImagem(null);
        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
            setMensagem('Erro ao enviar imagem. Tente novamente.');
        }
    };
    reader.readAsDataURL(imagem);
};

return (
    <React.Fragment>
    <Navbar2 />
    <div className="adicionar-imagem-container">
        <div className="logo-com-bloco">
            <img src={StartUFC} alt="Start UFC" className="logo-esquerda" />
        </div>
            <div className="bolinhas-verdes">
                <span className="bolinha"></span>
                <span className="bolinha"></span>
                <span className="bolinha"></span>
            </div>
        <h2 className="titulo-pagina">Adicionar Imagem</h2>
        <form onSubmit={handleSubmit} className="formulario-imagem">
            <label>Titulo da Imagem:</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            <label>Imagem:</label>
            <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} required />
            <button type="submit" className="btn-enviar">Adicionar Imagem</button>
            {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>
    </div>
    </React.Fragment>
    );
}

 export default AdicionarImagem;
