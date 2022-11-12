import Identicon from 'react-identicons'
import Moment from 'react-moment'

import { truncateWalletAddress, daysRemaining } from "../utils";


const ProjectBackers = ({ backers }) => {
    return (
        <div className="flex justify-center flex-col items-start w-full">
      <div className="max-h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md w-full">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Backer
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Donation
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Refunded
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {backers.map((backer, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 transition duration-300 ease-in-out"
              >
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-row justify-start items-center space-x-3">
                    <Identicon
                      string={backer.owner}
                      size={25}
                      className="h-10 w-10 object-contain rounded-full mr-3"
                    />
                    <span>{truncateWalletAddress(backer.owner, 4, 4, 11)}</span>
                  </div>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <small className="flex justify-start items-center">
                    <span className="text-gray-700">
                      {backer.contribution} EHT
                    </span>
                  </small>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {backer.refunded ? (
                    <span className="text-red-700 font-bold">Yes</span>
                  ) : (
                    <span className="text-gray-700 font-bold">No</span>
                  )}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <Moment fromNow>{backer.timestamp}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectBackers