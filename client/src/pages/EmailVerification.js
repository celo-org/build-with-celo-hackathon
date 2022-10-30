import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, selectVerifyEmailState } from "../redux/authSlice";
import Spinner from "../components/Spinner"
import { STATUS } from "../constants"


function EmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const user = searchParams.get('user')

  const dispatch = useDispatch();

  const [isVerified, setIsVerified] = useState(false);
  const [resMsg, setResMsg] = useState('Verifying your email address');

  const { status } = useSelector(selectVerifyEmailState);



  const handleClick = () => navigate('/sign-in')

  useEffect(() => {
    dispatch(verifyEmail({ _id: user }))
      .unwrap()
      .then((res) => {
        setResMsg(res.message)
        setIsVerified(true)
      })
      .catch((err) => {
        console.log(err)
        setResMsg(err.message || "Unable to verify your email")
      })
  }, [user, dispatch])

  return (
    <>
      { status === STATUS.PENDING && <Spinner /> }
      <main className="container">
        <div className="row align-items-center justify-content-center vh-100">
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 py-6">
            {/* Title */}
            <h1 className="mb-2 text-center">{ resMsg }</h1>
            {/* Subtitle */}
            {/* <p className="text-secondary text-center">
              We've sent a link to your email address Please follow the link
              inside to continue
            </p> */}
            <div className="row align-items-center text-center">
              <div className="col-12">
                {/* Button */}
                <button 
                  className="btn w-100 btn-primary mt-3 mb-2"
                  disabled={!isVerified}
                  onClick={handleClick}
                >
                  Proceed to login
                </button>
              </div>
              <div className="col-12">
                {/* Link */}
                {/* <small className="mb-0 text-muted">
                  Didn't receive an email?{" "}
                  <a href="javascript: void(0);" className="fw-semibold">
                    Resend
                  </a>
                </small> */}
              </div>
            </div>{" "}
            {/* / .row */}
          </div>
        </div>{" "}
        {/* / .row */}
      </main>
    </>
  );
}

export default EmailVerification;
