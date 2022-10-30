import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="d-flex align-items-center bg-light-green">
      <main className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7 col-lg-6 px-lg-4 px-xl-8 d-flex flex-column vh-100 py-6">
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
            <div>
              {/* Title */}
              <h1 className="mb-2">Free Sign Up</h1>
              {/* Subtitle */}
              <p className="text-secondary">
                Don't have an account? Create your account, it takes less than a
                minute
              </p>
              {/* Form */}
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      {/* Label */}
                      <label className="form-label"> Full name </label>
                      {/* Input */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      {/* Label */}
                      <label className="form-label"> Email Address </label>
                      {/* Input */}
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </div>
                {/* / .row */}
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      {/* Label */}
                      <label className="form-label"> Password </label>
                      {/* Input */}
                      <div className="input-group input-group-merge">
                        <input
                          type="password"
                          className="form-control"
                          autoComplete="off"
                          data-toggle-password-input
                          placeholder="Your password"
                        />
                        <button
                          type="button"
                          className="input-group-text px-4 text-secondary link-primary"
                          data-toggle-password
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      {/* Label */}
                      <label className="form-label"> Confirm password </label>
                      {/* Input */}
                      <div className="input-group input-group-merge">
                        <input
                          type="password"
                          className="form-control"
                          autoComplete="off"
                          data-toggle-password-input
                          placeholder="Your password again"
                        />
                        <button
                          type="button"
                          className="input-group-text px-4 text-secondary link-primary"
                          data-toggle-password
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* / .row */}
                <div className="form-check">
                  {/* Input */}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                  />
                  {/* Label */}
                  <label className="form-check-label" htmlFor="agree">
                    I agree with{" "}
                    <a href="javascript: void(0);">Terms &amp; Conditions</a> and
                    have understood{" "}
                    <a href="javascript: void(0);">Privacy Policy</a>
                  </label>
                </div>
                {/* Button */}
                <a
                  href="email-verification.html"
                  type="button"
                  className="btn btn-primary mt-3"
                >
                  Get started
                </a>
              </form>
            </div>
            <div className="mt-auto">
              {/* Link */}
              <small className="mb-0 text-muted">
                {" "}
                Already registered?{" "}
                <Link to="/sign-in" className="fw-semibold">
                  Login
                </Link>{" "}
              </small>
            </div>
          </div>
          <div className="col-md-5 col-lg-6 d-none d-lg-block">
            {/* Image */}
            <div
              className="bg-size-cover bg-position-center bg-repeat-no-repeat overlay overlay-dark overlay-50 vh-100 me-n4"
              style={{
                backgroundImage: "url(assets/images/covers/sign-up-cover.jpg)",
              }}
            />
          </div>
        </div>
        {/* / .row */}
      </main>
    </div>
  );
}

export default SignUp;
