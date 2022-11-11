
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import AppHeader from './components/layout/Header'
import Home from './pages/Home'
import Event from './pages/Event'
import { CeloProvider, Alfajores, NetworkNames } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css'
import './app.css'

function WrappedApp() {
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
  );
}

function App() {

  // const mystyle = {
  //   background: 'yellow',
  //   height: '100vh',
  //   position: 'fixed'
  // }

  return (
    <Router>
      <div>
        <div className={`${drawer ? 'show-drawer' : ''} drawerr`}>
          <Link to='/'>Home</Link>
          <Link to='/event'>Event</Link>
          <Link to='/rsvps'>RSVPs</Link>
        </div>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
        </Routes>

      </div>
    </Router>
  )
}

export default WrappedApp
