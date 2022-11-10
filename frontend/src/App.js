import Home from "./pages/home";
import Campaigns from "./pages/campaigns";
import Gallery from "./pages/gallery";
import Faucet from "./pages/faucet";
import PageNotFound from "./pages/pageNotFound";
import NavBar from './components/nav';
import Footer from './components/footer';
import Register from "./pages/register";
import CreateCampaign from "./pages/createCampaign";
import Dashboard from "./pages/dashboard";
import CampaignDetails from "./pages/campaign_details";

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAccount } from 'wagmi';

const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};


function App() {
  const { address } = useAccount()
  return (

    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/campaigns" element={<Campaigns />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/faucet" element={<Faucet />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/campaign-details" element={<CampaignDetails />} />
          <Route element={<PrivateWrapper auth={{ isAuthenticated: address }} />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/create-campaign" element={<CreateCampaign />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
