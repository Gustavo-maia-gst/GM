import React, { Fragment, useState, useEffect } from 'react';
import './app.css'
import SpinBox from './componentes/spinbox'
import Header from './componentes/header'
import BotaoCarrinho from './componentes/botao_carrinho'

const App = () => {
  
  const retornarId = () => {
    let path = window.location.pathname
    if (path) {
      return path.match(/\d+/g)[0]
    }
    return null
  }

  const formatarNotas = (notasArray) => {
    let notasFormatadas
    notasArray.map((notaObjeto, index) => {
      if (index == 0) {
        notasFormatadas = `${notaObjeto.nome}`
      } 
      else if (index < notasArray.length - 1) {
        notasFormatadas += `, ${notaObjeto.nome}`
      } 
      else {
        notasFormatadas += ` e ${notaObjeto.nome};`
      }
    })
    return notasFormatadas
  }

  
  const [perfume, setPerfume] = useState([])
  const [notasSaida, setnotasSaida] = useState([])
  const [notasCorpo, setnotasCorpo] = useState([])
  const [notasBase, setnotasBase] = useState([])

  const id = retornarId()

  useEffect(() => {
    fetch(`/api/perfume/${id}/`)
      .then(response => response.json())
      .then(data => {
        setPerfume(data)
        setnotasSaida(formatarNotas(data.notas_saida))
        setnotasCorpo(formatarNotas(data.notas_corpo))
        setnotasBase(formatarNotas(data.notas_base))
      })
      .catch(erro => console.log(erro))
    }, []);

    const adicionarCarrinho = async () => {
      const quantidade = document.getElementById('spinbox').value
      await fetch('/api/carrinho/', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({id_perfume: id, quantidade: quantidade})
      })
        .then(response => {
          if (response.ok) {
            window.alert("Produto adicionado com sucesso")
          } else {
            window.alert("Erro ao adicionar o produto")
          }
        })
    }

  return(
    <Fragment>
      <Header/>
      <section>
        <table>
          <tbody>
            <tr>
              <td>
                <img src={perfume.imagem} className='imagem-venda'></img>
              </td>
              <td className='container-venda'>
                <h2 className='nome-perfume-venda'>{perfume.nome}</h2>
                <p className='preco-perfume-venda'>R${perfume.preco}</p>
                <p className='briefing-perfume-venda'>{perfume.briefing}</p>
                <div className='div-botoes-venda'>
                  <form>
                    <SpinBox/>
                    <BotaoCarrinho adicionarCarrinho={adicionarCarrinho}/>
                  </form>
                </div>
                <p className='descricao-perfume'>- {perfume.descricao}</p>
                <div>
                  <p className='notas-perfume'><b>Notas de saída: </b>{notasSaida}</p>
                  <p className='notas-perfume'><b>Notas de corpo: </b>{notasCorpo}</p>
                  <p className='notas-perfume'><b>Notas de base: </b>{notasBase}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </Fragment>
  )
}

export default App;
