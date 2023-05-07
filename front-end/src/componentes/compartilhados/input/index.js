import { Fragment } from "react"
import './estilos.css'

const Input = (props) => {
   let divClasses = `input-div input-div-${props.cor} ${props.tamanho}`
   return (
      <Fragment>
         <div className={divClasses}>
            <input 
            className="input" 
            type={props.type} 
            placeholder={props.placeholder}
            id={props.id}
            ></input>
         </div>
      </Fragment>
   )
}

export default Input
