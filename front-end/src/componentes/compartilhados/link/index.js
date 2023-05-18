import { Fragment } from 'react'
import './estilos.css'

const Link = (props) => {
   let classes = `link link-${props.cor} link-${props.estilo}`
   return (
      <Fragment>
         <span className={classes} href={props.link}>{props.texto}</span>
      </Fragment>
   )
}

export default Link