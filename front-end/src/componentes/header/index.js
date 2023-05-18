import Link from '../compartilhados/link'
import './estilos.css'

const Navegacao = (props) => {
   return (
      <header>
         <div className="nav-container">
            <h1 className="titulo">GM_Perfumes</h1>
            <nav>
               <ul>
                  <li className='div-carrinho'>
                     <a href='http://localhost:8000'>
                        <i className='fas fa-shopping-cart'></i>
                        <Link texto="Carrinho"/>
                     </a>
                  </li>
                  <li>
                     <i className='fas fa-home'></i>
                     <Link link="http://localhost:8000" texto="Home"/>
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
         </div>
      </header>

   )
}

export default Navegacao