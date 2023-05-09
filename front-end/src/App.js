import React, { Fragment } from 'react';
import './app.css'
import Perfume from './componentes/perfume'
import Navegacao from './componentes/navegacao'

const App = () => {
  return(
    <Fragment>
      <Navegacao/>
      <section>
        <div className='grid-perfumes'>
          <Perfume/>
          <Perfume/>
          <Perfume/>
          <Perfume/>
          <Perfume/>
          <Perfume/>
          <Perfume/>
          <Perfume/>
        </div>
      </section>
    </Fragment>
  )
}

export default App;
