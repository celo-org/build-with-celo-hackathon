import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Lottie from "lottie-react";

import errorAnimation from "../../utilities/error.json";
import loadingAnimation from "../../utilities/loading.json";
import notFoundAnimation from "../../utilities/notFound.json";

import MainLayout from "../../layouts/Main";

import Input from "../../components/global/Input";

import WalletData from "../../components/WalletData";
import WalletUser from "../../components/WalletUser";

export async function getServerSideProps(context) {
  const blockchain = await context.query.wallet[0];
  const fullAddress = await context.query.wallet[1];

  return { props: { blockchain, fullAddress } };
}

export default function Scored({ blockchain, fullAddress }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [wallet, setWallet] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(({ blockchain, fullAddress }) => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.nomis.cc/api/v1/${blockchain}/wallet/${fullAddress}/score`
        ).then((response) => response.json());

        setError(null);

        setWallet(response.data);
        setSuccess(response.succeeded);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const [isScrolled, setIsScrolled] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 384);
    });
  }, []);

  const address =
    fullAddress.length > 16
      ? fullAddress[0] +
        fullAddress[1] +
        fullAddress[2] +
        " · · · " +
        fullAddress[fullAddress.length - 3] +
        fullAddress[fullAddress.length - 2] +
        fullAddress[fullAddress.length - 1]
      : fullAddress;

  const router = useRouter();

  const tryAgainHandler = () => {
    router.reload();
  };

  return (
    <MainLayout title={`${address}`}>
      <div className="wrapper">
        <Input blockchain={blockchain} fullAddress={fullAddress} />
        {loading && (
          <section className="message loading">
            <Lottie animationData={loadingAnimation} loop={true} size="240px" />
            <h2>Please Wait...</h2>
            <p>Our calculations are not that fast. Give us a minute.</p>
          </section>
        )}
        {error && (
          <section className="message error">
            <Lottie animationData={errorAnimation} loop={true} size="240px" />
            <h2>There is an Error</h2>
            <p>We have an error: {error}.</p>
            <button onClick={tryAgainHandler} className="tryAgain">
              Try Again
            </button>
          </section>
        )}
        {success && (
          <div className="scored">
            <WalletData
              wallet={wallet}
              blockchain={blockchain}
              fullAddress={fullAddress}
            />
            <WalletUser
              wallet={wallet}
              blockchain={blockchain}
              address={address}
              fullAddress={fullAddress}
            />
            <div className={`mobile ${isScrolled ? "isScrolled" : ""}`}>
              <WalletUser
                wallet={wallet}
                blockchain={blockchain}
                address={address}
                fullAddress={fullAddress}
              />
            </div>
          </div>
        )}
        {wallet && !success && (
          <section className="message noSuccess">
            <Lottie
              animationData={notFoundAnimation}
              loop={true}
              size="240px"
            />
            <h2>There is No {address}</h2>
            <div className="paragraph">
              <p>
                We can{`'`}t find {fullAddress} on {blockchain} blockchain.
              </p>
              <p>
                If you think it{`'`}s wrong please{" "}
                <Link href="mailto:gm@nomis.cc">
                  <a>contact us</a>
                </Link>
                .
              </p>
            </div>
            <button onClick={tryAgainHandler} className="tryAgain">
              Try Again
            </button>
          </section>
        )}
        <div className="poweredBy">
          <p>
            Powered by{" "}
            <a
              href="https://celoscan.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              CeloScan
            </a>{" "}
            APIs
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
