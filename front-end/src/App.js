import React, { Fragment, useState, useEffect } from 'react';
import './app.css'
import Perfume from './componentes/perfume'
import Navegacao from './componentes/navegacao'

const App = () => {
  const [perfumes, setPerfumes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/perfumes/')
      .then(response => response.json())
      .then(data => {
        setPerfumes(data)
      });
  }, []);

  return(
    <Fragment>
      <Navegacao setter={setPerfumes}/>
      <section>
        <div className='grid-perfumes'>
          {perfumes.map((perfume, index) => {
            return(
              <div key={index}>
                <Perfume
                imagem={perfume.imagem}
                genero={perfume.genero.nome}
                nome={perfume.nome}
                briefing={perfume.briefing}
                preco={perfume.preco}
                />
              </div>
            )
          })}
        </div>
      </section>
    </Fragment>
  )
}

export default App;
