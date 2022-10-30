import React from "react";

function ForgotPassword() {
  return (
    <main className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 py-6">
          {/* Title */}
          <h1 className="mb-2 text-center">Forgot password?</h1>
          {/* Subtitle */}
          <p className="text-secondary text-center">
            Enter your email address and we'll send you an email with
            instructions to reset your password
          </p>
          {/* Form */}
          <form>
            <div className="row">
              <div className="col-12">
                <div className="mb-4">
                  {/* Label */}
                  <label className="form-label"> Email Address </label>
                  {/* Input */}
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>
            {/* / .row */}
            <div className="row align-items-center text-center">
              <div className="col-12">
                {/* Button */}
                <a
                  href="reset email-verification.html"
                  type="button"
                  className="btn w-100 btn-primary mt-3 mb-2"
                >
                  Reset password
                </a>
              </div>
              <div className="col-12">
                {/* Link */}
                <small className="mb-0 text-muted">
                  Back to{" "}
                  <a href="sign-in.html" className="fw-semibold">
                    Sign in
                  </a>
                </small>
              </div>
            </div>
            {/* / .row */}
          </form>
        </div>
      </div>
      {/* / .row */}
    </main>
  );
}

export default ForgotPassword;
