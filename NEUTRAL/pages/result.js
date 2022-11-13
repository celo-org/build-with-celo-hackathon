import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Result() {
  let router = useRouter();

  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // set address value in input
  const inputHandler = (e) => {
    setAddress(e.target.value);
  };

  // print address
  useEffect(() => {
    console.log(address);
  }, [address]);

  // calculate total carbbon emmision

  const carbonEmissionCalculator = async () => {
    setIsLoading(true);
    const totalTransactions = await axios
      .get(
        `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&apikey=DF3AFFV14R6G68FFTM331SNMR4QW56ZVVK&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`
      )
      .then((res) => {
        setIsLoading(false);
        router.push({
          pathname: "/result",
          state: { address: address, count: res.data.result.length },
        });
        return console.log(res.data.result.length);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Neutral</title>
        <meta
          name="description"
          content="Offset your carbon emission on mobile"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className="min-h-screen flex flex-col w-96 border justify-between items-center">
        <div className="text-xl font-bold pt-10">
          NEUTRAL
          <p></p>
        </div>
        <div className="flex flex-col">
          <button
            onClick={carbonEmissionCalculator}
            className="p-4 rounded bg-black text-white mt-4"
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
        </div>
        <div className="text-sm font-semibold mb-10">
          Build on <span className="text-green-500">Celo &amp; Toucan</span>
        </div>
      </main>
    </div>
  );
}
