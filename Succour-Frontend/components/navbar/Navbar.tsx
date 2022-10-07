import {useState} from 'react'
import styles from './navbar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/Succour.png'
import {TiUserOutline} from 'react-icons/ti'
import { navLinks } from "./data";

const navbar = () => {
  const [click, setClick] = useState(false);

  const handleClickDoings = () => setClick(!click)

     return (
      <>
      <header className={styles.navigation}>
      <div className={styles.brand_logo}>
       <Image src={logo} alt="Succour Logo" />
      </div>
      <nav className={styles.nav}>
        {navLinks.map((link, index) => {
          return (
            <ul>
              <Link href={link.path}>
                <li className={styles.nav_link} key={index}>{link.name}</li>
              </Link>
            </ul>
          );
        })}
      </nav>
    </header>   
    </>      
     )
}

export default navbar


