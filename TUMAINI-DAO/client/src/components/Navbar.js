const Navbar = () => {
    return ( 
        <div className="flex items-center justify-around">
            <div>
                <img src={process.env.PUBLIC_URL + "/girl-logo.jpg"} alt="" className="w-[100px] h-[100px]"/>
            </div>
            <div>
                <ul className="flex items-center justify-around">
                    <li className="ml-5">Proposals</li>
                    <li className="mx-5">Community</li>
                    <li className="mr-5">Join the DAO</li>
                </ul>
            </div>
            <div>
                <button>Connect Wallet</button>
            </div>
        </div>
     );
}
 
export default Navbar;