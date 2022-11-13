import { useEffect, useState } from "react";

// import pages, css, images
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import { useGlobalState } from "../store";
import { getProjects } from "../web3/Relic";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [projects] = useGlobalState("projects");

  useEffect(() => {
    getProjects().then(() => setLoaded(true))
  }, []);

  return loaded ?  (
    <>
      <Hero />
      <Projects projects={projects} />
    </>
  ) : null
};

export default Home;
