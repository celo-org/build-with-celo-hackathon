import Background from "../components/Background";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div id="background">
      <img
        src={process.env.PUBLIC_URL + "/landing-image.jpg"}
        alt=""
        className="absolute top-0 z-0 brightness-50 h-screen xl:h-[800px] object-cover w-screen "
      />
      <Navbar />
      <Background />
    </div>
  );
};

export default Home;
