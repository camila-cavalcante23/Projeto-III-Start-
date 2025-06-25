import React from "react";
import "./Apoiadores.css"; 
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import sebrae from "../../assets/logo-sebrae.png"; 
import corredores from "../../assets/corredores.jpg"; 

const Apoiadores = () => {
    return (
        // Div principal 
        <div className="apoiadores-page-wrapper">
            <Navbar2 />

       
            <main className="apoiadores-container">
                <h1 className="main-title">Conheça Nossos Parceiros</h1>

   
                <article className="supporter-block">
                    <div className="supporter-info">
                        <h2>Sebrae</h2>
                        <p>
                            O SEBRAE (Serviço Brasileiro de Apoio às Micro e Pequenas Empresas) é uma 
                            instituição de apoio ao empreendedorismo no Brasil. Ele oferece consultoria, 
                            capacitação e acesso a crédito para ajudar micro e pequenas empresas a crescerem e 
                            se desenvolverem. Além disso, o SEBRAE atua fortemente na promoção da cultura empreendedora, 
                            oferecendo suporte técnico e ferramentas para startups, ajudando-as a se estruturar e atingir 
                            o mercado de forma mais eficiente.
                        </p>
                    </div>
                    <div className="supporter-logo">
                        <img src={sebrae} alt="Logo do Sebrae" />
                    </div>
                </article>

              
                <article className="supporter-block">
                    <div className="supporter-info">
                        <h2>Corredores Digitais</h2>
                        <p>
                            Pertencente à Secretaria da Ciência, Tecnologia e Educação Superior, 
                            o Programa Corredores Digitais atua em diversas áreas da inovação, especialmente no 
                            fomento, criação e desenvolvimento de novos negócios inovadores. <br /><br />
                            Hoje o Corredores Digitais atua como hub de inovação em diversas linhas de atuação. 
                            Ideação, Tração e Impacto Social, são algumas linhas de atuação do programa que busca o 
                            desenvolvimento econômico do Estado do Ceará.
                        </p>
                    </div>
                  
                    <div className="supporter-logo">
                         <img src={corredores} alt="Logo dos corredores" />

                    </div>
                </article>

            </main> 

            <Footer />
        </div>
    );
};

export default Apoiadores;