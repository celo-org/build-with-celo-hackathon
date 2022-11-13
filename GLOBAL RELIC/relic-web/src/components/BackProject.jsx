import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import { contributeToProject } from '../web3/Relic'

const BackProject = ({ project }) => {
    const [amount, setAmount] = useState(0)
    const [backModal] = useGlobalState('backModal')


const handleBackProject = async (e) => {
        e.preventDefault()
        if (!amount) {
            contributeToProject(project.id, amount)
            .then(() => {
                closeModal()
                console.log("Project backed")
                setAmount('')
            })
        }
    }

    const closeModal = () => {
        setGlobalState('backModal', 'scale-0')
    }

    return (
<div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${backModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">#{project.title}</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-black" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="Project"
                className="h-full w-full object-cover cursor-pointer"
                src={project.imageURL}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (Celo)"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleBackProject}
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-green-500
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:bg-transparent hover:text-green-500
              hover:border hover:border-green-500
              focus:outline-none focus:ring mt-5"
          >
            Back Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default BackProject