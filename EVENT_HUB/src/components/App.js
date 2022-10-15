
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppHeader from './layout/Header'
import Home from '../pages/Home'
import Event from '../pages/Event'

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

export default App
