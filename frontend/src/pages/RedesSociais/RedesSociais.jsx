import React from "react";
import "./RedesSociais.css";
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Img1 from '../../assets/email.svg';
import Img2 from '../../assets/linkedin.svg';
import Img3 from '../../assets/instagram.svg';
import Img4 from '../../assets/StartUFC-logo.svg';
import Img5 from '../../assets/maoC.svg';

const RedesSociais = () => {
  return (
    <div>
      <Navbar2 />
      <div className="geralRedes">
        <div className="tudoR">
          <h1 className="tituloRedes">Canais de comunicação</h1>

          <div className="imagensRedes">
            {/* Link para o e-mail */}
            <a href="mailto:frankecion@alu.ufc.br" target="_blank" rel="noopener noreferrer">
              <div className="icon-container">
                <div className="background"></div>
                <img src={Img1} alt="Email" className="email" />
              </div>
            </a>

            {/* Link para o LinkedIn */}
            <a href="https://www.linkedin.com/in/startufc-programa-de-incentivo-ao-empreendedorismo-9bbb61289/" target="_blank" rel="noopener noreferrer">
              <div className="icon-container">
                <div className="background linkedin-bg"></div>
                <img src={Img2} alt="LinkedIn" className="linkedin" />
              </div>
            </a>

            {/* Link para o Instagram */}
            <a href="https://www.instagram.com/startufc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <div className="icon-container">
                <div className="background instagram-bg"></div>
                <img src={Img3} alt="Instagram" className="instagram" />
              </div>
            </a>
          </div>

          <div className="icon-container">
            <div className="background maoC"></div>
            <img src={Img5} alt="maoC" className="maoC" />
          </div>

          <img src={Img4} alt="logo" className="Logo" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RedesSociais;