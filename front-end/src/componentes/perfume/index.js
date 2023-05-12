import './estilos.css'


const CardPerfume = (props) => {
   return (
      <a className="card-perfume" href="">
         <img src={props.imagem}
         className="imagem-perfume"/>
         <p className='genero-perfume'>{props.genero}</p>
         <p className="titulo-perfume">{props.nome}</p>
         <p className='descricao-perfume'>{props.briefing}</p>
         <p className="preco-perfume">R${props.preco}</p>
      </a>
   )
}

export default CardPerfume
