import { Link } from "react-router-dom";
import { truncateAddress } from "../utils/helpers";

const Navbar = (props) => {
    

  return (
    <div className="flex justify-around items-center bg-gray-50 shadow-lg font-open py-1 absolute top-0 z-10 w-[100%] max-w-screen">
      <div>
        <img
          src={process.env.PUBLIC_URL + "/girl-logo.jpg"}
          alt=""
          className="w-[40px] h-[40px] rounded-full my-2"
          id="opacity"
        />
      </div>
      <div>
        <ul className="hidden md:flex items-center justify-around text-xl font-mono">
          <li className="mr-8">
            <Link to="/">Home</Link>
          </li>
          <li className="mr-8">
            <Link to="/proposals">Proposals</Link>
          </li>
          <li className="mx-5">
            <Link to="/community">Community</Link>
          </li>
          <li className="ml-8">
            <Link to="/create_proposal">Propose</Link>
          </li>
        </ul>
      </div>
      <div>
        {!props.user ? (
          <>
            <button type="button" className="py-2 px-4 text-white bg-black rounded-full" onClick={props.alama}>
              Connect Wallet
            </button>
          </>
        ) : (
          <>
            <button type="button" className="secondary-btn">
              {truncateAddress(props.user)}
            </button>
          </>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
