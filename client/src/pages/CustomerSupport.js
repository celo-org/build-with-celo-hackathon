import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

function CustomerSupport() {
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
              <h1 className="h2">Help Center</h1>
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Pages</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Help Center
                  </li>
                </ol>
              </nav>
            </div>
            {/* Card */}
            <div className="card border-0">
              <div className="card-body py-7">
                <div className="row justify-content-center">
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 border-primary rounded-pill mb-4"
                      placeholder="Write a question or problem"
                    />
                  </div>
                </div>
                {/* / .row */}
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-xl-6 text-center mb-7">
                    <a
                      href="javascript: void(0);"
                      className="badge fs-5 text-bg-gray-300 py-2 px-3 m-2 mb-1"
                    >
                      How secure is your Payment method?
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="badge fs-5 text-bg-gray-300 py-2 px-3 m-2 mb-1"
                    >
                      How secure is my data?
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="badge fs-5 text-bg-gray-300 py-2 px-3 m-2 mb-1"
                    >
                      How can I upgrade my plan?
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="badge fs-5 text-bg-gray-300 py-2 px-3 m-2 mb-1"
                    >
                      How do I know I have the latest version?
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="badge fs-5 text-bg-gray-300 py-2 px-3 m-2 mb-1"
                    >
                      Can I invite team members?
                    </a>
                    <a
                      href="javascript: void(0);"
                      className="badge fs-5 text-bg-gray-300 py-2 px-3 m-2 mb-1"
                    >
                      Where do I find my API usage?
                    </a>
                  </div>
                </div>
                {/* / .row */}
                <div className="row justify-content-center">
                  <div className="col-lg-10 col-xxl-9">
                    <h2 className="h3 text-center">
                      Frequently Asked Questions
                    </h2>
                    <div className="row mb-6">
                      <div className="col-xl-6">
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Vivamus dapibus libero sed ultricies dapibus?
                            </h3>
                            <p className="mb-0">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nam nibh sem, convallis id tincidunt et,
                              tempor vitae turpis. Curabitur sagittis et dictum
                              turpis vitae tellus.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Nullam gravida orci id venenatis facilisis?
                            </h3>
                            <p className="mb-0">
                              Donec non diam nec leo efficitur congue ut ac
                              nisi. Integer ut tincidunt ligula, nec cursus
                              augue. Proin sed augue magna. Sed viverra vehicula
                              faucibus.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              In sagittis risus ac massa auctor interdum?
                            </h3>
                            <p className="mb-0">
                              Phasellus efficitur nunc et tortor aliquam
                              rhoncus. Ut facilisis malesuada tincidunt. Aliquam
                              mollis lectus et.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Aliquam cursus dolor eget lobortis porta?
                            </h3>
                            <p className="mb-0">
                              Aliquam ornare malesuada enim eget congue. Nam
                              massa purus, consequat a libero eu, molestie
                              sollicitudin neque?Quisque varius vulputate leo
                              non blandit. Sed iaculis justo.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Suspendisse non odio et nisl aliquet consequat?
                            </h3>
                            <p className="mb-0">
                              Quisque varius vulputate leo non blandit. Sed
                              iaculis justo nec nisl consequat, ut varius dolor
                              efficitur. Fusce dictum lobortis nunc vitae
                              mattis. Vivamus ac tellus iaculis, aliquam augue
                              ut libero.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Duis consectetur mauris tristique luctus vehicula?
                            </h3>
                            <p className="mb-0">
                              Phasellus pretium urna sed risus scelerisque
                              tristique. Integer sodales commodo ullamcorper.
                              Vestibulum id tortor ut odio sodales vestibulum.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Ut ut urna ut felis vulputate bibendum eu quis
                              leo?
                            </h3>
                            <p className="mb-0">
                              Nunc fermentum gravida nisi, vehicula consectetur
                              libero mattis eu. Vestibulum pharetra massa in
                              purus ullamcorper, in malesuada enim congue.
                              Pellentesque efficitur nec erat.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Ut elementum dolor quis consequat dapibus?
                            </h3>
                            <p className="mb-0">
                              Praesent vel quam molestie, placerat nunc a,
                              consequat nisi. Curabitur viverra vitae purus
                              vitae volutpat. Nulla facilisi.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Proin consequat nunc efficitur luctus facilisis?
                            </h3>
                            <p className="mb-0">
                              Aenean ultricies elementum risus vitae pulvinar.
                              Aenean porttitor, felis eget accumsan facilisis,
                              risus nunc eleifend massa, in consectetur nisl
                              lectus et risus. Sed eu nulla tellus.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-6">
                          <div className="text-primary me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              height={20}
                              width={20}
                            >
                              <path
                                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.92,1,1,0,0,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.25a1,1,0,0,1-2,0,4,4,0,1,1,5.6,3.67Z"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="h4 mb-0">
                              Curabitur sed velit et elit pretium sodales?
                            </h3>
                            <p className="mb-0">
                              Curabitur dictum turpis vitae commodo tincidunt.
                              Nam id faucibus tortor. Donec elementum nunc diam,
                              nec imperdiet libero auctor et. Cras maximus justo
                              in commodo auctor.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* / .row */}
                    <div className="d-flex align-items-end bg-primary rounded text-center pt-6 px-4 position-relative min-h-200px">
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <h4 className="h3 text-white">
                          Can't find what you're looking for?
                        </h4>
                        {/* Link */}
                        <a
                          className="btn btn-lg btn-white link-primary"
                          href="javascript: void(0);"
                        >
                          Contact Us
                        </a>
                      </div>
                      <img
                        src="https://d33wubrfki0l68.cloudfront.net/3b17577d9510ca8e973cf1ec6558bb69279745e7/40233/assets/images/illustrations/faq-illustration.svg"
                        className="img-fluid ms-auto d-none d-md-block"
                        alt="..."
                        width={150}
                        height={150}
                      />
                    </div>
                  </div>
                </div>
                {/* / .row */}
              </div>
            </div>
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
          {/* Button */}
          <a
            className="btn btn-dark position-fixed bottom-0 end-0 me-4 me-lg-7 mb-6 z-index-1000"
            data-bs-toggle="offcanvas"
            href="#offcanvasCustomize"
            role="button"
            aria-controls="offcanvasCustomize"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="me-2"
              height={14}
              width={14}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7.77069 9.50524C7.60364 9.43126 7.45391 9.32316 7.33112 9.18788L6.70112 8.48788C6.5212 8.28484 6.28225 8.14317 6.01778 8.08272C5.7533 8.02228 5.47654 8.0461 5.22627 8.15083C4.97601 8.25557 4.76478 8.43598 4.62219 8.66678C4.4796 8.89758 4.41279 9.16721 4.43112 9.43788V10.3679C4.44125 10.5505 4.41275 10.7331 4.34748 10.9039C4.28221 11.0747 4.18165 11.2298 4.05235 11.3591C3.92306 11.4884 3.76795 11.589 3.59714 11.6542C3.42634 11.7195 3.24369 11.748 3.06112 11.7379L2.12112 11.6879C1.85153 11.6753 1.58463 11.7463 1.35691 11.8911C1.12919 12.036 0.951762 12.2476 0.848892 12.4971C0.746023 12.7467 0.72273 13.0219 0.782196 13.2851C0.841663 13.5484 0.980987 13.7868 1.18112 13.9679L1.88112 14.5879C2.01927 14.7148 2.129 14.8695 2.20311 15.0419C2.27722 15.2142 2.31403 15.4003 2.31112 15.5879C2.31532 15.7757 2.2791 15.9621 2.2049 16.1347C2.13071 16.3072 2.02029 16.4618 1.88112 16.5879L1.18112 17.2179C0.981519 17.3992 0.842717 17.6376 0.783657 17.9007C0.724597 18.1638 0.748157 18.4387 0.85112 18.6879C0.954125 18.9362 1.13156 19.1464 1.359 19.2897C1.58644 19.433 1.8527 19.5022 2.12112 19.4879H3.06112C3.24369 19.4778 3.42634 19.5063 3.59714 19.5715C3.76795 19.6368 3.92306 19.7374 4.05235 19.8666C4.18165 19.9959 4.28221 20.1511 4.34748 20.3219C4.41275 20.4927 4.44125 20.6753 4.43112 20.8579V21.7879C4.4151 22.0577 4.48357 22.3258 4.62702 22.5549C4.77046 22.784 4.98174 22.9626 5.23147 23.066C5.48119 23.1694 5.75693 23.1925 6.02034 23.1318C6.28374 23.0712 6.5217 22.93 6.70112 22.7279L7.33112 22.0379C7.45391 21.9026 7.60364 21.7945 7.77069 21.7205C7.93775 21.6466 8.11842 21.6083 8.30112 21.6083C8.48382 21.6083 8.6645 21.6466 8.83155 21.7205C8.9986 21.7945 9.14833 21.9026 9.27112 22.0379L9.90112 22.7279C10.0805 22.93 10.3185 23.0712 10.5819 23.1318C10.8453 23.1925 11.1211 23.1694 11.3708 23.066C11.6205 22.9626 11.8318 22.784 11.9752 22.5549C12.1187 22.3258 12.1871 22.0577 12.1711 21.7879V20.8579C12.161 20.6753 12.1895 20.4927 12.2548 20.3219C12.32 20.1511 12.4206 19.9959 12.5499 19.8666C12.6792 19.7374 12.8343 19.6368 13.0051 19.5715C13.1759 19.5063 13.3586 19.4778 13.5411 19.4879H14.4811C14.7495 19.5022 15.0158 19.433 15.2432 19.2897C15.4707 19.1464 15.6481 18.9362 15.7511 18.6879C15.8541 18.4387 15.8776 18.1638 15.8186 17.9007C15.7595 17.6376 15.6207 17.3992 15.4211 17.2179L14.7211 16.5879C14.582 16.4618 14.4715 16.3072 14.3973 16.1347C14.3231 15.9621 14.2869 15.7757 14.2911 15.5879C14.2882 15.4003 14.325 15.2142 14.3991 15.0419C14.4732 14.8695 14.583 14.7148 14.7211 14.5879L15.4211 13.9679C15.6213 13.7868 15.7606 13.5484 15.82 13.2851C15.8795 13.0219 15.8562 12.7467 15.7533 12.4971C15.6505 12.2476 15.4731 12.036 15.2453 11.8911C15.0176 11.7463 14.7507 11.6753 14.4811 11.6879L13.5411 11.7379C13.3586 11.748 13.1759 11.7195 13.0051 11.6542C12.8343 11.589 12.6792 11.4884 12.5499 11.3591C12.4206 11.2298 12.32 11.0747 12.2548 10.9039C12.1895 10.7331 12.161 10.5505 12.1711 10.3679V9.43788C12.1895 9.16721 12.1226 8.89758 11.98 8.66678C11.8375 8.43598 11.6262 8.25557 11.376 8.15083C11.1257 8.0461 10.8489 8.02228 10.5845 8.08272C10.32 8.14317 10.081 8.28484 9.90112 8.48788L9.27112 9.18788C9.14833 9.32316 8.9986 9.43126 8.83155 9.50524C8.6645 9.57922 8.48382 9.61743 8.30112 9.61743C8.11842 9.61743 7.93775 9.57922 7.77069 9.50524Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8.30114 17.4379C9.33944 17.4379 10.1811 16.5962 10.1811 15.5579C10.1811 14.5196 9.33944 13.6779 8.30114 13.6779C7.26285 13.6779 6.42114 14.5196 6.42114 15.5579C6.42114 16.5962 7.26285 17.4379 8.30114 17.4379Z"
              />
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M18.1565 6.23828C17.8804 6.23828 17.6565 6.01442 17.6565 5.73828C17.6565 5.46214 17.8804 5.23828 18.1565 5.23828"
              />
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M18.1565 6.23828C18.4326 6.23828 18.6565 6.01442 18.6565 5.73828C18.6565 5.46214 18.4326 5.23828 18.1565 5.23828"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16.1347 1.83506C16.1409 1.62338 16.2152 1.41935 16.3466 1.25325C16.478 1.08716 16.6594 0.967851 16.8639 0.91304C17.0685 0.85823 17.2853 0.870838 17.4821 0.948992C17.6789 1.02715 17.8453 1.16668 17.9565 1.34689L18.551 2.30113C18.6493 2.45959 18.8042 2.57479 18.9842 2.62343C19.1643 2.67207 19.3561 2.65052 19.5209 2.56313L20.508 2.03729C20.6955 1.93854 20.9096 1.90249 21.1191 1.93443C21.3285 1.96638 21.5222 2.06463 21.6716 2.21476C21.8211 2.3649 21.9185 2.559 21.9495 2.76857C21.9805 2.97814 21.9435 3.19214 21.8439 3.37912L21.3171 4.37019C21.2295 4.53545 21.2077 4.72774 21.2561 4.90841C21.3045 5.08907 21.4195 5.24471 21.578 5.34404L22.5273 5.9411C22.7071 6.05324 22.8461 6.22006 22.924 6.41706C23.002 6.61406 23.0147 6.83085 22.9603 7.03561C22.9059 7.24036 22.7873 7.42229 22.6219 7.55467C22.4565 7.68705 22.253 7.7629 22.0413 7.7711L20.9235 7.80929C20.7371 7.816 20.5602 7.89324 20.4286 8.02539C20.297 8.15754 20.2205 8.33473 20.2145 8.52115L20.179 9.64113C20.1727 9.85281 20.0984 10.0568 19.967 10.2229C19.8357 10.389 19.6542 10.5083 19.4497 10.5631C19.2451 10.618 19.0284 10.6053 18.8315 10.5272C18.6347 10.449 18.4683 10.3095 18.3571 10.1293L17.762 9.17525C17.6638 9.0168 17.509 8.90157 17.3291 8.85289C17.1492 8.80422 16.9575 8.82572 16.7928 8.91305L15.8049 9.43908C15.6175 9.53784 15.4033 9.57389 15.1939 9.54194C14.9844 9.51 14.7908 9.41175 14.6413 9.26161C14.4918 9.11148 14.3944 8.91737 14.3634 8.7078C14.3324 8.49823 14.3694 8.28424 14.469 8.09725L14.9933 7.10534C15.0809 6.94007 15.1027 6.74778 15.0543 6.56712C15.0059 6.38645 14.8909 6.23081 14.7324 6.13148L13.7831 5.53748C13.6034 5.42533 13.4643 5.25851 13.3864 5.06151C13.3085 4.86452 13.2958 4.64772 13.3501 4.44296C13.4045 4.23821 13.5231 4.05628 13.6885 3.92391C13.8539 3.79153 14.0574 3.71567 14.2691 3.70748L15.3877 3.66909C15.5739 3.66238 15.7507 3.58515 15.8822 3.45302C16.0137 3.32089 16.0901 3.14374 16.0959 2.95743L16.1347 1.83506Z"
              />
            </svg>
            Customize
          </a>
        </main>
        {/* / main */}
      </div>
    </>
  );
}

export default CustomerSupport;
