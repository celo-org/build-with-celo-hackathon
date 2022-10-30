import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function CultureNfts() {
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
              <h1 className="h2">Your Nfts and Badges</h1>
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Nfts
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row justify-content-center">
              <div className="col">
                <div
                  id="priceModalCenter"
                  className="modal fade"
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
                        <h3
                          className="modal-title"
                          id="exampleModalCenterTitle"
                        >
                          Set Nft Price
                        </h3>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              How much are you willing to sell
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                            <div id="emailHelp" className="form-text">
                              Don't forget to add a good price don't be greedy.
                            </div>
                          </div>
                          <div className="mb-3 form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              Stake my earnings
                            </label>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <a href="Nfts.html" className="btn btn-primary">
                          Submit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="MarketplaceModalCenter"
                  className="modal fade"
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
                        <h3
                          className="modal-title"
                          id="exampleModalCenterTitle"
                        >
                          Are you sure you want to do this ?
                        </h3>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      {/* <div class="modal-body">
                      <img src="assets/images/culture/nft.jpg" alt="" srcset="" class="rounded mx-auto d-block" style="width:50%;">
                      <p class="mx-auto">This NFT has been added to your wallet</p>
                  </div> */}
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <a href="Balance.html" className="btn btn-warning">
                          Yes, Proceed
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/nft.jpg"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Culture Nft</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModalCenter"
                        >
                          List Nft
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModalCenter"
                          disabled
                        >
                          Unlist Nft
                        </button>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Nfts Status: Minted
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/nft.jpg"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Culture Nft</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModalCenter"
                          disabled
                        >
                          List Nft
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#MarketplaceModalCenter"
                        >
                          Unlist Nft
                        </button>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Nfts Status: Listed
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/nft.jpg"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Culture Nft</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModalCenter"
                        >
                          List Nft
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModalCenter"
                          disabled
                        >
                          Unlist Nft
                        </button>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Nfts Status: Minted
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/nft.jpg"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Culture Nft</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModalCenter"
                          disabled
                        >
                          List Nft
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#MarketplaceModalCenter"
                        >
                          Unlist Nft
                        </button>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Nfts Status: Listed
                        </small>
                      </div>
                    </div>
                  </div>
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

export default CultureNfts;
