
import { useState, useEffect } from "react";
import { signMessage } from "../utils/sign";
import { createSponsorship } from "../utils/createSponsorship";

import Link from "next/link";
import Metamask from "../components/Metamask";

import useSWR from 'swr'
import PersonComponent from '../components/Person'
import { Person } from '../interfaces'



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  // const { data, error } = useSWR('/api/people', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>


  const [haveMetamask, sethaveMetamask] = useState(true);

  const [client, setclient] = useState({
    isConnected: false,
  });

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      sethaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setclient({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setclient({
        isConnected: true,
        address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);


  return (
    <div>
      <h1>Sponsors</h1>
      {/* <ul>
        {data.map((p: Person) => (
          <PersonComponent key={p.id} person={p} />
        ))}
      </ul> */}

      {/* Navbar */}
      <nav className="fren-nav d-flex">
        <div>
          <h3><Link href="/sponsor">Sponsor</Link></h3>
        </div>
        <div className="d-flex" style={{ marginLeft: "auto" }}>
          <div>
            <button className="btn connect-btn" onClick={connectWeb3}>
              {client.isConnected ? (
                <>
                  {client.address.slice(0, 4)}...
                  {client.address.slice(38, 42)}
                </>
              ) : (
                <>Connect Wallet</>
              )}
            </button>
          </div>
          <div>
            <Link href="https://appstore.com">
              <button className="btn tw-btn">Get the timer</button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar end */}

      <section className="container d-flex">
        <main>
          <h1 className="main-title">ama Timer App 🚀</h1>

          <p className="main-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
            suscipit perferendis tempore <br /> eveniet id pariatur error
          </p>

          {/* ---- */}
          <p>
            {!haveMetamask ? (
              <Metamask />
            ) : client.isConnected ? (
              <>
                <br />
                <h2>You're connected ✅</h2>
                <button
                  onClick={signMessage}
                  type="button"
                  className="btn sign-btn"
                >
                  Sign Message
                </button>
                <button
                  onClick={createSponsorship}
                  type="button"
                  className="btn sign-btn"
                >
                  Create Sponsorship
                </button>
              </>
            ) : (
              <>
                <br />
                <button className="btn connect-btn" onClick={connectWeb3}>
                  Connect Wallet
                </button>
              </>
            )}
          </p>
          {/* ---- */}
        </main>
      </section>

    </div>

  )
}
