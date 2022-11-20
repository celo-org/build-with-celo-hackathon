// import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import "./sidebar.css";
// import SidebarLink from "./SidebarLink";
// import PoolIcon from "@mui/icons-material/Pool";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// const activeTab = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: "#2ecc72" };
//   } else {
//     return { color: "#000" };
//   }
// };

// const Sidebar = ({ history }) => {
//   return (
//     <>
//       <div className="sidebar">
//         <div className="logo">
//           <Link to="/">
//             <img src="logo.png" alt="logo" />
//           </Link>
//         </div>
//         <Link to="/pool" style={activeTab(history, "/pool")}>
//           <SidebarLink text="Pool">
//             <PoolIcon />
//           </SidebarLink>
//         </Link>
//         <Link to="/borrow" style={activeTab(history, "/borrow")}>
//           <SidebarLink text="Borrow">
//             <AccountBalanceWalletIcon />
//           </SidebarLink>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default withRouter(Sidebar);
