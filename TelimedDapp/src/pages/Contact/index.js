import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Animated } from 'react-animated-css'


const Contact = () => {
  let location = useLocation()

  useEffect(() => {
    if (window.innerWidth <= 767) {
      const openMenu = document.getElementById('open-menu')
      const hideMenu = document.getElementById('hide-menu')
      const sidebar = document.getElementById('sidebar')

      openMenu.style.display = 'block'
      hideMenu.style.display = 'none'
      sidebar.style.width = '0'
    }
  }, [location])

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div className="min-height">Contact page</div>
    </Animated>
  )
}

export default Contact