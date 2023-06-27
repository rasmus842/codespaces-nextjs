import { useCallback, useEffect, useState } from 'react'
import styles from '../styles/home.module.css'

const CHAR_SEQUENCE = "0123456789A BCDEFGHIJK LMNOPQRSTU VWXYZ"

const isValidCrn = crn => crn.match("[0-9]{2}[A-Z]{2}[0-9A-Za-z]{14}");


function Home() {
  const [crn, setCrn] = useState("23EE000000000000R9")
  const [checksum, setChecksum] = useState(null)
  const [correctCrn, setCorrectCrn] = useState(null)


  const submit = (e) => {
    e.preventDefault()
    console.log("Submitted crn: ", crn)
    if (isValidCrn(crn)) {
      calculateChecksum()
    } else {
      setChecksum(null)
      setCorrectCrn(null)
    }
  }

  const calculateChecksum = () => {
    console.log("Calculating checksum...")
    let sum = 0
    let mult2 = 1
    for (let i  = 0; i < CHAR_SEQUENCE.length; i++) {
      sum += CHAR_SEQUENCE.indexOf(crn.charAt(i)) * mult2
      mult2 = mult2 * 2
    }

    const result = (sum % 11) % 10
    setChecksum(result)

    const newCrn = crn.substring(0, 17) + result
    setCorrectCrn(newCrn)
  }

  return (
    <main className={styles.main}>
      <h1>CRN viimase numbri ehk "checksum" arvutamine.</h1>
      <p>
        CRNi viimane number on nii-öelda kontrollnumber, mis arvutatakse algoritmi abil vastavalt sellele
        mis esimsesed numbrid olid. Et testimine mugavam oleks siis kasuta seda rakendust et ta arvutaks sinu
        eest kontrollnumbri.
      </p>
      <hr className={styles.hr} />
      <div>
        <p>Sisesta CRN:</p>
        <form onSubmit={submit}>
          <div>
            <input type='text' 
              name="crn"
              value={crn}
              onChange={e => setCrn(e.target.value)}/>
          </div>
          <button type="submit">Arvuta kontrollnumber</button>
        </form>
      </div>
      <hr className={styles.hr} />
      <p>Sisestatud crn: {crn}</p>
      <p>Arvutatud kontrollnumber: {checksum}</p>
      <p>Õige crn: {correctCrn}</p>
      <hr className={styles.hr} />
    </main>
  )
}

export default Home
