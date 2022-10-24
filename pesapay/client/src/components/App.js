import { EthereumContext } from "../chain/context"
import { createProvider } from "../chain/provider"
import { createInstance } from "../chain/vault"

import "./App.css"
import Registrations from "./transactions"
import Register from "./deposit"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const provider = createProvider()
  const registry = createInstance(provider)
  const ethereumContext = { provider, registry }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Names Registry</h1>
        <p>powered by Defender Relayer meta-transactions</p>
      </header>
      <section className='App-content'>
        <EthereumContext.Provider value={ethereumContext}>
          <Register />
          <Registrations />
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  )
}

export default App
