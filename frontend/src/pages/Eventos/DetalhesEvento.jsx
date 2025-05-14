import React from "react";
import { Link } from "react-router-dom";
import "./DetalhesEvento.css";  
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Img from "../../assets/EditEvento.png";

const DetalhesEvento = () => {


    return ( 
        <div>
            <Navbar2/>
            <div className="geralEvento">
                <h1 className="tituloEvento">Eventos</h1>

                <div>
                    <h2 className="titulo2">Game Bora Criar!</h2><br />
                    <p className="conteudo1"> 
                        🎮✨ Você está pronto para transformar ideias em realidade? ✨🎮
                        Ei, pessoal! 🚀 O <strong>Game Bora Criar!</strong> está chegando e você não pode ficar de fora dessa! 
                        É a sua chance de soltar a criatividade, trabalhar em equipe e ainda concorrer a uma super cesta de guloseimas! 🍫🍬
                        <br/><br/>
                        👉 <strong>O que é o Game Bora Criar?</strong><br/>
                        É um jogo incrível desenvolvido pelo projeto de extensão <strong>Germinar</strong>, onde você e sua equipe vão 
                        pensar em soluções criativas para problemas reais. E o melhor: essas ideias podem virar startups! 💡💼
                    </p>
                    
                    <img src={Img} alt="Evento Game Bora Criar" className="imagemEvento"/>

                    <div>
                        <p className="conteudo2">
                            👉 <strong>Como funciona?</strong><br/>
                            - Forme seu time (ou entre em um no dia).<br/>
                            - Escolha um problema específico para resolver.<br/>
                            - Desenvolva uma solução inovadora.<br/>
                            - Apresente sua ideia para os avaliadores.<br/><br/>

                            👉 <strong>O que você ganha?</strong><br/>
                            Além de se divertir e aprender muito, a equipe com a melhor ideia leva pra casa uma <strong>cesta de guloseimas</strong> pra ninguém botar defeito! 🎁🍭<br/><br/>

                            📅 <strong>Quando?</strong> [inserir data] <br/>
                            ⏰ <strong>Horário?</strong> [inserir horário] <br/>
                            📍 <strong>Onde?</strong> [inserir local] <br/>
                            Não fique de fora! Traga seus amigos, sua criatividade e seu espírito inovador. Vamos juntos criar soluções que podem mudar o jogo! 🚀
                            <br/><br/>
                            <strong>Inscrições abertas!</strong>
                        </p>
                    </div>              

                    <Link  to ="/inscricaoevento" className="inscrevase">
                   Inscreva-se
                    </Link>

                </div>
            </div>

            <Footer />    
        </div>
    );
};

export default DetalhesEvento;  