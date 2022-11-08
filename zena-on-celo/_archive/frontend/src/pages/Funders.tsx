// @ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { dexabi } from "../utils/dexabi";
import { treasuryabi } from "../utils/treasuryabi";
import { useEffect, useState } from "react";
import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";
import Nav from "../components/Nav";

const { REACT_APP_ZENA_TREASURY, REACT_APP_FAKE_DEX } = process.env;

const Funders = () => {
  const { data: signer } = useSigner();
  const provider = new CeloProvider(process.env.REACT_APP_RPC_URL);
  const [BCT, setBCT] = useState<string>();
  const [sequestered, setSequestered] = useState<string>();
  const { isConnected } = useAccount();

  const dexContract = new ethers.Contract(REACT_APP_FAKE_DEX || "", dexabi);

  const treasuryContract = new ethers.Contract(
    REACT_APP_ZENA_TREASURY || "",
    treasuryabi
  );

  useEffect(() => {
    const fetchTreasuryInfo = async () => {
      const tx = await treasuryContract
        .connect(provider as any)
        .getTreasuryBCT();
      const formattedBalance = ethers.utils.formatUnits(tx);
      setBCT(formattedBalance);
    };

    const fetchSequesteredInfo = async () => {
      const tx1 = await treasuryContract
        .connect(provider as any)
        .getAllSequesteredBCT();
      const formattedBalance1 = ethers.utils.formatUnits(tx1);
      setSequestered(formattedBalance1);
    };

    fetchTreasuryInfo();
    fetchSequesteredInfo();
  }, []);

  const buy = async (event: any) => {
    event.preventDefault();
    const amount = event.target[0].value;
    const tx = await dexContract
      .connect(signer as any)
      .buy(ethers.utils.parseEther(amount.toString()));
    const receipt = await tx.wait();
  };

  const stats = [
    { name: "$BCT in Treasury", stat: BCT },
    { name: "Sequestered $BCT", stat: sequestered },
  ];

  return (
    <div className="min-h-full">
      <Nav />

      <main>
        <div>
          {/* Replace with your content */}
          <div className="rounded-lg mt-4 bg-white px-5 py-6 shadow sm:px-6">
            <div className="rounded-lg">
              {" "}
              <div className="relative  bg-white ">
                <div className="mx-auto mt-8 max-w-7xl">
                  <div>
                    <div className="flex flex-col w-full mb-20 text-left lg:text-center">
                      <h2 className="mb-6 font-serif text-4xl font-bold tracking-tighter text-[#385738] md:text-8xl lg:text-6xl">
                        Fund ZENA & support <em>learn2impact</em>
                      </h2>
                      <p className="mx-auto text-lg leading-snug text-slate-500">
                        ZENA app users will earn CO2-backed tokens by completing
                        learning chapters and quests. These tokens can be
                        exchanged into a certificate NFT, sequestering CO2.{" "}
                        <b>Fund us, and enable learn2impact!</b>
                      </p>
                      <p className="mx-auto text-center mt-12 text-2xl font-bold leading-snug text-slate-500">
                        <ConnectButton />
                      </p>
                    </div>
                    <dl className="mt-5 mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {stats.map((item) => (
                        <div
                          key={item.name}
                          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                        >
                          <dt className="truncate text-sm font-medium text-gray-500">
                            {item.name}
                          </dt>
                          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {item.stat}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-3 text-2xl text-gray-700 dark:text-gray-400">
                      Ready to fund?
                    </p>
                    <form onSubmit={buy}>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="amount"
                      >
                        amount (* required)
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                          BCT
                        </span>
                        <input
                          required
                          step="0.01"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          style={{ width: 200 }}
                          type="number"
                          id="amount"
                        />
                      </div>

                      <br />
                      <button
                        disabled={!isConnected}
                        type="submit"
                        className="disabled:opacity-25 flex w-full items-center justify-center rounded-md border border-transparent bg-green px-8 py-3 text-base font-medium text-white hover:bg-green-medium md:py-4 md:px-10 md:text-lg"
                        role="button"
                      >
                        Buy BCT & transfer to ZENA treasury
                      </button>
                    </form>
                    {/* <a
                      href="#"
                      className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        aria-hidden="true"
                        className="ml-2 -mr-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default Funders;
