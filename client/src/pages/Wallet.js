import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Wallet() {
  return (
    <>
      <div>
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
                        <p className="fs-5 fw-bold mb-0">2</p>
                      </div>
                      <div className="col text-end text-truncate">
                        {/* Label */}
                        <p className="fs-6 text-muted text-uppercase mb-0">
                          Listed Nfts
                        </p>
                        {/* Comment */}
                        <p className="fs-5 fw-bold mb-0">2</p>
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
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-3 d-flex">
                {/* Card */}
                <div className="card border-0 flex-fill w-100">
                  <div className="card-header border-0 border-0 card-header-space-between">
                    {/* Title */}
                    <h2 className="card-header-title h4 text-uppercase">
                      Payments
                    </h2>
                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical button group"
                    >
                      <button type="button" className="btn btn-dark">
                        Deposit
                      </button>
                      <button type="button" className="btn btn-dark">
                        Withdraw
                      </button>
                      <button type="button" className="btn btn-dark">
                        Stake
                      </button>
                      <button type="button" className="btn btn-dark">
                        Button
                      </button>
                      <button type="button" className="btn btn-dark">
                        Button
                      </button>
                      <button type="button" className="btn btn-dark">
                        Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-9 d-flex">
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
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mx-1"
                      data-bs-toggle="modal"
                      data-bs-target="#"
                    >
                      Refresh
                    </button>
                  </div>
                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table table-sm table-borderless align-middle mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Name your device</th>
                          <th className="text-end">Amount Mined $Cowry</th>
                          <th className="text-end">Configure</th>
                          <th className="text-end">Performance</th>
                          <th className="text-end">Last check</th>
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
                            <div className="fw-bold">1,200</div>
                          </td>
                          <td className="text-end">
                            <div className="btn-group">
                              <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButtonPrimary"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Delete
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButtonPrimary"
                              >
                                <a
                                  className="dropdown-item"
                                  href="javascript: void(0);"
                                >
                                  Disable
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="javascript: void(0);"
                                >
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="status" data-sales={81}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress d-flex flex-grow-1">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "80%" }}
                                  aria-valuenow={81}
                                  aria-valuemin={0}
                                  aria-valuemax={80}
                                />
                              </div>
                              <span className="ms-3 text-muted">Good</span>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="fw-bold">11:50am</div>
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
                            <div className="fw-bold">1,000</div>
                          </td>
                          <td className="text-end">
                            <div className="btn-group">
                              <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButtonPrimary"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Activate
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButtonPrimary"
                              >
                                <a
                                  className="dropdown-item"
                                  href="javascript: void(0);"
                                >
                                  Enable
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="javascript: void(0);"
                                >
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="status" data-sales={81}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress d-flex flex-grow-1">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "15%" }}
                                  aria-valuenow={81}
                                  aria-valuemin={0}
                                  aria-valuemax={15}
                                />
                              </div>
                              <span className="ms-3 text-muted">Poor</span>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="fw-bold">11:50am</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* / .table-responsive */}
                </div>
              </div>
            </div>
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
                      Transaction History
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
                              data-sort="Transaction"
                            >
                              {" "}
                              Transaction{" "}
                            </a>
                          </th>
                          <th className="text-end">
                            <a
                              href="javascript: void(0);"
                              className="text-muted list-sort"
                              data-sort="amount"
                            >
                              {" "}
                              Amount $Cowry{" "}
                            </a>
                          </th>
                          <th className="text-end">
                            <a
                              href="javascript: void(0);"
                              className="text-muted list-sort"
                              data-sort="Time"
                            >
                              Time
                            </a>
                          </th>
                          <th className="text-end pe-7 min-w-200px">
                            <a
                              href="javascript: void(0);"
                              className="text-muted list-sort"
                              data-sort="status"
                            >
                              Status
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list">
                        <tr>
                          <td className="name fw-bold">Account Setup</td>
                          <td className="amount text-end">$0</td>
                          <td className="Time text-end">10:30am</td>
                          <td className="status" data-sales={81}>
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
                              <span className="ms-3 text-muted">Success</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Airdrop Claim</td>
                          <td className="amount text-end">$128</td>
                          <td className="Time text-end">11:30am</td>
                          <td className="status" data-sales={81}>
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
                              <span className="ms-3 text-muted">Success</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Deposit</td>
                          <td className="amount text-end">$50,000</td>
                          <td className="Time text-end">12:30pm</td>
                          <td className="status" data-sales={81}>
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
                              <span className="ms-3 text-muted">Success</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Staking</td>
                          <td className="amount text-end">$50,000</td>
                          <td className="Time text-end">12:30pm</td>
                          <td className="status" data-sales={81}>
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
                              <span className="ms-3 text-muted">Success</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="name fw-bold">Nft Claim</td>
                          <td className="amount text-end">$500</td>
                          <td className="Time text-end">11:30am</td>
                          <td className="status" data-sales={81}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="progress d-flex flex-grow-1">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "15%" }}
                                  aria-valuenow={81}
                                  aria-valuemin={0}
                                  aria-valuemax={15}
                                />
                              </div>
                              <span className="ms-3 text-muted">Failed</span>
                            </div>
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

export default Wallet;
