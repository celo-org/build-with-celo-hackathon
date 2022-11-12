import Identicon from "react-identicons";
import { Link } from "react-router-dom";
import { truncateWalletAddress, daysRemaining } from "../utils";

const ProjectCard = ({ project }) => (
    <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4">
      <Link
        to={`/projects/${project.id}`}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        <img
          className="rounded-xl h-64 w-full object-cover"
          src={project.imageURL}
          alt={project.title}
        />

        <div className="p-4">
          <div className="flex justify-between items-center">
            <h5 className="text-gray-900 text-sm font-medium mb-2">
              {project.title}
            </h5>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-start items-center space-x-2">
            <Identicon
              className="rounded-full shadow-md"
              string={project.owner}
              size={32}
            />
            <small className="text-gray-700">
              {truncateWalletAddress(project.owner, 4, 4, 11)}
            </small>
          </div>

          <small className="text-gray-500">
            <span className="text-gray-900 text-sm font-medium">
              {new Date().getTime() > Number(project.expiresAt + "000")
                ? "Expired"
                : daysRemaining(project.expiresAt)}{" "}
              left
            </span>
          </small>
        </div>

        <div className="w-full bg-gray-300 rounded-full">
          <div
            className="bg-red-500 rounded-fullbg-red-600 text-xs font-medium text-red-300 text-center
              p-0.5 leading-none rounded-l-full h-1"
            style={{ width: `${(project.raised / project.cost) * 100}%` }}
          ></div>
        </div>

        <div>
          <small className="text-red-700"> {project.raised} Celo raised</small>
          <small className="flex justify-start items-center">
            <span>Target {project.cost} Celo</span>
          </small>
        </div>

        <div className="flex justify-between items-center flex-wrap mt-4 mb-2">
          <small className="text-gray-500 font-bold">
            {project.backers} Backing{project.backer === 1 ? '' : 's'}
          </small>
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
      </Link>
    </div>
);

export default ProjectCard;
