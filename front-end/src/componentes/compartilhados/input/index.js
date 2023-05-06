import { Fragment } from "react"
import './estilos.css'

const Input = (props) => {
   return (
      <Fragment>
         <div className="input-div">
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
