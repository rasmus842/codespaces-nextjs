import { useState } from 'react'
import styles from '../styles/home.module.css'

const CHAR_SEQUENCE = "0123456789A BCDEFGHIJK LMNOPQRSTU VWXYZ"

const isValidText = nr => {
  return nr.length === 18 
    && nr.match("[0-9A-Z]{18}")
}

function Home() {
  const [inputNumber, setInputNumber] = useState("23EE000044449999R0")
  const [checksum, setChecksum] = useState(null)
  const [correctNumber, setCorrectNumber] = useState(null)


  const submit = (e) => {
    e.preventDefault()
    console.log("Submitted number: ", inputNumber)
    if (isValidText(inputNumber)) {
      console.log("Calculating checksum...")
      let sum = 0
      let mult2 = 1
      for (let i  = 0; i < inputNumber.length - 1; i++) {
        let index = CHAR_SEQUENCE.indexOf(inputNumber.charAt(i))
        console.log(`sum = ${sum} + ${index} * ${mult2}`)
        sum = sum + CHAR_SEQUENCE.indexOf(inputNumber.charAt(i)) * mult2
        mult2 = mult2 * 2
      }
  
      const result = (sum % 11) % 10
      setChecksum(result)
      console.log(`Sum: ${sum}, checksum digit: ${sum} % 11 % 10 = ${result}`)
  
      const newNumber = inputNumber.substring(0, 17) + result
      setCorrectNumber(newNumber)
    } else {
      setChecksum(null)
      setCorrectNumber(null)
    }
  }

  return (
    <main className={styles.main}>
      <h1>Checksumi ehk kontrollnumbri arvutamine ISO 6346 standardi alusel.</h1>
      <hr className={styles.hr} />
      <div>
        <p>Sisesta 18-märgiline number (lubatud on numbrid 0-9, suured tähed A-Z)</p>
        <form onSubmit={submit}>
          <div>
            <input type='text' 
              name="inputNumber"
              value={inputNumber}
              onChange={e => setInputNumber(e.target.value)}/>
          </div>
          <button type="submit">Arvuta kontrollnumber</button>
        </form>
      </div>
      <hr className={styles.hr} />
      <p>Sisestatud: {inputNumber}</p>
      <p>Arvutatud kontrollnumber: {checksum}</p>
      <p>Õige: {correctNumber}</p>
      <hr className={styles.hr} />
    </main>
  )
}

export default Home
