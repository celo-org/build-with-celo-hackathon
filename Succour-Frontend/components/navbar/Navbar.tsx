import {useState} from 'react'
import styles from './navbar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/Succour.png'
import {TiUserOutline} from 'react-icons/ti'

const navbar = () => {
  const [click, setClick] = useState(false);

  const handleClickDoings = () => setClick(!click)

     return (
      <>
      <nav className={styles.navigation}>
      <Link href="/" className={styles.brandname}>
        <Image src={logo} alt="Succour Logo" />
      </Link>
      <button className={styles.hamburger}>
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className={styles.navigation_menu}>
        <ul className={styles.nav_items}>
         <Link href="/"><li className={styles.nav_item}>DAO</li></Link>
         <Link href="/"><li className={styles.nav_item}>Projects</li></Link>
         <Link href="/"><li className={styles.nav_item}>Public Funding</li></Link>
        </ul>
      </div>

       <button className={styles.nav_button}>Join DAO</button>
       <div className={styles.nav__user_button}>
       <TiUserOutline color="white" fontSize="1.5em" className={styles.user} />
       </div> 

    </nav>
     </>             
     )
}

export default navbar


