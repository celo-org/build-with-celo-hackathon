// @ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { abi } from "../utils/abi";

const Funders = () => {
  const { data: signer } = useSigner();
  const contract = new ethers.Contract(
    "0xAfF16af16CE65B1dC308c53CA1dc65c39fD5F82A",
    abi
  );

  const buy = async (event: any) => {
    event.preventDefault();
    const amount = event.target[0].value;
    const tx = await contract
      .connect(signer as any)
      .buy(ethers.utils.parseEther(amount.toString()));
    const receipt = await tx.wait();
    console.log(receipt);
  };

  return (
    <div className="min-h-full">
      <div className="bg-yellow pb-32"></div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="rounded-lg mt-16 bg-white px-5 py-6 shadow sm:px-6">
            <div className="rounded-lg">
              {" "}
              <div className="relative overflow-hidden bg-white h-screen">
                <ConnectButton />
                <div className="mx-auto mt-8 max-w-7xl">
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Fund ZENA & support <em>learn2impact</em>
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua
                    </p>
                    <form onSubmit={buy}>
                      <input
                        required
                        step="0.01"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        style={{ width: 200 }}
                        type="number"
                        id="amount"
                      />
                      <br />
                      <button
                        type="submit"
                        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
