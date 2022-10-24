import { useRef, useState, useContext } from "react"
import { registerName } from "../chain/deposit"
import { EthereumContext } from "../chain/context"
import { toast } from "react-toastify"
import "./deposit.css"

function Register() {
  const nameInput = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const { registry, provider } = useContext(EthereumContext)

  const sendTx = async (event) => {
    event.preventDefault()
    const name = nameInput.current.value
    setSubmitting(true)

    try {
      const response = await registerName(registry, provider, name)
      const hash = response.hash
      const onClick = hash
        ? () => window.open(`https://goerli.etherscan.io/tx/${hash}`)
        : undefined
      toast("Transaction sent!", { type: "info", onClick })
      nameInput.current.value = ""
    } catch (err) {
      toast(err.message || err, { type: "error" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='Container'>
      <form onSubmit={sendTx}>
        <input
          required={true}
          placeholder='Register your name here'
          ref={nameInput}
        ></input>
        <button type='submit' disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}

export default Register
