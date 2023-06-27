import { useState } from 'react'
import styles from '../styles/home.module.css'

const CHAR_SEQUENCE = "0123456789A BCDEFGHIJK LMNOPQRSTU VWXYZ"

const isValidText = crn => crn.match("[0-9A-Z]{18}");

function Home() {
  const [inputNumber, setInputNumber] = useState("23EE000044449999R0")
  const [checksum, setChecksum] = useState(null)
  const [correctNumber, setCorrectNumber] = useState(null)


  const submit = (e) => {
    e.preventDefault()
    console.log("Submitted number: ", inputNumber)
    if (isValidText(inputNumber)) {
      calculateChecksum()
    } else {
      setChecksum(null)
      setCorrectNumber(null)
    }
  }

  const calculateChecksum = () => {
    console.log("Calculating checksum...")
    let sum = 0
    let mult2 = 1
    for (let i  = 0; i < CHAR_SEQUENCE.length; i++) {
      sum += CHAR_SEQUENCE.indexOf(inputNumber.charAt(i)) * mult2
      mult2 = mult2 * 2
    }

    const result = (sum % 11) % 10
    setChecksum(result)

    const newNumber = inputNumber.substring(0, 17) + result
    setCorrectNumber(newNumber)
  }

  return (
    <main className={styles.main}>
      <h1>Checksumi ehk kontrollnumbri aruvtamine ISO 6346 standari alusel.</h1>
      <p>Antud rakendus arvutab sinu eest kontrollnumbri.
      </p>
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
