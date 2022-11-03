import Contribute from "../components/Contribute";
import Navbar from "../components/Navbar";

const Community = () => {
    return ( 
        <div className="bg-indigo-50">
            <Navbar />
            <div  className="mt-[100px]">
            <Contribute />
            </div>
        </div>
     );
}
 
export default Community;