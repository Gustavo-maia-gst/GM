import './estilos.css'


const CardPerfume = (props) => {
   return (
      <a className="card-perfume" href="">
         <img src="https://www.giraofertas.com.br/wp-content/uploads/2018/05/Aventus-Creed-Eau-de-Parfum-03.jpg"
         className="imagem-perfume"/>
         <p className='genero-perfume'>Nicho</p>
         <p className="titulo-perfume">Creed Aventhus</p>
         <p className='descricao-perfume'>- Clássico de Creed, Aventhus traz em sua composição notas frutadas, esfumaçadas e amadeiradas</p>
         <p className="preco-perfume">R$1231,00</p>
      </a>
   )
}

export default CardPerfume
