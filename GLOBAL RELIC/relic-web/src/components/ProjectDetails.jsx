import Identicon from "react-identicons";
import { useNavigate } from "react-router-dom";

import { truncateWalletAddress, daysRemaining } from "../utils";
import { useGlobalState, setGlobalState } from "../store";
import { payoutProject } from "../web3/Relic";



const ProjectDetails = ({ project }) => {
  const navigate = useNavigate();
  const [connectedWalletAddress] = useGlobalState("connectedWalletAddress");

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
        <img
          className="rounded-xl h-64 object-cover sm:w-1/3 w-full"
          src={project.imageURL}
          alt={project.title}
        />
        <div className="flex-1 sm:py-0 py-4">
          <div className="flex flex-col justify-start flex-wrap">
            <h5 className="text-gray-900 text-sm font-medium mb-2">
              {project.title}
            </h5>
            <small className="text-gray-500">
              {new Date().getTime() > Number(project.expiresAt + "000")
                ? "Expired"
                : daysRemaining(project.expiresAt)}{" "}
              left
            </small>
          </div>
          <div className="flex justify-start items-center space-x-2 mb-3">
            <Identicon
              className="rounded-full shadow-md"
              string={project.owner}
              size={15}
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start items-center space-x-2">
                <small className="text-gray-700">
                  {truncateWalletAddress(project.owner, 4, 4, 11)}
                </small>
                <small className="text-gray-500 font-bold">
                  {project.backers} Backing{project.backer === 1 ? "" : "s"}
                </small>
              </div>

              <div>
                {project.status === 0 ? (
                  <small className="text-gray-500 font-bold">Open</small>
                ) : null}
                {project.status === 1 ? (
                  <small className="text-green-500 font-bold">Accepted</small>
                ) : null}
                {project.status === 2 ? (
                  <small className="text-gray-500 font-bold">Reverted</small>
                ) : null}
                {project.status === 3 ? (
                  <small className="text-red-500 font-bold">Deleted</small>
                ) : null}
                {project.status === 4 ? (
                  <small className="text-orange-500 font-bold">Paid</small>
                ) : null}
              </div>
            </div>
          </div>
          <p className="text-sm font-light">{project.description}</p>
          <div className="w-full bg-gray-300 rounded-full mt-4">
            <div
              className="bg-green-600 text-xs font-medium
                text-green-100 text-center p-0.5 leading-none
                rounded-l-full h-1 overflow-hidden max-w-full"
              style={{ width: `${(project.raised / project.cost) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center font-bold mt-2">
            <small className="text-green-700">
              {project.raised} Celo Raised
            </small>
            <small className="flex justify-start items-center">
              <span className="text-gray-700">{project.cost} Celo</span>
            </small>
          </div>

          <div className="flex justify-start flex-wrap items-center space-x-2 font-bold mt-4 w-full">
            {project.status === 0 ? (
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs 
                  leading-tight uppercase rounded-full shadow-md hover:bg-green-700 hover:shadow-lg
                  focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => setGlobalState('backModal', 'scale-100')}
              >
                Back This Project
              </button>
            ) : null}

            {connectedWalletAddress.toLowerCase() == project.owner.toLowerCase() ? (
              project.status !== 3 ? (
                project.status === 1 ? (
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs 
                    leading-tight uppercase rounded-full shadow-md hover:bg-orange-700 hover:shadow-lg
                    focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => payoutProject(project.id)}
                  >
                    Payout
                  </button>
                ) : project.status !== 4 ? (
                  <>
                    <button
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs 
                    leading-tight uppercase rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg
                    focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => setGlobalState('updateModal', 'scale-100')}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs 
                    leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg
                    focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => setGlobalState('deleteModal', 'scale-100')}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs 
                  leading-tight uppercase rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg
                  focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    project Closed
                  </button>
                )
              ) : null
            ) : null}
            
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
