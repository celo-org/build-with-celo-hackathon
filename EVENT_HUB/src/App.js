import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { DrawerContext, FormContext } from './contexts/AppContext'
import AppHeader from './components/layout/Header'
import Home from './pages/Home'
import Event from './pages/Event'
import { CeloProvider, Alfajores, NetworkNames } from '@celo/react-celo'
import '@celo/react-celo/lib/styles.css'
import './app.css'


const WrappedApp = () => {
  return (
    <CeloProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,
      }}
      dapp={{
        name: 'Event Hub',
        description: 'My awesome description',
        url: 'https://example.com',
      }}
    >
      <App />
    </CeloProvider>
  )
}

const App = () => {

  const [drawer, setDrawer] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)

  return (
    <DrawerContext.Provider value={{drawer, setDrawer}}>
      <FormContext.Provider value={{showEventForm, setShowEventForm}}>
        <Router>
          <div>
            <div className={`${drawer ? 'show-drawer' : ''} drawer`}>
              <div className="drawer-links">
                <h1 className={`app-name app-name-drawer`}>Event Hub</h1>
                <Link to='/'>Home</Link>
                <Link to='/event'>Event</Link>
                <Link to='/rsvps'>RSVPs</Link>
                <span className="close-btn" onClick={() => setDrawer(false)}>&#x2715;</span>
              </div>
            </div>
            <AppHeader/>
            <Event/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/event" element={<Event/>}/>
            </Routes>

          </div>
        </Router>
      </FormContext.Provider>
    </DrawerContext.Provider>
  )
}

export default WrappedApp
