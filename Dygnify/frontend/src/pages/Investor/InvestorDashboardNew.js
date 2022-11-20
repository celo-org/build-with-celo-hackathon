import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PieChart } from "recharts";
import axiosHttpService from "../../services/axioscall";

import Header from "../Layout/Header";
import PoolCard from "./components/Cards/PoolCard";
import PieChartNew from "./components/PieChartNew";
import { kycOptions } from "../../services/KYC/blockpass";

const InvestorDashboardNew = () => {
  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     let result = await axiosHttpService(kycOptions("r1657293169018"));
  //     console.log(result.res.status);
  //   };
  //   fetchStatus();
  // }, []);

  return (
    <>
      <div style={{ backgroundColor: "#14171F" }}>
        <Header />
        <div className="drawer drawer-mobile">
          <input
            id="dashboard-sidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="mt-6 drawer-content text-white">
            <div className="px-5">
              <Outlet></Outlet>
            </div>
          </div>

          <div
            style={{ borderRight: "1px solid #20232A" }}
            className="drawer-side"
          >
            <label
              htmlFor="dashboard-sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 overflow-y-auto w-60  text-white">
              <li>
                <Link to="/investor-dashboardN">Overview</Link>
              </li>
              <li>
                <Link to="/investor-dashboardN/invest">Invest</Link>
              </li>
              <li>
                <Link to="/investor-dashboardN/withdraw">Withdraw</Link>
              </li>
              <li>
                <Link to="/investor-dashboardN/transaction">Transaction</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestorDashboardNew;
