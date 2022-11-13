import { Link } from "react-router-dom";
// import { useCelo } from "@celo/react-celo";

// pages, components,
import { useGlobalState,  setGlobalState} from "../store";
import { truncateWalletAddress } from "../utils";
import { connectWallet } from '../web3/Relic'

const Header = () => {
    const [connectedWalletAddress] = useGlobalState('connectedWalletAddress')    

  return (
    <header
      className="w-full flex flex-wrap items-center justify-between p-5 bg-white
        text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg fixed top-0 left-0 right-0"
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between">
        <div className="container-fluid">
          <Link
            to="/"
            className="flex justify-start items-center text-xl text-red-500"
          >
            <h1>Global Relic</h1>
          </Link>
        </div>
        <div className="flex space-x-2 justify-center">
          <Link to="/about">About</Link>
          {connectedWalletAddress ? (
             <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs 
                        leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg
                        focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Connected to {truncateWalletAddress(connectedWalletAddress, 4, 4, 11)}
            </button>
         ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs 
                   leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg
                   focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                   active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
