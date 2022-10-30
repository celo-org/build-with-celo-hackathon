import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Airdrops from './pages/Airdrops';
import Wallet from './pages/Wallet';
import CultureNfts from './pages/CultureNfts';
import CustomerSupport from './pages/CustomerSupport';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/airdrops" element={<Airdrops />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/culture-nfts" element={<CultureNfts />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
