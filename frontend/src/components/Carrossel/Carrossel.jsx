import React, { useState } from "react";
import "./Carrossel.css";

const Carrossel = ({ imagens }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => {
            // Incrementa o índice de 3 em 3 e faz o loop
            return (prevIndex + 3) % imagens.length;
        });
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 3 + imagens.length) % imagens.length
        );
    };

    // Pega as 3 imagens atuais com base no índice
    const currentImages = imagens.slice(currentIndex, currentIndex + 3);

    return (
        <div className="carrossel-container">
            <button className="prev" onClick={prevImage}>←</button>
            <div className="carrossel-imagens">
                {currentImages.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Imagem ${currentIndex + index + 1}`}
                        className="carrossel-imagem"
                    />
                ))}
            </div>
            <button className="next" onClick={nextImage}>→</button>
        </div>
    );
};

export default Carrossel;
