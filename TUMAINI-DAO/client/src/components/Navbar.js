import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="flex items-center justify-around absolute top-0 w-screen">
            <div>
                <img src={process.env.PUBLIC_URL + "/girl-logo.jpg"} alt="" className="w-[70px] h-[70px] rounded-full" id="opacity"/>
            </div>
            <div>
                <ul className="flex items-center justify-around text-xl font-mono">
                    <li className="mr-8"><Link to="/proposals">Proposals</Link></li>
                    <li className="mx-5"><Link to="/community">Community</Link></li>
                    <li className="ml-8"><Link to="/join">Join the DAO</Link></li>
                </ul>
            </div>
            <div>
                <button>Connect Wallet</button>
            </div>
        </div>
     );
}
 
export default Navbar;