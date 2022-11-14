import React from "react";
import { Link, useLocation } from "react-router-dom"

const routes = {
  dashboard: ['/', '/home', '/airdrops'],
  wallet: '/wallet',
  cultureNfts: '/culture-nfts',
  customerSupport: '/customer-support'
}

function Nav() {
  const { pathname } = useLocation();

  const isActiveLink = path => {
    if (typeof path === 'object') {
      return path.includes(pathname) ? 'active' : ''
    }

    return path === pathname ? 'active' : ''
  }
  
  return (
    <nav
      id="mainNavbar"
      className="navbar navbar-vertical navbar-expand-lg scrollbar bg-dark navbar-dark"
    >
      {/* Theme configuration (navbar) */}
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand" href="index.html">
          <img
            src="assets/images/culture/culture.png"
            className="navbar-brand-img logo-light logo-large"
            alt="..."
            width={200}
            height={38}
          />
          <img
            src="assets/images/culture/culture.png"
            className="navbar-brand-img logo-dark logo-large"
            alt="..."
            width={200}
            height={38}
          />
        </a>
        {/* Navbar toggler */}
        <a
          href="javascript: void(0);"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#sidenavCollapse"
          aria-controls="sidenavCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </a>
        {/* Collapse */}
        <div className="collapse navbar-collapse" id="sidenavCollapse">
          {/* Navigation */}
          <ul className="navbar-nav mb-lg-7">
            <li className="nav-item dropdown">
              <a
                className={`nav-link ${isActiveLink(routes.dashboard)}`}
                href="#dashboardsCollapse"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="true"
                aria-controls="dashboardsCollapse"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="nav-link-icon"
                  height={18}
                  width={18}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>Dashboard</span>
              </a>
              <div className="collapse show" id="dashboardsCollapse">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/" className={`nav-link ${isActiveLink(routes.dashboard[0])}`}>
                      {" "}
                      Onboarding{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/home" className={`nav-link ${isActiveLink(routes.dashboard[1])}`}>
                      {" "}
                      Home{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/airdrops" className={`nav-link ${isActiveLink(routes.dashboard[2])}`}>
                      {" "}
                      Airdrops{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActiveLink(routes.wallet)}`} to="/wallet">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="nav-link-icon"
                  height={18}
                  width={18}
                >
                  <defs>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                      .a {\n                        fill: none;\n                        stroke: currentColor;\n                        stroke-linecap: round;\n                        stroke-linejoin: round;\n                        stroke-width: 1.5px;\n                      }\n                    ",
                      }}
                    />
                  </defs>
                  <title>common-file-double-1</title>
                  <path
                    className="a"
                    d="M17.25,23.25H3.75a1.5,1.5,0,0,1-1.5-1.5V5.25"
                  />
                  <rect
                    className="a"
                    x="5.25"
                    y="0.75"
                    width="16.5"
                    height="19.5"
                    rx={1}
                    ry={1}
                  />
                </svg>
                <span>Wallet $Cowry</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActiveLink(routes.cultureNfts)}`} to="/culture-nfts">
                <svg
                  viewBox="0 0 24 24"
                  className="nav-link-icon"
                  height={18}
                  width={18}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.25,9.75v-3a1.5,1.5,0,0,0-1.5-1.5H8.25V3.75a1.5,1.5,0,0,0-1.5-1.5H2.25a1.5,1.5,0,0,0-1.5,1.5v16.3a1.7,1.7,0,0,0,3.336.438l2.351-9.657A1.5,1.5,0,0,1,7.879,9.75H21.75A1.5,1.5,0,0,1,23.2,11.636l-2.2,9A1.5,1.5,0,0,1,19.55,21.75H2.447"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>Culture Nfts</span>
                <span className="badge text-bg-success rounded-pill ms-auto">
                  New
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActiveLink(routes.customerSupport)}`} to="/customer-support">
                <svg
                  viewBox="0 0 24 24"
                  className="nav-link-icon"
                  height={18}
                  width={18}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25,18.75a1.5,1.5,0,0,1-1.5-1.5V9.75a1.5,1.5,0,0,1,1.5-1.5h10.5a1.5,1.5,0,0,1,1.5,1.5v7.5a1.5,1.5,0,0,1-1.5,1.5h-1.5v4.5l-4.5-4.5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6.75,12.75l-3,3v-4.5H2.25a1.5,1.5,0,0,1-1.5-1.5V2.25A1.5,1.5,0,0,1,2.25.75h10.5a1.5,1.5,0,0,1,1.5,1.5v3"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>Customer Support</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End of Collapse */}
    </nav>
  );
}

export default Nav;
