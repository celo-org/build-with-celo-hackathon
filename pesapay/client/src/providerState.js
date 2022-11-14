import { Context } from "./provider"
import { createProvider } from "./contextprovider"
import App from "./app"
function providerState() {
  const provider = createProvider()

  return (
    <div className='App'>
      <Context.Provider value={provider}>
        <App />
      </Context.Provider>
    </div>
  )
}

export default providerState
