import React from 'react'
import Link  from 'next/link'

const Dropdown = ({submenus, dropdown, depthLevel}) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "inner-menu" : "";
  return (
      <ul className={`dropdown-menu ${dropdownClass} ${dropdown ? "show" : ""}`}>
          {/* {submenus.map((submenu, index)=>(
              // <MenuItems items={submenu} key={index} depthLevel={depthLevel}/>
              <li key={index} items={submenu} className="menu-items">
                  <Link to="/#">{submenu.title}</Link>
              </li>
          )
          
          )} */}
          <li><a href=''>heyyy</a></li>
      </ul>
    
  )
}

export default Dropdown