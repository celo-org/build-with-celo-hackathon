import React from "react";
import { Card } from "@mui/material";
import "./Pools.css";
import { Link } from "react-router-dom";

const Pools = () => {
  return (
    <>
      <Link to="/overview">
        <Card
          className="hov"
          sx={{
            my: "20px",
            maxWidth: 1150,
            height: 80,
            py: "10px",
            px: "30px",
            mx: "30px",
            mx: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="content">
            <img
              style={{ width: "40px", height: "40px" }}
              src="./assets/rwa-market-icon.png"
              alt=""
            />
            <div className="text">
              <p> Branch Series 3(1754 Factory)</p>
              <p>Emerging market customer loans</p>
            </div>
          </div>
          <div>Open</div>
          <div>8106317</div>
          <div>10.45%</div>
        </Card>
      </Link>
    </>
  );
};

export default Pools;
