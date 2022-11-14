import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Home() {
  return (
    <>
      <div>
        {/* THEME CONFIGURATION */}
        {/* NAVIGATION */}
        <Nav />

        {/* MAIN CONTENT */}
        <main>
          {/* HEADER */}
          <Header />
          
          <div className="container-fluid">
            <div
              id="DeviceModalCenter"
              className="modal modal-lg fade"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalCenterTitle">
                      Add your new device
                    </h3>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="card border-0 py-6 px-md-6">
                      <div className="card-body">
                        <h2 className="text-center mb-0">Device setup</h2>
                        <p className="text-secondary text-center">
                          General information about your device
                        </p>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-md">
                              <label
                                htmlFor="projectName"
                                className="form-label"
                              >
                                Name your device
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="projectName"
                                placeholder="Your project name"
                                required
                              />
                              <div className="invalid-feedback">
                                Please add a name for your device
                              </div>
                            </div>
                            <div className="col-md">
                              <label htmlFor="owner" className="form-label">
                                Owner Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="owner"
                                placeholder="Owner's name"
                                required
                              />
                              <div className="invalid-feedback">
                                Please add a name
                              </div>
                            </div>
                          </div>
                          {/* / .row */}
                        </div>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-md">
                              <label
                                htmlFor="projectName"
                                className="form-label"
                              >
                                Owner's Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="projectName"
                                placeholder="Your address"
                                required
                              />
                              <div className="invalid-feedback">
                                Please add your address
                                <address />
                              </div>
                            </div>
                            <div className="col-md">
                              <label htmlFor="country" className="form-label">
                                Device type
                              </label>
                              <select
                                className="form-select"
                                id="country"
                                required
                                autoComplete="off"
                                data-select='{"placeholder": "Choose..."}'
                                data-option-template='<span class="d-flex align-items-center py-2"><span class="avatar avatar-circle avatar-xxs"><img class="avatar-img shadow-sm" src="assets/images/flags/1x1/%5b%5bvalue%5d%5d.html" /></span><span class="text-truncate ms-2">[[text]]</span></span>'
                                data-item-template='<span class="d-flex align-items-center"><span class="avatar avatar-circle avatar-xxs"><img class="avatar-img shadow-sm" src="assets/images/flags/1x1/%5b%5bvalue%5d%5d.html" /></span><span class="text-truncate ms-2">[[text]]</span></span>'
                              >
                                <option value label="Device type" />
                                <option value="af">Biogas System</option>
                                <option value="as">Solar System</option>
                                <option value="ad">Hydro System</option>
                                <option value="ao">Wind System</option>
                              </select>
                              <div className="invalid-feedback">
                                Please select a device type
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="row">
                            <div className="col-md">
                              <label htmlFor="owner" className="form-label">
                                Meter No
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="owner"
                                placeholder="Meter no"
                                required
                              />
                              <div className="invalid-feedback">
                                Please add Meter no
                              </div>
                            </div>
                            <div className="col-md">
                              <label htmlFor="owner" className="form-label">
                                Referral Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="owner"
                                placeholder="Referral Code"
                                required
                              />
                              <div className="invalid-feedback">
                                Please add Referral Code
                              </div>
                            </div>
                          </div>
                          {/* / .row */}
                        </div>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="private"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="private"
                            >
                              This is for my business
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <a href="home.html" className="btn btn-primary">
                      Yes, Proceed
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Title */}
            <h1 className="h2">Welcome Home</h1>
            <div className="row">
              <div className="col-lg-6 col-xxl-3 d-flex">
                {/* Card */}
                <div className="card border-0 flex-fill w-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        {/* Title */}
                        <h5 className="text-uppercase text-muted fw-semibold mb-2">
                          Your Earnings in $Cowry
                        </h5>
                        {/* Subtitle */}
                        <h2 className="mb-0">2,328</h2>
                      </div>
                    </div>
                    {/* / .row */}
                  </div>
                  <div className="card-footer">
                    <div className="row justify-content-between">
                      <div className="col-auto">
                        {/* Label */}
                        <p className="fs-6 text-muted text-uppercase mb-0">
                          Active devices
                        </p>
                        {/* Comment */}
                        <p className="fs-5 fw-bold mb-0">1</p>
                      </div>
                      <div className="col text-end text-truncate">
                        {/* Label */}
                        <p className="fs-6 text-muted text-uppercase mb-0">
                          Mining Duration
                        </p>
                        {/* Comment */}
                        <p className="fs-5 fw-bold mb-0">4 days</p>
                      </div>
                    </div>
                    {/* / .row */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xxl-3 d-flex">
                {/* Card */}
                <div className="card border-0 flex-fill w-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        {/* Title */}
                        <h5 className="text-uppercase text-muted fw-semibold mb-2">
                          Your Stake in $Cowry
                        </h5>
                        {/* Subtitle */}
                        <h2 className="mb-0">50,000</h2>
                      </div>
                      <div className="col-auto">
                        {/* Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          height={30}
                          width={30}
                          className="text-primary"
                        >
                          <defs>
                            <style
                              dangerouslySetInnerHTML={{
                                __html:
                                  "\n                          .a {\n                            fill: none;\n                            stroke: currentColor;\n                            stroke-linecap: round;\n                            stroke-linejoin: round;\n                            stroke-width: 1.5px;\n                          }\n                        ",
                              }}
                            />
                          </defs>
                          <title>monitor-graph-line</title>
                          <polygon
                            className="a"
                            points="15 23.253 9 23.253 9.75 18.753 14.25 18.753 15 23.253"
                          />
                          <line
                            className="a"
                            x1="6.75"
                            y1="23.253"
                            x2="17.25"
                            y2="23.253"
                          />
                          <rect
                            className="a"
                            x="0.75"
                            y="0.753"
                            width="22.5"
                            height={18}
                            rx={3}
                            ry={3}
                          />
                          <path
                            className="a"
                            d="M18.75,5.253H16.717a1.342,1.342,0,0,0-.5,2.588l2.064.825a1.342,1.342,0,0,1-.5,2.587H15.75"
                          />
                          <line
                            className="a"
                            x1="17.25"
                            y1="5.253"
                            x2="17.25"
                            y2="4.503"
                          />
                          <line
                            className="a"
                            x1="17.25"
                            y1="12.003"
                            x2="17.25"
                            y2="11.253"
                          />
                          <path
                            className="a"
                            d="M.75,11.253,4.72,7.284a.749.749,0,0,1,1.06,0L7.72,9.223a.749.749,0,0,0,1.06,0l3.97-3.97"
                          />
                          <line
                            className="a"
                            x1="0.75"
                            y1="15.753"
                            x2="23.25"
                            y2="15.753"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* / .row */}
                  </div>
                  <div className="card-footer">
                    <div className="row justify-content-between">
                      <div className="col-auto">
                        {/* Label */}
                        <p className="fs-6 text-muted text-uppercase mb-0">
                          APY
                        </p>
                        {/* Comment */}
                        <p className="fs-5 fw-bold mb-0">15%</p>
                      </div>
                      <div className="col text-end text-truncate">
                        {/* Label */}
                        <p className="fs-6 text-muted text-uppercase mb-0">
                          Staking Duration
                        </p>
                        {/* Comment */}
                        <p className="fs-5 fw-bold mb-0">60 days</p>
                      </div>
                    </div>
                    {/* / .row */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xxl-3 d-flex">
                {/* Card */}
                <div className="card border-0 flex-fill w-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        {/* Title */}
                        <h5 className="text-uppercase text-muted fw-semibold mb-2">
                          Available Culture Nfts
                        </h5>
                        {/* Subtitle */}
                        <h2 className="mb-0">4</h2>
                      </div>
                    </div>
                    {/* / .row */}
                  </div>
                  <div className="card-footer">
                    <div className="row justify-content-between">
                      <div className="col-auto">
                        {/* Label */}
                        <p className="fs-6 text-muted text-uppercase mb-0">
                          Minted Nfts
                        </p>
                        {/* Comment */}
                        <p className="fs-5 fw-bold mb-0">3</p>
                      </div>
                      <div className="col text-end text-truncate">
                        {/* Label */}
                        <p className="fs-6 text-muted text-uppercase mb-0">
                          Listed Nfts
                        </p>
                        {/* Comment */}
                        <p className="fs-5 fw-bold mb-0">1</p>
                      </div>
                    </div>
                    {/* / .row */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xxl-3 d-flex">
                {/* Card */}
                <div className="card border-0 bg-primary text-white flex-fill w-100">
                  <div className="card-body">
                    {/* Title */}
                    <h4 className="text-uppercase fw-semibold mb-2">
                      Total Assets Worth
                    </h4>
                    {/* Subtitle */}
                    <h2 className="mb-0">75,800</h2>
                    {/* Chart */}
                    <div className="chart-container h-70px">
                      <canvas id="currentBalanceChart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* / .row */}
            <div className="row">
              <div className="col-xxl-9 d-flex">
                {/* Card */}
                <div
                  className="card border-0 flex-fill w-100"
                  data-list='{"valueNames": ["name", "price", "quantity", "amount", {"name": "sales", "attr": "data-sales"}], "page": 5}'
                  id="topSellingProducts"
                >
                  <div className="card-header border-0 card-header-space-between">
                    {/* Title */}
                    <h2 className="card-header-title h4 text-uppercase">
                      Account activities
                    </h2>
                    {/* Dropdown */}
                    <div className="dropdown">
                      <a
                        href="javascript: void(0);"
                        className="dropdown-toggle no-arrow text-secondary"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          height={14}
                          width={14}
                        >
                          <g>
                            <circle
                              cx={12}
                              cy="3.25"
                              r="3.25"
                              style={{ fill: "currentColor" }}
                            />
                            <circle
                              cx={12}
                              cy={12}
                              r="3.25"
                              style={{ fill: "currentColor" }}
                            />
                            <circle
                              cx={12}
                              cy="20.75"
                              r="3.25"
                              style={{ fill: "currentColor" }}
                            />
                          </g>
                        </svg>
                      </a>
                      <div className="dropdown-menu">
                        <a href="Balance.html" className="dropdown-item">
                          {" "}
                          Check Wallet{" "}
                        </a>
                        <a href="Nfts.html" className="dropdown-item">
                          Check My Nfts
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table align-middle table-edge table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>
                            <a
                              href="javascript: void(0);"
                              className="text-muted list-sort"
                              data-sort="name"
                            >
                              {" "}
                              Name{" "}
                            </a>
                          </th>
                          <th className="text-end">
                            <a
                              href="javascript: void(0);"
                              className="text-muted list-sort"
                              data-sort="price"
                            >
                              {" "}
                              Description{" "}
                            </a>
                          </th>
                          <th className="text-end">
                            <a
                              href="javascript: void(0);"
                              className="text-muted list-sort"
                              data-sort="amount"
                            >
                              Time
                            </a>
                          </th>
                          <th className="text-end pe-7 min-w-200px">
                            <a
                              href="javascript: void(0);"
                              className="text-muted list-sort"
                              data-sort="sales"
                            >
                              Progress
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list">
                        <tr>
                          <td className="name fw-bold">Account Setup</td>
                          <td className="price text-end">
                            devices added and Kyc completed
                          </td>
                          <td className="amount text-end">10:30am</td>
                          <td className="sales" data-sales={81}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress d-flex flex-grow-1">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "100%" }}
                                  aria-valuenow={81}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <span className="ms-3 text-muted">100%</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Airdrops Claimed</td>
                          <td className="price text-end">
                            Daily $Cowry earned
                          </td>
                          <td className="amount text-end">11:10pm</td>
                          <td className="sales" data-sales={25}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress w-100">
                                <div
                                  className="progress-bar bg-dark"
                                  role="progressbar"
                                  style={{ width: "15%" }}
                                  aria-valuenow={15}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <span className="ms-3 text-muted">15%</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Nfts Listed</td>
                          <td className="price text-end">
                            Nfts listed to our marketplace
                          </td>
                          <td className="amount text-end">1:30pm</td>
                          <td className="sales" data-sales={41}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress w-100">
                                <div
                                  className="progress-bar bg-dark"
                                  role="progressbar"
                                  style={{ width: "25%" }}
                                  aria-valuenow={25}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <span className="ms-3 text-muted">25%</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Nfts Minted</td>
                          <td className="price text-end">
                            Calmed Nfts for different achievements
                          </td>
                          <td className="amount text-end">1:30pm</td>
                          <td className="sales" data-sales={62}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress w-100">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "62%" }}
                                  aria-valuenow={62}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <span className="ms-3 text-muted">62%</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Stake Locked</td>
                          <td className="price text-end">50,000 $Cowry</td>
                          <td className="amount text-end">9:00am</td>
                          <td className="sales" data-sales={36}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress w-100">
                                <div
                                  className="progress-bar bg-dark"
                                  role="progressbar"
                                  style={{ width: "5%" }}
                                  aria-valuenow={5}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <span className="ms-3 text-muted">5%</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* / .table-responsive */}
                </div>
              </div>
              <div className="col-xxl-3 d-flex">
                {/* Card */}
                <div className="card border-0 flex-fill w-100">
                  <div className="card-header border-0 border-0 card-header-space-between">
                    {/* Title */}
                    <h2 className="card-header-title h4 text-uppercase">
                      Connected Devices
                    </h2>
                    {/* Link */}
                    {/* <a href="#DeviceModalCenter" class="small fw-bold">  </a> */}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#DeviceModalCenter"
                    >
                      Add New Device
                    </button>
                  </div>
                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table table-sm table-borderless align-middle mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Name your device</th>
                          <th className="text-end">Amount Mined</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <span className="fw-bold d-block">
                                  Solar at Work
                                </span>
                                <span className="fs-6 text-muted">active</span>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="fw-bold">1,200 $Cowry</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <span className="fw-bold d-block">
                                  Solar at home
                                </span>
                                <span className="fs-6 text-muted">
                                  inactive
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="fw-bold">1,000 $Cowry</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* / .table-responsive */}
                </div>
              </div>
            </div>
            {/* / .row */}
          </div>
          {/* / .container-fluid */}
          {/* Footer*/}
          {/* Footer */}
          <footer className="mt-auto">
            <div className="container-fluid mt-4 mb-6 text-muted">
              <div className="row justify-content-between">
                <div className="col">© Culture. 2022 Team Wonder</div>
                <div className="col-auto">v1.0.0</div>
              </div>
              {/* / .row */}
            </div>
          </footer>
        </main>
        {/* / main */}
      </div>
    </>
  );
}

export default Home;
