
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppDrawer } from './Drawer.styles'
import Button from 'react-bootstrap/Button'
import React from "react";
import { HashLink } from 'react-router-hash-link'
import { useCelo } from '@celo/react-celo';


const Drawer = ({ appLinks }) => {
  const location = useLocation()
  const navigate = useNavigate()
   const { connect, address, disconnect } = useCelo();
  const isConnected = !!address

  const launchApp = () => {
    navigate('/app');
  };

  return (
    <AppDrawer id="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {appLinks.map((link, i) => <li key={i}>
          <HashLink smooth to={link.link}>{link.title}</HashLink>
        </li>)}
        {location.pathname !== '/app' && <Button onClick={launchApp}>
          Launch App
        </Button>}
        {address ? (
        <Button>Connected to {`${address.substring(0, 5)}...${address.slice(-5)}`}</Button>
        ) : (
              location.pathname === '/app' && <Button onClick={connect}>Connect wallet</Button> 
        )}
        {isConnected ? <Button variant='warning' onClick={disconnect}>Disconnect</Button> : null}
      </ul>
    </AppDrawer>
  )
}

export default Drawer