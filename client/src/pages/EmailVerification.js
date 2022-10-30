import React from "react";

function EmailVerification() {
  return (
    <main className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 py-6">
          {/* Title */}
          <h1 className="mb-2 text-center">Verify your email</h1>
          {/* Subtitle */}
          <p className="text-secondary text-center">
            We've sent a link to your email address Please follow the link
            inside to continue
          </p>
          <div className="row align-items-center text-center">
            <div className="col-12">
              {/* Button */}
              <a href="index.html" className="btn w-100 btn-primary mt-3 mb-2">
                Check Email
              </a>
            </div>
            <div className="col-12">
              {/* Link */}
              <small className="mb-0 text-muted">
                Didn't receive an email?{" "}
                <a href="javascript: void(0);" className="fw-semibold">
                  Resend
                </a>
              </small>
            </div>
          </div>{" "}
          {/* / .row */}
        </div>
      </div>{" "}
      {/* / .row */}
    </main>
  );
}

export default EmailVerification;
