import React, { useState } from "react";
import "./GaleriaForm.css";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Button from "../../components/Button/Button";
import { IoImagesOutline } from "react-icons/io5";
// 1. MUDANÇA: Adicionamos a importação da nossa 'api'
import api from "../../services/api";

const GaleriaForm = () => {
    const [titulo, setTitulo] = useState("");
    const [imagem, setImagem] = useState(null);

    const enviarImagem = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("imagem", imagem);

        try {
            // 2. MUDANÇA: Substituímos todo o bloco 'fetch' por uma única linha com 'api.post'.
            // O nosso 'api' (que usa Axios) já sabe o endereço e como tratar o FormData.
            const resposta = await api.post("/api/galeria", formData);

            // Se a linha acima funcionou, significa que a resposta foi um sucesso (status 2xx).
            alert("Imagem adicionada com sucesso!");
            setTitulo("");
            setImagem(null);
            // Limpa o campo de arquivo para uma melhor experiência do usuário
            document.querySelector('input[type="file"]').value = '';

        } catch (error) {
            // O Axios automaticamente entra no 'catch' para respostas de erro (4xx, 5xx),
            // o que deixa nosso código mais simples.
            console.error("Erro ao enviar imagem", error);
            const mensagemErro = error.response?.data?.message || "Erro ao adicionar imagem";
            alert(mensagemErro);
        }
    };

    return (
        <div className="gallery-form">
            <Navbar2 />
            <div className="gallery-form-content">
                <h2>Adicionar Imagem à Galeria</h2>
                <form onSubmit={enviarImagem}>
                    <div className="input-title">
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            placeholder="Título da imagem"
                        />
                    </div>
                    <div className="upload-img">
                        <IoImagesOutline />
                        <label className="add-img">Imagem:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagem(e.target.files[0])}
                            required
                        />
                    </div>
                    <Button text="Adicionar Imagem" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default GaleriaForm;