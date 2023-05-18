import Link from '../compartilhados/link'
import Input from '../compartilhados/input'
import PerfumeCarrinho from '../perfume_carrinho'
import React, { Fragment, useState, useEffect } from 'react';
import './estilos.css'

const Navegacao = (props) => {
   const [carrinho, setCarrinho] = useState([])
   const [total, setTotal] = useState([])
   const setPerfumes = props.setter
   const inputPesquisa = document.querySelector('#pesquisa')
   let perfumes

   async function filtrarCategoria(evento) {
      let genero = evento.target.text

      await fetch('/api/perfumes/')
      .then(response => response.json())
      .then(data => {
         perfumes = data
      })

      let tempPerfumes = perfumes.filter(perfume => {
         if (perfume.genero.nome == genero) {
            return true
         }
      })
      
      setPerfumes(tempPerfumes)
   }

   async function pesquisar(evento) {
      evento.preventDefault()

      await fetch(`/api/perfumes/?nome=${inputPesquisa.value}`)
      .then(response => response.json())
      .then(data => {
         perfumes = data
         console.log(perfumes)
      })

      setPerfumes(perfumes)
   }
   
   const abrirCarrinho = () => {
      fetch('/api/carrinho')
         .then(response => response.json())
         .then(data => {
            setCarrinho(data)
         })
      fetch('/api/carrinho/total')
         .then(response => response.json())
         .then(data => {
            setTotal(data)
         })
         document.getElementById("modal").style.display = "block"
      }
   const fecharCarrinho = () => {
      document.getElementById("modal").style.display = "none"
   }

   return (
      <header>
         <div className="nav-container">
            <h1 className="titulo">GM_Perfumes</h1>
            <form className='buscando' onSubmit={pesquisar}>
               <Input placeholder='O que você está buscando...'
                      tamanho="input-l-100" 
                      id="pesquisa"
                      nome="query"
                      estilo="leve"/>
               <button><i className="fas fa-search"></i></button>
            </form>
            <nav>
               <ul>
                  <li>
                     <i className='fas fa-home'></i>
                     <Link link="http://localhost:8000" texto="Home"/>
                  </li>
                  <li>
                     <a onClick={abrirCarrinho}>
                        <i className='fas fa-shopping-cart'></i>
                        <Link texto="Carrinho"/>
                     </a>
                  </li>
                  <li>
                     <i className='fas fa-question-circle'></i>
                     <Link link="http://localhost:8000" texto="Sobre"/>
                  </li>
                  <li>
                     <i className='fas fa-user-circle'></i>
                     <Link link="http://localhost:8000" texto="Perfil"/>
                  </li>
               </ul>
            </nav>
            <nav className='nav-secundario'>
               <ul>
                  <li onClick={filtrarCategoria}><Link texto="Nacional" estilo="leve"/></li>
                  <li onClick={filtrarCategoria}><Link texto="Contratipo" estilo="leve"/></li>
                  <li onClick={filtrarCategoria}><Link texto="Importado" estilo="leve"/></li>
                  <li onClick={filtrarCategoria}><Link texto="Nicho" estilo="leve"/></li>
               </ul>
         </nav>
         </div>
         <div className='modal' id='modal'>
            <span className="fechar" onClick={fecharCarrinho}>x</span>
            <div className='modal-conteudo'>
               <h3 className='titulo-carrinho'><i className='fas fa-shopping-cart'></i> Carrinho de compras</h3>
               <div className='perfumes-carrinho'>
                  {
                     carrinho.map(perfume => {
                        return (
                              <div>
                                 <PerfumeCarrinho
                                    imagem={perfume.imagem}
                                    nome={perfume.nome}
                                    preco={perfume.preco}
                                    quantidade={perfume.quantidade}
                                    id={perfume.id}
                                    setterCarrinho={setCarrinho}/>
                              </div>
                        )
                     })
                  }
               </div>
               <h4 className='subtotal-carrinho'>Subtotal: {total}</h4>
            </div>
         </div>
      </header>
   )
}

export default Navegacao