import {useState} from 'react'
import {profileDropdown} from './DropdownItems'
import Link from 'next/link'

const Dropdown = () => {

  const [dropdown, setDropdown] = useState(false)

  return (
     <>
    <ul className={dropdown ? "submenu clicked" : "submenu"} 
     onClick={() => setDropdown(!dropdown)}
    >
      { profileDropdown.map(item => {
          return (
            <li key={item.id}>
              <Link href={item.path}>
               <div className={item.cName} onClick={() => setDropdown(false)}
               >{item.title}</div>
              </Link>
            </li>
         )
      }) }
    </ul>
    </>
  )
}

export default Dropdown
