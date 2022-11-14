import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, selectSignupState } from "../redux/authSlice";
import Spinner from "../components/Spinner"
import { STATUS } from "../constants"

function SignUp() {
  const dispatch = useDispatch();

  const { status } = useSelector(selectSignupState);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [resMsg, setResMsg] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(signupUser(formData))
      .unwrap()
      .then((res) => {
        setResMsg(res.message)
      })
      .catch((err) => {
        console.log(err)
        setResMsg(err.message || "Unable to signup with provided credentials")
      })
  }

  return (
    <>
      { status === STATUS.PENDING && <Spinner /> }
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
                <p className="text-primary">
                  { resMsg }
                </p>
                {/* Form */}
                <form onSubmit={handleSubmit}>
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
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
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
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          {/* <button
                            type="button"
                            className="input-group-text px-4 text-secondary link-primary"
                            data-toggle-password
                          /> */}
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
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          {/* <button
                            type="button"
                            className="input-group-text px-4 text-secondary link-primary"
                            data-toggle-password
                          /> */}
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
                  <button
                    // href="#"
                    // type="button"
                    className="btn btn-primary mt-3"
                  >
                    Sign Up
                  </button>
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
    </>
  );
}

export default SignUp;
