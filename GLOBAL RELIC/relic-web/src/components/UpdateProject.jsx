import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import { updateProject } from '../web3/Relic'

const UpdateProject = ({ project }) => {
  const [updateModal] = useGlobalState("updateModal");
  const [title, setTitle] = useState(project.title);
  const [date, setDate] = useState(project.date);
  const [description, setDescription] = useState(project.description);
  const [imageURL, setImageURL] = useState(project.imageURL);

  const toTimestamp = (strDate) => {
    const datum = Date.parse(strDate);
    return datum / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !imageURL || !description || !date) return;
    const params = {
      id: project.id,
      title,
      description,
      expiresAt: toTimestamp(date),
      imageURL,
    };

    updateProject(params).then(() => {
      closeModal();
    });
  };

  const closeModal = () => {
    setGlobalState("updateModal", "scale-0");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
            justify-center bg-black bg-opacity-50 transform
            transition-transform duration-300 ${updateModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">Edit Project</p>
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
                src={imageURL}
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
              onChange={(e) => setImageURL(e.target.value)}
              pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
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
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
