import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";

// import pages, css, images
import Home from "./pages/Home";
import Project from "./pages/Project";
import Header from "./components/Header";
import CreateProject from "./components/CreateProject";
import AddButton from "./components/Buttons/AddButton";
import { useGlobalState } from "./store";
import { isWalletConnected } from './web3/Relic'


function App() {
  const [loaded, setLoaded] = useState(false)
  const [connectedWalletAddress] = useGlobalState("connectedWalletAddress");

  useEffect(() => {
    isWalletConnected().then(() => {
      console.log('Blockchain Loaded')
      setLoaded(true)
    })
  }, [])


  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="mt-20"></div>


      <Routes>

        <Route path="/" element={<Home />} />
        {loaded ? (
         <Route path="/projects/:id" element={<Project />} />
        ) : null}

      </Routes>


      {connectedWalletAddress ? (
        <>
          <AddButton />
          <CreateProject />
        </>
      ) : null}
    </div>
  );
}

export default App;
