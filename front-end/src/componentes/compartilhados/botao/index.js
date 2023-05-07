import './estilos.css'


const Botao = (props) => {
   let tamanho = props.tamanho ? props.tamanho : 'l-85'
   let cor = props.cor ? props.cor : 'azul'
   let classes = `botao ${tamanho} ${cor}`
   return (
      <button className={classes}>{props.texto}</button>
   )
}

export default Botao