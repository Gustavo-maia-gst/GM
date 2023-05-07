import { Fragment } from "react"
import './estilos.css'

const Input = (props) => {
   let divClasses = `input-div ${props.tamanho} input-div-${props.cor}`
   return (
      <Fragment>
         <div className={divClasses}>
            <input 
            className="input" 
            type={props.tipo} 
            placeholder={props.placeholder}
            id={props.id}
            ></input>
         </div>
      </Fragment>
   )
}

export default Input
