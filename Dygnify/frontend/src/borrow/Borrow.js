import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Sidebar from "../components/base/Sidebar";


const Borrow = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <section className="box">
        <aside className="right">
          <section className="hero">
            <Link to="/">
              <Button variant="outlined">Home</Button>
            </Link>
          </section>
          <Typography variant="h3" marginTop={6} sx={{ textAlign: "center" }}>
            Nothing Here
          </Typography>
        </aside>
      </section>
    </>
  );
};

export default Borrow;
