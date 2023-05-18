import './estilos.css'
import React, { Fragment } from 'react';

const PerfumeCarrinho = (props) => {
   const setPerfumes = props.setter
   const removerPerfumeCarrinho = (evento) => {
      fetch(`/api/carrinho/${props.id}/`, {
         method: 'DELETE'
      })
         .then(response => {
            if (response.ok) {
            window.alert("Produto removido com sucesso")
            } else {
            window.alert('Erro ao remover o produto')
            }
         })
      fetch('/api/carrinho/')
         .then(response => response.json())
         .then(data => {
            setPerfumes(data)
         })
   }
   return (
      <Fragment>
         <div className='perfume-carrinho'>
            <img src={props.imagem} className='imagem-perfume-carrinho'/>
            <div className='detalhes-perfume-carrinho'>
               <h3>{props.nome}</h3>
               <p>Preco: {props.preco}</p>
               <p>Quantidade: {props.quantidade}</p>
            </div>
            <div className='adicionais-perfume-carrinho'>
               <button className='botao-remover-carrinho' onClick={props.removerPerfume}><i className='fas fa-trash'></i></button>
            </div>
         </div>
      </Fragment>
   )
}

export default PerfumeCarrinho