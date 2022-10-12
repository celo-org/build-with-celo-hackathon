import { useEffect } from "react";
import Layout from "../components/Layout";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();
  useEffect(() => {
    const session = localStorage.getItem("zena-session");
    if (!session) {
      navigate("/onboarding");
    }
  }, [localStorage]);
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
