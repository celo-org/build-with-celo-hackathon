import Reacr, {useState} from 'react'
import styles from './otherproposal.module.scss'
import { data } from './data'
import Link from 'next/link'

const Otherproposal = () => {

     const [visible, setVisible] = useState(3);

     const handleMoreProjectItem = () => {
       setVisible((prevValue) => prevValue + 3);
     }

  return (
    <div className={styles.otherproposal}>
      <div className={styles.wrapper}>
          <div className={styles.container}>
               <div className={styles.header}>
                <h1 className={styles.title}>Other proposals</h1>
               </div>

                <Link href={`/ProposePage/${id}`}>
               <div className={styles.otherproposal_content}>
                            {
                    data?.slice(0, visible)?.map(({ id, time, title, address, type, problem }) => {
                       return (
                    <div className={styles.otherproposal_item} key={id}>
                    <div className={styles.otherproposal_text}>
                      <h2 className={styles.item_title}>{title}</h2>
                       <p className={styles.item_address}>{address}</p>
                      <h1 className={styles.problem_title}>{problem}</h1>
                    
                    <div className={styles.donation_duration}>
                         <span className={styles.duration_type}>{type}</span>
                         <span className={styles.time}>{time}</span>
                     </div>
                    </div>
                    </div>
                      )
                           })
                         }
               </div>
               </Link>
                <div className={styles.viewmore_center}>
                <button onClick={handleMoreProjectItem}
                className={styles.viewmore_btn}
                >
                View more
                </button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Otherproposal