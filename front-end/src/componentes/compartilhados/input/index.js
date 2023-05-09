import { Fragment } from "react"
import './estilos.css'

const Input = (props) => {
   let divClasses = `input-div ${props.tamanho} input-div-${props.cor} input-${props.estilo}`
   let inputClasses = `input`
   const limparPlaceholder = () => {
      let input = document.querySelector('#pesquisa')
      input.placeholder = ''
   }
   const setarPlaceholder = () => {
      let input = document.querySelector('#pesquisa')
      input.placeholder = props.placeholder
   }
   return (
      <Fragment>
         <div className={divClasses}>
            <input 
            className={inputClasses} 
            type={props.tipo} 
            placeholder={props.placeholder}
            id={props.id}
            onFocus={limparPlaceholder}
            onBlur={setarPlaceholder}
            name={props.nome}
            ></input>
         </div>
      </Fragment>
   )
}

export default Input
