import React from "react"
import styles from "../styles"
import { chevronDown } from "../assets"
const PhoneNo = ({ value, onChange, phoneprefix }) => {
  return (
    <div className={styles.amountContainer}>
      <div className='relative'>
        <label className={styles.currencyButton}>
          {"Phone No"}
          <img
            src={chevronDown}
            alt='cheveron-down'
            className={`w-4 h-4 object-contain ml-2 rotate-90`}
          />
          {phoneprefix}
        </label>
      </div>

      <input
        value={value}
        dir='rtl'
        disabled={false}
        onChange={(e) =>
          typeof onChange === "function" && onChange(e.target.value)
        }
        className={`${styles.amountInput}`}
        type='tel'
        maxLength='9'
        minLength='9'
        placeholder='Enter Phone No'
      />
    </div>
  )
}

export default PhoneNo
