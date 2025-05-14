import React from "react";
import "./Galeria.css";  
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Carrossel from "../../components/carrossel/Carrossel";
import img1 from "../../assets/Galeria1.jpg";
import img2 from "../../assets/Galeria2.jpg";
import img3 from "../../assets/Galeria3.jpg";
import img4 from "../../assets/Galeria4.jpg";
import img5 from "../../assets/Galeria5.jpg";
import img6 from "../../assets/Galeria6.jpg";
import img7 from "../../assets/Galeria7.jpg";
import img8 from "../../assets/Galeria8.jpg";
import img9 from "../../assets/Galeria9.jpg";
import img10 from "../../assets/Galeria10.jpg";
import img11 from "../../assets/Galeria11.jpg";
import img12 from "../../assets/Galeria12.jpg";
import img13 from "../../assets/Galeria13.jpg";
import img14 from "../../assets/Galeria14.webp";
import img15 from "../../assets/Galeria15.webp";
import img16 from "../../assets/Galeria16.webp";
import img17 from "../../assets/Galeria17.jpg";
import img18 from "../../assets/Galeria18.jpg";


const Galeria = () => {
    const imagens1 = [img1, img2, img3, img4, img5, img6];
    const imagens2 = [img7, img8, img9, img10, img11, img12];
    const imagens3 = [img13, img14, img15, img16, img17, img18];

    return (
        <div>
            <Navbar2 />
            <div className="geralparceiros">
                <h1 className="titulo-parceiros">Galeria</h1>
                <div>
                    <p className="titulo2"> </p><br />
                    <p className="conteudo1"> </p>

                    {/* Primeiro carrossel */}
                    <Carrossel imagens={imagens1} />

                    {/* Segundo carrossel */}
                    <Carrossel imagens={imagens2} />

                    {/* Terceiro carrossel */}
                    <Carrossel imagens={imagens3} />
                </div>  
            </div> 
            <Footer />   
        </div>
    );
};

export default Galeria;
