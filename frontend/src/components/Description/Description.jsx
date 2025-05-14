import React from 'react'
import './Description.css'

const Description = () => {
  return (
    <div className='description'>
      <div className='description-content'>
        <h2 className='description-1'>
          <p>Com a ideia certa,</p> 
          <p>grandes coisas </p> 
          <p>acontecem</p>
        </h2>
        <h6 className='description-2'>
          <p>
            O StartUFC é um programa de incentivo ao empreendedorismo,
            criado como um projeto de extensão em 2020 por
            Matheus Sampaio, estudante de Sistemas de Informação.
            Seu objetivo é promover a mentalidade empreendedora
            tanto dentro quanto fora da Universidade, encorajando
            os discentes a se engajarem de forma produtiva e colaborativa.
            O programa é coordenado por Arnaldo Barreto e Lilian Carneiro,
            com a subcoordenação de Frankecion Bernardino (StartUFC) e
            Luanderson da Silva (Germinar).
          </p>
        </h6>
      </div>
    </div>
  )
}

export default Description
