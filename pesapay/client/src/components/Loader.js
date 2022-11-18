import React from "react"

import styles from "../styles"
import { clogo } from "../assets"

const Loader = ({ title }) => {
  return (
    <div className={styles.loader}>
      <img src={clogo} alt='celo logo' className={styles.loaderImg} />

      <p className={styles.loaderText}>{title}</p>
    </div>
  )
}

export default Loader
