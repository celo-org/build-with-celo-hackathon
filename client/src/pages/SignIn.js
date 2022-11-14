import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectLoginState } from "../redux/authSlice";
import Spinner from "../components/Spinner"
import { STATUS } from "../constants"


function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { status } = useSelector(selectLoginState);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [resMsg, setResMsg] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setResMsg(err.message || "Unable to sign in with provided credentials")
      })
  }

  return (
    <>
      { status === STATUS.PENDING && <Spinner /> }
      <div className="d-flex align-items-center bg-light-green">
        <main className="container">
          <div className="row align-items-center justify-content-center vh-100">
            <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 py-6">
              {/* Title */}
              <h1 className="mb-2 text-center">Sign In</h1>
              {/* Subtitle */}
              <p className="text-secondary text-center">
                Enter your email address and password to access admin panel
              </p>
              <p className="text-primary text-center">{resMsg}</p>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
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
                  <div className="col-12">
                    {/* Password */}
                    <div className="mb-4">
                      <div className="row">
                        <div className="col">
                          {/* Label */}
                          <label className="form-label"> Password </label>
                        </div>
                        <div className="col-auto">
                          {/* Help text */}
                          <a
                            href="reset.html"
                            className="form-text small text-muted link-primary"
                          >
                            Forgot password
                          </a>
                        </div>
                      </div>
                      {/* / .row */}
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
                </div>
                {/* / .row */}
                <div className="form-check">
                  {/* Input */}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                  />
                  {/* Label */}
                  <label className="form-check-label" htmlFor="remember">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <div className="row align-items-center text-center">
                  <div className="col-12">
                    {/* Button */}
                    <button
                      type="submit"
                      className="btn w-100 btn-primary mt-6 mb-2"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="col-12">
                    {/* Link */}
                    <small className="mb-0 text-muted">
                      Don't have an account yet?{" "}
                      <Link to="/sign-up" className="fw-semibold">
                        Sign up
                      </Link>
                    </small>
                  </div>
                </div>
                {/* / .row */}
              </form>
            </div>
          </div>
          {/* / .row */}
        </main>
      </div>
    </>
  );
}

export default SignIn;
