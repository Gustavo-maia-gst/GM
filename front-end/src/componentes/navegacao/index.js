import Link from '../compartilhados/link'
import Input from '../compartilhados/input'
import './estilos.css'

const Navegacao = (props) => {
   return (
      <header>
         <div className="nav-container">
            <h1 className="titulo">GM_Perfumes</h1>
            <form className='buscando'>
               <Input placeholder='O que você está buscando...'
                      tamanho="input-l-100" 
                      id="pesquisa"
                      nome="query"
                      estilo="leve"/>
               <button><i className="fa fa-search"></i></button>
            </form>
            <nav>
               <ul>
                  <li><Link link="" texto="Home"/></li>
                  <li><Link link="" texto="Sobre"/></li>
                  <img src='https://img.freepik.com/vetores-premium/icone-de-avatar-masculino-pessoa-desconhecida-ou-anonima-icone-de-perfil-de-avatar-padrao-usuario-de-midia-social-homem-de-negocios-silhueta-de-perfil-de-homem-isolada-no-fundo-branco-ilustracao-vetorial_735449-120.jpg?w=740' className='imagem-usuario'/>
                  <li><Link link="" texto="Perfil"/></li>
               </ul>
            </nav>
            <nav className='nav-secundario'>
               <ul>
                  <li><Link link="" texto="Masculinos" estilo="leve"/></li>
                  <li><Link link="" texto="Femininos" estilo="leve"/></li>
                  <li><Link link="" texto="Importados" estilo="leve"/></li>
                  <li><Link link="" texto="Nicho" estilo="leve"/></li>
                  <li><Link link="" texto="Nacionais" estilo="leve"/></li>
               </ul>
         </nav>
         </div>
      </header>

   )
}

export default Navegacao