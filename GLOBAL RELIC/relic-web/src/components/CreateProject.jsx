import { useState } from "react";
import { FaTimes } from "react-icons/fa";
// import BigNumber from "bignumber.js"

import { setGlobalState, useGlobalState } from '../store'
import { createProject, getProjects } from '../web3/Relic'

const CreateProject = () => {
  const [modal] = useGlobalState("modal");

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [imageURL, setImageURL] = useState('');

  const toTimestamp = async (strDate) => {
    const date = Date.parse(strDate)
    return date / 1000
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !cost || !imageURL || !description || !date) return

    // const expiresAt = toTimestamp(date)
    // const costInWei = new BigNumber(cost).shiftedBy(18)


    const project = {
      title,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    };

    console.log(project);

    createProject(project).then(() => {
      setGlobalState('modal', 'scale-0')
      console.log('Project Created!')
      resetForm()
      getProjects()
    }).catch((error) => console.log(error))
    
  };
  
  // close modal
  const closeModal = () => {
    setGlobalState("modal", 'scale-0');
    resetForm()
  };

  const resetForm = () => {
    setImageURL('')
    setTitle('')
    setDate('')
    setCost('')
    setDescription('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${modal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
          <p className="font-semibold text-black">Create Project</p>
            <button
                type="button"
                onClick={closeModal}
                className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 overflow-hidden h-20 w-20">
              <img
                alt="Campaigns"
                className="h-full w-full object-cover cursor-pointer"
                src={
                  imageURL ||
                  "https://github.com/Light-Ideas-Labs/relic-web/blob/main/public/assets/images/relic1.jpg"
                }
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
          <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="cost (Celo)"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
            text-slate-500 bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="date"
              name="date"
              placeholder="Date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="url"
              name="imageURL"
              placeholder="ImageURL"
              pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>



          <button
            type="submit"
            onClick={handleSubmit}
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-red-500
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:bg-transparent hover:text-red-500
              hover:border hover:border-red-500
              focus:outline-none focus:ring mt-5"
          >
            Submit Project
          </button>


        </form>
      </div>
    </div>
  );
};

export default CreateProject;
