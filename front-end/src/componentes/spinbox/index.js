import { Fragment } from 'react'
import './estilos.css'

const SpinBox = (props) => {
   const input = document.getElementById('spinbox')

   const validaKeyDown = (event) => {
      console.log(event)
      const keys = new Array(
         '0',
         '1',
         '2',
         '3',
         '4',
         '5',
         '6',
         '7',
         '8',
         '9',
         'Backspace',
         'Delete',
         'ArrowLeft',
         'ArrowRight'
      )
      if (!keys.includes(event.key)){
         event.preventDefault()
      }
    }

   const adicionar = () => {
      let input = document.querySelector('.input-spinbox')
      let valor = parseInt(input.value)
      valor += 1
      input.value = valor
   }

   const subtrair = () => {
      let input = document.querySelector('.input-spinbox')
      let valor = parseInt(input.value)
      if (valor >= 1) {
         valor -= 1
      }
      input.value = valor
   }

   return (
      <Fragment>
         <div className='div-spinbox'>
            <button className='botao-spinbox' onClick={subtrair} type='button'>-</button>
            <input 
            defaultValue={1}
            className='input-spinbox' 
            id='spinbox'
            name='quantidade'
            onKeyDown={validaKeyDown}/>
            <button className='botao-spinbox'onClick={adicionar} type='button'>+</button>
         </div>
      </Fragment>
   )
}

export default SpinBox