import logo from "../logo.svg";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Proposals from "../pages/Proposals";
import ProposalPage from "../pages/ProposalPage";
import CreateProposal from "../pages/CreateProposal";
import { AppContext } from "../contexts/AppContext";
import MintTokenPage from "../pages/MintTokenPage";


function App() {

  const [ showModal, setShowModal ] = useState(false);

  return (
    <div className="App">
      <AppContext.Provider value={{ showModal, setShowModal }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/proposal_page" element={<ProposalPage />} />
            <Route path="/create_proposal" element={<CreateProposal />} />
            <Route path="/mint_token" element={<MintTokenPage />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
