import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  let router = useRouter();

  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addressC, isConnected } = useAccount();

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
        const resArray = res.data.result;
        var totalGas = 0;

        resArray.forEach((transaction) => {
          totalGas += parseInt(transaction.gasUsed);
        });

        const totalCo2 = totalGas * (0.00033624 / 243305822);
        console.log(totalCo2);

        router.push({
          pathname: "/result",
          query: {
            address: addressC ? addressC : address,
            totalCo2: totalCo2,
            percentage: 10,
          },
        });
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
          <ConnectButton />
          <p className="my-4">OR</p>
          <input
            type="text"
            className="border p-3"
            placeholder="0xBHJ....e22B"
            value={address}
            onChange={inputHandler}
          />

          <button
            onClick={carbonEmissionCalculator}
            className="p-4 rounded bg-black text-white mt-4"
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
        </div>
        <div className="text-sm font-semibold mb-10">
          Build with <span className="text-green-500">Celo &amp; Toucan</span>
        </div>
      </main>
    </div>
  );
}
