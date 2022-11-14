import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Airdrops() {
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
              <h1 className="h2">Claim Available Airdrops </h1>
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Airdrops
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row justify-content-center">
              <div className="col">
                <div
                  id="exampleModalCenter"
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
                          Airdrop Claim Successful
                        </h3>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <p className="mx-auto">
                          This airdrop has been credited into your wallet
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <a href="Balance.html" className="btn btn-primary">
                          View Wallet
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="NftModalCenter"
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
                          Nft Successfully Minted
                        </h3>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <img
                          src="assets/images/culture/nft.jpg"
                          alt
                          srcSet
                          className="rounded mx-auto d-block"
                          style={{ width: "50%" }}
                        />
                        <p className="mx-auto">
                          This NFT has been added to your wallet
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <a href="Nfts.html" className="btn btn-primary">
                          View your Stash
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          Claim Airdrop
                        </button>
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
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#NftModalCenter"
                        >
                          Claim Airdrop
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                          disabled
                        >
                          Claim Airdrop
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          Claim Airdrop
                        </button>
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
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#NftModalCenter"
                          disabled
                        >
                          Claim Airdrop
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                          disabled
                        >
                          Claim Airdrop
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          Claim Airdrop
                        </button>
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
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#NftModalCenter"
                        >
                          Claim Airdrop
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          Claim Airdrop
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          Claim Airdrop
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card h-100">
                      <img
                        src="assets/images/culture/celo.png"
                        className="card-img-top"
                        alt="Culture Airdrops"
                      />
                      <div className="card-body">
                        <h5 className="card-title">$Cowry Reward</h5>
                        <p className="card-text">
                          This is an airdrop unlocked when you preform different
                          tas and achievements going green
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                          disabled
                        >
                          Claim Airdrop
                        </button>
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
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#NftModalCenter"
                        >
                          Claim Airdrop
                        </button>
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
        {/* / main */}
      </div>
    </>
  );
}

export default Airdrops;
