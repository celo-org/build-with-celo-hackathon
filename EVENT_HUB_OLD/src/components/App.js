
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppHeader from './layout/Header'
import Home from '../pages/Home'
import Event from '../pages/Event'


import { CeloProvider } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css';

function WrappedApp() {
    return (
        <CeloProvider
            dapp={{
                name: 'My awesome dApp',
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
          {/*<Route path="/event" element={<Event />} />*/}
        </Routes>

      </div>
    </Router>
  )
}

export default WrappedApp
