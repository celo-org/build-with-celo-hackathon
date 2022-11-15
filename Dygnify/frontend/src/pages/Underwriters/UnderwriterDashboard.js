import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Header from "../Layout/Header";

const UnderwriterDashboard = () => {
  return (
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
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-60  text-white">
            <li>
              <Link to="/underwriterDashboard">Borrow request</Link>
            </li>
            <li>
              <Link to="/underwriterDashboard/approvalHistory">
                Approval history
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnderwriterDashboard;
