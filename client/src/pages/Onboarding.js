import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Onboarding() {
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
            <div className="d-flex align-items-baseline justify-content-between">
              {/* Title */}
              <h1 className="h2">Welcome to Culture</h1>
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Onboarding
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9 col-xxl-7">
                <form className="needs-validation" noValidate>
                  <ul
                    className="nav nav-pills steps mb-7 mt-n3 w-75 w-xxl-50 mx-auto"
                    id="wizard-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="wizardTabOne"
                        data-bs-toggle="pill"
                        data-bs-target="#wizardStepOne"
                        type="button"
                        role="tab"
                        aria-controls="wizardStepOne"
                        aria-selected="true"
                      >
                        1
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="wizardTabTwo"
                        data-bs-toggle="pill"
                        data-bs-target="#wizardStepTwo"
                        type="button"
                        role="tab"
                        aria-controls="wizardStepTwo"
                        aria-selected="false"
                      >
                        2
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="wizardTabThree"
                        data-bs-toggle="pill"
                        data-bs-target="#wizardStepThree"
                        type="button"
                        role="tab"
                        aria-controls="wizardStepThree"
                        aria-selected="false"
                      >
                        3
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="wizardTabFour"
                        data-bs-toggle="pill"
                        data-bs-target="#wizardStepFour"
                        type="button"
                        role="tab"
                        aria-controls="wizardStepFour"
                        aria-selected="false"
                      >
                        4
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="wizard-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="wizardStepOne"
                      role="tabpanel"
                      aria-labelledby="wizardTabOne"
                    >
                      {/* Card */}
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
                        <div className="card-footer">
                          <div className="d-flex justify-content-between">
                            {/* Button */}
                            <button type="button" className="btn btn-light">
                              Cancel
                            </button>
                            {/* Button */}
                            <a
                              className="btn btn-primary"
                              data-toggle="wizard"
                              href="#wizardStepTwo"
                            >
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="wizardStepTwo"
                      role="tabpanel"
                      aria-labelledby="wizardTabTwo"
                    >
                      {/* Card */}
                      <div className="card border-0 py-6 px-md-6">
                        <div className="card-body">
                          <h2 className="text-center mb-0">
                            Verify your identity
                          </h2>
                          <p className="text-secondary text-center">
                            Let's ensure its you
                          </p>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md">
                                <label
                                  htmlFor="teamLeader"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="teamLeader"
                                  placeholder="your first name"
                                />
                                <div className="invalid-feedback">
                                  Please add your first name
                                </div>
                              </div>
                              <div className="col-md">
                                <label
                                  htmlFor="teamLeaderEmail"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="teamLeaderEmail"
                                  placeholder="your last name"
                                />
                                <div className="invalid-feedback">
                                  Please add your last name
                                </div>
                              </div>
                            </div>
                            {/* / .row */}
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md">
                                <label
                                  htmlFor="teamLeaderEmail"
                                  className="form-label"
                                >
                                  Address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="teamLeaderEmail"
                                  placeholder="your home address"
                                />
                                <div className="invalid-feedback">
                                  Please add your home address
                                </div>
                              </div>
                              <div className="col-md">
                                <label
                                  htmlFor="teamLeaderEmail"
                                  className="form-label"
                                >
                                  Phone No.
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="teamLeaderEmail"
                                  placeholder="your phone number"
                                />
                                <div className="invalid-feedback">
                                  Please add your phone number
                                </div>
                              </div>
                            </div>
                            {/* / .row */}
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md">
                                <label
                                  htmlFor="teamLeaderEmail"
                                  className="form-label"
                                >
                                  Select ID type
                                </label>
                                <select
                                  className="form-select mb-3"
                                  aria-label=".form-select-sm example"
                                >
                                  <option selected>click here to select</option>
                                  <option value="NIN">NIN</option>
                                  <option value="BVN">BVN</option>
                                  <option value="PVC">PVC</option>
                                </select>
                                <div className="invalid-feedback">
                                  Please select a valid ID type
                                </div>
                              </div>
                              <div className="col-md">
                                <label
                                  htmlFor="teamLeaderEmail"
                                  className="form-label"
                                >
                                  Enter ID No.
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="teamLeaderEmail"
                                  placeholder="Enter the ID number of your chosen ID"
                                />
                                <div className="invalid-feedback">
                                  Please add your id number
                                </div>
                              </div>
                            </div>
                            {/* / .row */}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Upload your valid ID
                            </label>
                            <div
                              className="dropzone text-center px-4 py-6"
                              data-dropzone
                            >
                              <div className="dz-message">
                                <img
                                  className="avatar avatar-xxl mb-3"
                                  src="https://d33wubrfki0l68.cloudfront.net/dab0efca2a3dfb58288f0abf1251e668b2f56229/96c61/assets/images/illustrations/upload-illustration.svg"
                                  alt="..."
                                />
                                <h5 className="mb-4">
                                  Drag and drop your file here
                                </h5>
                                <p className="mb-4">or</p>
                                {/* Button */}
                                <span className="btn btn-sm btn-gray-300">
                                  Browse files
                                </span>
                              </div>
                            </div>
                            <span className="form-text">
                              Please use an image at least 800px x 600px
                            </span>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="d-flex justify-content-between">
                            {/* Button */}
                            <a
                              className="btn btn-light"
                              data-toggle="wizard"
                              href="#wizardStepOne"
                            >
                              Previous
                            </a>
                            {/* Button */}
                            <a
                              className="btn btn-primary"
                              data-toggle="wizard"
                              href="#wizardStepThree"
                            >
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="wizardStepThree"
                      role="tabpanel"
                      aria-labelledby="wizardTabThree"
                    >
                      {/* Card */}
                      <div className="card border-0 py-6 px-md-6">
                        <div className="card-body">
                          <h2 className="text-center mb-0">Wallet Setup</h2>
                          <p className="text-secondary text-center">
                            Connect and Link your wallet
                          </p>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md">
                                <div className="card">
                                  <div className="card-body">
                                    <h6 className="card-subtitle mb-1 text-muted text-uppercase">
                                      user wallet
                                    </h6>
                                    <h2 className="card-title">
                                      Connect your crypto Wallet
                                    </h2>
                                    <p className="card-text">
                                      Connect your wallet to cash in your mined
                                      rewards
                                    </p>
                                    <div className="btn-group">
                                      <button
                                        className="btn btn-primary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButtonDefault"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Click here to connect now
                                      </button>
                                      <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButtonDefault"
                                      >
                                        <a
                                          className="dropdown-item"
                                          href="javascript: void(0);"
                                        >
                                          Kelphr
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          href="javascript: void(0);"
                                        >
                                          Trust Wallet
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          href="javascript: void(0);"
                                        >
                                          MetaMask
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          href="javascript: void(0);"
                                        >
                                          Binance
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* / .row */}
                          </div>
                          <div className="d-flex justify-content-between">
                            {/* Button */}
                            <a
                              className="btn btn-light"
                              data-toggle="wizard"
                              href="#wizardStepTwo"
                            >
                              Previous
                            </a>
                            {/* Button */}
                            <a
                              className="btn btn-primary"
                              data-toggle="wizard"
                              href="#wizardStepFour"
                            >
                              Save
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="wizardStepFour"
                      role="tabpanel"
                      aria-labelledby="wizardTabFour"
                    >
                      {/* Card */}
                      <div className="card border-0 py-6 px-md-6">
                        <div className="card-body">
                          <h2 className="text-center mb-0">
                            Congratulations you are all set
                          </h2>
                          <p className="text-secondary text-center">
                            welcome Change Maker
                          </p>
                          <div className="mb-7">
                            <div className="row">
                              <div className="col-md">
                                <div className="card">
                                  <img
                                    src="assets/images/culture/upgrade-illustration.svg"
                                    className="card-img-top w-50 mx-auto"
                                    alt="..."
                                  />
                                  <div className="card-body">
                                    <h3 className="card-title">
                                      Time to Start Earnings
                                    </h3>
                                    <p className="card-text">
                                      Thank you for installing a green energy
                                      system from our partner
                                    </p>
                                    <a
                                      href="airdrops.html"
                                      className="btn btn-primary"
                                    >
                                      Proceed to Claim your airdrop
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* / .row */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
                <div className="col">© Culture by Team Wonder.</div>
                <div className="col-auto">v0.1.0</div>
              </div>
              {/* / .row */}
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export default Onboarding;
