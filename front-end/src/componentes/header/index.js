import Link from '../compartilhados/link'
import PerfumeCarrinho from '../perfume_carrinho'
import './estilos.css'
import React, { useState } from 'react'


const Header = (props) => {
   const [carrinho, setCarrinho] = useState([])
   const [total, setTotal] = useState([])

   const abrirCarrinho = async () => {
      document.getElementById("modal").style.display = "block"
      await fetch('/api/carrinho/')
         .then(response => response.json())
         .then(data => {
            setCarrinho(data)
         })
      await fetch('/api/carrinho/total/') 
         .then(response => response.json())
         .then(data => {
            setTotal(data)
         })
      }
   const fecharCarrinho = () => {
      document.getElementById("modal").style.display = "none"
   }

   return (
      <header>
         <div className="nav-container">
            <h1 className="titulo">GM_Perfumes</h1>
            <nav>
               <ul>
                  <li>
                     <a href=''>
                        <i className='fas fa-home'></i>
                        <Link texto="Home"/>
                     </a>
                  </li>
                  <li>
                     <a onClick={abrirCarrinho}>
                        <i className='fas fa-shopping-cart'></i>
                        <Link texto="Carrinho"/>
                     </a>
                  </li>
                  <li>
                     <a href=''>
                        <i className='fas fa-question-circle'></i>
                        <Link texto="Sobre"/>
                     </a>
                  </li>
                  <li>
                     <a href=''>
                        <i className='fas fa-user-circle'></i>
                        <Link link="http://localhost:8000" texto="Perfil"/>
                     </a>
                  </li>
               </ul>
            </nav>
         </div>
         <div className='modal' id='modal'>
            <span className="fechar" onClick={fecharCarrinho}>x</span>
            <div className='modal-conteudo'>
               <h3 className='titulo-carrinho'><i className='fas fa-shopping-cart'></i> Carrinho de compras</h3>
               <div className='perfumes-carrinho'>
                  {
                  carrinho.length > 0 ?
                     carrinho.map(perfume => (
                        <PerfumeCarrinho
                        id={perfume.id_perfume}
                        imagem={perfume.imagem}
                        nome={perfume.nome}
                        preco={perfume.preco}
                        quantidade={perfume.quantidade}
                        />
                        ))
                     : <p>O Carrinho está vazio</p>
                  }
               </div>
               <h4 className='subtotal-carrinho'>Subtotal: R${total}</h4>
            </div>
         </div>
      </header>

   )
}

export default Header