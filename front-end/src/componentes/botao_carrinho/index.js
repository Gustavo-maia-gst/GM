import { Fragment } from 'react'
import './estilos.css'

const BotaoCarrinho = (props) => {
   return (
      <Fragment>
         <button className='botao-carrinho' name={props.nome} type='button' onClick={props.adicionarCarrinho}>
            Adicionar ao carrinho<i className='fas fa-shopping-cart'></i>
         </button>
      </Fragment>
   )
}

export default BotaoCarrinho