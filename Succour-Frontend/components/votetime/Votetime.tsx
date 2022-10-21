import React from 'react'
import styles from './votetime.module.scss'

const Votetime = () => {
  return (
    <div className={styles.votetime}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
      <div className={styles.votetime_container}>
      <button className={styles.btn}>Vote</button>
      <div className={styles.votetime_content}>
        <ul className={styles.votetime_info}>
          <li>13 Voted <span className={styles.box}></span> Yes</li>
          <li>5 Voted <span className={styles.box}></span> No</li>
          <li>40 Not Voted</li>
        </ul>
      </div>
      <div className={styles.user_btn}>
        <div className={styles.arrow_down}></div>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Votetime
