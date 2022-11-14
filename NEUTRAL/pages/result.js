import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

function Offseter() {
  const { config } = usePrepareContractWrite({
    address: "0xabC4BeB282141169A6F8F00f1395001dE39c3Fc9",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_address",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_carbonToBeAdded",
            type: "uint256",
          },
        ],
        name: "updateCarbonOffset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_address",
            type: "address",
          },
        ],
        name: "viewCarbonOffset",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "mint",
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <button
        disabled={!write || isLoading}
        onClick={() => write()}
        className="p-4 rounded bg-black text-white mt-8"
      >
        {isLoading ? "Offsetting..." : "Become Carbon Neutral"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Result(props) {
  let { query } = useRouter();

  const percentage = 10; // parseInt(props.state.percentage);

  const [address, setAddress] = useState("");
  const [color, setColor] = useState("green");

  // set address value in input
  const inputHandler = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    console.log(query);
  });

  // print address
  useEffect(() => {
    console.log(address);
  }, [address]);

  useEffect(() => {
    if (percentage < 30) {
      setColor("red");
    } else if (percentage > 75) {
      setColor("green");
    } else {
      setColor("orange");
    }
  });

  // calculate total carbbon emmision

  const carbonOffsetHandler = async () => {};

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
          <div className="w-44 h-44">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%` + " Neutral"}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "round",

                // Text size
                textSize: "10px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `${color}`,
                textColor: "#000",
                trailColor: `rgba(253, 253, 253)`,
                backgroundColor: "#FEFEFE",
              })}
            />
          </div>

          {/* <button
            onClick={() => write()}
            className="p-4 rounded bg-black text-white mt-8"
          >
            {isLoading ? "Offsetting..." : "Become Carbon Neutral"}
          </button> */}

          <Offseter />
        </div>
        <div className="text-sm font-semibold mb-10">
          Build with <span className="text-green-500">Celo &amp; Toucan</span>
        </div>
      </main>
    </div>
  );
}
