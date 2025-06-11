import { useState } from "react"
import './App.css'
import { Coins } from "lucide-react";

function App() {
  const [valor, setValor] = useState('')
  const [moedaDe, setMoedaDe] = useState('USD')
  const [moedaPara, setMoedaPara] = useState('BRL')
  const [resultado, setResultado] = useState<number | null>(null)

  const converter = async () => {
    const numero = parseFloat(valor)
    if (isNaN(numero)) {
      alert('Digite um número válido')
      return;
    }

    try {
      const resposta = await fetch (`https://economia.awesomeapi.com.br/last/${moedaDe}-${moedaPara}`)
      const dados = await resposta.json()

      const chave = `${moedaDe}${moedaPara}`
      const taxa = parseFloat(dados[chave]?.bid)

      if (!taxa) {
        alert('Conversão não disponível para essas moedas')
        return
      }
      const convertido = numero * taxa
      setResultado(convertido)
    } catch (erro) {
      alert('Erro ao buscar a taxa de câmbio')
      console.error(erro)
    }
  }
  
  return (
    
    <div className="container">
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        Conversor de Moedas
        <Coins size={32} color="#333" />
      </h1>
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Digite o valor"
      />
      <p className="p-select">CONVERTER DE</p>
      <select value={moedaDe} onChange={(e) => setMoedaDe(e.target.value)}>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </select>
      <p className="p-select">CONVERTER PARA</p>
      <select value={moedaPara} onChange={(e) => setMoedaPara(e.target.value)}>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </select>

      <button onClick={converter}>Converter</button>

      {resultado !== null &&(
        <p>Resultado: {resultado.toFixed(2)} {moedaPara}</p>
      )}
    </div>
  )

}

export default App;
