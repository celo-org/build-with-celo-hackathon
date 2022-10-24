
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppHeader from './components/layout/Header'
import Home from './pages/Home'
import Event from './pages/Event'
import { CeloProvider, Alfajores, NetworkNames } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css';

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

  return (
    <Router>
      <div className="App">
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
