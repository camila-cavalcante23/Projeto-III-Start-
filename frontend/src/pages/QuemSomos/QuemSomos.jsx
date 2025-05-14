import React from 'react'
import './QuemSomos.css'
import Img from '../../assets/foto1Start.png'

const QuemSomos = () => {

  
  return (
    <section className='about' id='about-id'>
      <h1 className='about-us'>Quem Somos</h1>
      <div className='about-content'>
        <img src={Img} alt="" className='img'/>
        
        <div className='text-about-1'>
          <p>O Sparc (Ecossistema Parque tecnológico Crateús) é um
          ecossistema criado em maio de 2019, o núcleo tem
          realizado e participado, entre outras ações, de eventos
          nas áreas de tecnologia, informação e inovação, sempre
          com foco em ações empreendedoras dos estudantes.
          </p><br />

          <p>O SParC é vinculado à diretoria do Campus de Crateús. 
          Além de disseminar o conhecimento desenvolvido no
          campus e contribuir para a transformação
          socioeconômica da região do sertão de Crateús, o núcleo
          busca proporcionar aos alunos um ambiente que
          potencialize o estabelecimento de novos contatos
          profissionais e a busca de soluções na sociedade.</p><br />
        </div>
      </div>
      <div className='text-about-1'>
        <p>O SParC está em permanente articulação com o Comitê de Inovação Tecnológica (COMIT), com a 
            Coordenadoria de Inovação Tecnológica (CIT) da UFC e com o Parque Tecnológico da UFC.
          </p><br />

          <p>Atualmente, é formado por um grupo de docentes dos Cursos de Sistemas de Informação e Ciência da 
            Computação, além de técnicos do campus, que representam o núcleo da UFC. O comitê gestor é 
            composto também por outras entidades, como o Governo do Estado do Ceará; a Prefeitura de Crateús; 
            o Instituto Federal de Educação, Ciência e Tecnologia do Ceará (IFCE); e o SEBRAE. O objetivo do 
            comitê é traçar as diretrizes e políticas, bem como avaliar periodicamente o desempenho do núcleo.
          </p><br />

          <p>A comunidade pode participar do núcleo por meio dos eventos promovidos e de editais para instalação 
            de empresas e startups no Parque Tecnológico. Esses editais buscam captar empresas que possam 
            agregar valor ao campus e à região de Crateús.
          </p><br />
          <p className='supporters'>Apoiadores: </p>
          <p>Corredores Digitais</p>
          <p>Sebrae</p>
          <p>Funcap</p>
      </div>
    </section>
  )
}

export default QuemSomos
