import React, { useState } from "react";
import "./GaleriaForm.css";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Button from "../../components/Button/Button";
import { IoImagesOutline } from "react-icons/io5";

const GaleriaForm = () => {
    const [titulo, setTitulo] = useState("");
    const [imagem, setImagem] = useState(null);

    const enviarImagem = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("imagem", imagem);

        try {
            const resposta = await fetch("http://localhost:5000/api/galeria", {
                method: "POST",
                body: formData,
            });

            if (resposta.ok) {
                alert("Imagem adicionada com sucesso!");
                setTitulo("");
                setImagem(null);
            } else {
                alert("Erro ao adicionar imagem");
            }
        } catch (error) {
            console.error("Erro ao enviar imagem", error);
            alert("Erro ao adicionar imagem");
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
