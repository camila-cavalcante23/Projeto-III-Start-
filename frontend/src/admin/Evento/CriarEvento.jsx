import React, { useState } from "react";

import api from '../../services/api';
import './CriarEvento.css';
import StartUFC from '../../assets/StartUFC-logo.png';
import Navbar2 from "../../components/Navbar2/Navbar2";

function CriarEvento() {
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

        
        reader.onloadend = async () => {
         const imagemBase64 = reader.result; 
         
         const payload = {
           titulo,
           conteudo,
           imagemBase64
         };

         try {
         
            const response = await api.post('/api/eventos', payload);

            setMensagem('Evento cadastrado com sucesso!');
            setTitulo('');
            setConteudo('');
            setImagem(null);
            // 3. MELHORIA: Limpa o campo de arquivo para o usuário
            document.querySelector('input[type="file"]').value = '';
         } catch (error) {
            console.error('Erro ao enviar evento:', error);
            setMensagem('Erro ao enviar evento. Tente novamente.');
         }
        };
        
        // 4. CORREÇÃO: A leitura do arquivo deve ser iniciada aqui, no local correto.
        reader.readAsDataURL(imagem);
    };

    return (
        <React.Fragment>
            <Navbar2 />
            <div className="criar-evento-container">
                <div className="logo-com-bloco">
                    <img src={StartUFC} alt="Start UFC" className="logo-esquerda" />
                </div>
                <div className="bolinhas-verdes">
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                </div>
                <h2 className="titulo-pagina-evento">Criar um Evento</h2>
                <form onSubmit={handleSubmit} className="formulario-evento">
                    <label>Título do evento:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    <label>Conteúdo do evento:</label>
                    <textarea rows="8" value={conteudo} onChange={(e) => setConteudo(e.target.value)} required></textarea>
                    <label>Imagem do evento:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} required />
                    <button type="submit" className="btn-enviar">Criar Evento</button>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                </form>
            </div>
        </React.Fragment>
    );
}

export default CriarEvento;