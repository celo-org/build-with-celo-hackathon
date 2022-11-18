import React from "react"
import { bell } from "../assets"
import styles from "../styles"

const History = () => {
  return (
    <div className='relative'>
      <button className={styles.currencyButton}>
        <img
          src={bell}
          alt='cheveron-down'
          className={`w-5 h-5 object-contain `}
        />
      </button>
    </div>
  )
}

export default History
