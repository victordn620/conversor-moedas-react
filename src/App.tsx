import { useState } from "react"
import './App.css'

const taxas = {
  USD: { BRL: 5.0, EUR: 0.9 },
  BRL: { USD: 0.2, EUR: 0.18 },
  EUR: { USD: 1.1, BRL: 5.5 }
};

function App() {
  const [valor, setValor] = useState('')
  const [moedaDe, setMoedaDe] = useState('USD')
  const [moedaPara, setMoedaPara] = useState('BRL')
  const [resultado, setResultado] = useState<number | null>(null)

  const converter = () => {
    const numero = parseFloat(valor)
    if (isNaN(numero)) {
      alert('Digite um número válido')
      return;
    }

    const taxa = taxas[moedaDe]?.[moedaPara]
    if (!taxa) {
      alert('Conversão não disponível para essas moedas')
      return;
    }

    const convertido = numero * taxa
    setResultado(convertido);
  }
  
  return (
    <div>
      <h1>Conversor de Moedas</h1>

      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Digite o valor"
      />

      <select value={moedaDe} onChange={(e) => setMoedaDe(e.target.value)}>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </select>

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
