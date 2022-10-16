import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Proposals from './pages/Proposals';
import ProposalPage from './pages/ProposalPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposal_page" element={<ProposalPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
