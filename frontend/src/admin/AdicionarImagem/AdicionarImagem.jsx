import React, { useState } from "react";
import api from '../../services/api'; 
import './AdicionarImagem.css'
import StartUFC from '../../assets/StartUFC-logo.png';
import Navbar2 from "../../components/Navbar2/Navbar2";

function AdicionarImagem() {
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
        
        // Define o que acontece quando a leitura do arquivo terminar
        reader.onloadend = async () => {
         const imagemBase64 = reader.result; 
         
         const payload = {
           titulo,
           conteudo, // agora a variável 'conteudo' existe
           imagemBase64
         };

         try {
            // 3. MUDANÇA PADRÃO: Usamos 'api.post' e removemos a URL base
            const response = await api.post('/api/noticias', payload);

            setMensagem('Notícia enviada com sucesso!');
            setTitulo('');
            setConteudo('');
            setImagem(null);
            // Limpa a seleção do input de arquivo
            document.querySelector('input[type="file"]').value = ''; 
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
            <div className="adicionar-imagem-container">
                <div className="logo-com-bloco">
                    <img src={StartUFC} alt="Start UFC" className="logo-esquerda" />
                </div>
                <div className="bolinhas-verdes">
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                    <span className="bolinha"></span>
                </div>
                <h2 className="titulo-pagina">Adicionar Notícia</h2>
                <form onSubmit={handleSubmit} className="formulario-imagem">
                    <label>Título da Notícia:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    
                  
                    <label>Conteúdo da Notícia:</label>
                    <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} required />

                    <label>Imagem:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} required />
                    <button type="submit" className="btn-enviar">Adicionar Notícia</button>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                </form>
            </div>
        </React.Fragment>
    );
}

export default AdicionarImagem;