import './estilos.css'
import React, { Fragment } from 'react';

const PerfumeCarrinho = (props) => {
   const setPerfumes = props.setter
   const removerPerfume = (evento) => {
      console.log(props.id)
      fetch(`/api/carrinho/${props.id}/`, {
         method: 'DELETE'
      })
         .then(response => {
            if (response.ok) {
               window.alert("Produto removido com sucesso")
               document.getElementById('modal').style.display = 'none'
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
         <div className='perfume-carrinho' key={props.id_perfume}>
            <img src={props.imagem} className='imagem-perfume-carrinho'/>
            <div className='detalhes-perfume-carrinho'>
               <h3>{props.nome}</h3>
               <p>Preco: {props.preco}</p>
               <p>Quantidade: {props.quantidade}</p>
            </div>
            <div className='adicionais-perfume-carrinho'>
               <button className='botao-remover-carrinho' onClick={removerPerfume}><i className='fas fa-trash'></i></button>
            </div>
         </div>
      </Fragment>
   )
}

export default PerfumeCarrinho