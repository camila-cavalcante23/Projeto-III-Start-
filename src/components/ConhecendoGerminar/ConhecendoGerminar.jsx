import React from 'react';
import './ConhecendoGerminar.css';
import ImagemLetraP from '../../assets/folhaazulG.png'; 
import ImagemConteudo from '../../assets/foto1Start.png'; 

const ConhecendoGerminar = () => {
  return (
   <section className="conhecendo-section">
  {/* O container agora envolve TUDO, inclusive o título */}
  <div className="conhecendo-content"> 
    <h2 className="conhecendo-title">Conhecendo o Germinar</h2>

        <p className="intro-paragraph">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
          piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia, discovered the
          undoubtable source.
        </p>

        {/* Primeira seção com imagem (Letra P) e texto */}
        <div className="content-row">
          <img src={ImagemLetraP} alt="Letra P estilizada" className="drop-cap-image" />
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
            through the cites of the word in classical literature, discovered the undoubtable source.
          </p>
        </div>

        {/* Segunda seção com texto e imagem (quadrada) */}
        <div className="content-row">
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
            through the cites of the word in classical literature, discovered the undoubtable source.
          </p>
          <img src={ImagemConteudo} alt="Conteúdo Germinar" className="content-image" />
        </div>

      </div>
    </section>
  );
};

export default ConhecendoGerminar;