import './estilos.css'
import Input from '../compartilhados/input'
import Botao from '../compartilhados/botao'
import { Fragment, useState } from 'react'

const Formulario = (props) => {
   const input = document.getElementById('inputNome')

   const [nome, setNome] = useState('')

   const adicionarPessoa = (evento) => {
      evento.preventDefault()
      console.log(input.value)
   }

   return (
      <Fragment>
         <form action='' onSubmit={adicionarPessoa}>
            <div><label htmlFor='inputNome' className="label">Digite o seu nome:</label></div>
            <div><Input tipo="text" tamanho="input-l-100" id="inputNome"/></div>
            <div className='div-botao'><Botao texto="Entrar" cor="preto"/></div>
         </form>
      </Fragment>
   )
}

export default Formulario