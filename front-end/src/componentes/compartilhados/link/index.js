import { Fragment } from 'react'
import './estilos.css'

const Link = (props) => {
   return (
      <Fragment>
         <a className='link' href={props.link}>{props.texto}</a>
      </Fragment>
   )
}

export default Link