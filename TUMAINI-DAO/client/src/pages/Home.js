import Background from "../components/Background";
import Navbar from "../components/Navbar";

const Home = () => {
    return ( 
        <div  id="background">
            <Navbar />
            <img src={process.env.PUBLIC_URL + "/landing-image.jpg"} alt="" className="position bottom-22 object-fit-cover"/>
            <Background />
        </div>
     );
}
 
export default Home;