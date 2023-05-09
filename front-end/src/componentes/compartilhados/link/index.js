import { Fragment } from 'react'
import './estilos.css'

const Link = (props) => {
   let classes = `link link-${props.cor} link-${props.estilo}`
   return (
      <Fragment>
         <a className={classes} href={props.link}>{props.texto}</a>
      </Fragment>
   )
}

export default Link