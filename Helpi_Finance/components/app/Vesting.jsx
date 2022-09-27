import React from "react";
import { FiAlertCircle } from "react-icons/fi";

function Vesting() {
  const [claimAmount, setClaimAmount] = React.useState(0);
  const claimReward = () => {
    alert("You have claimed your reward!");
  };
  return (
    <>
      <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-xl mt-4">
        <div className="relative bg-primary-dull border border-primary-light p-4 m-1 rounded-xl h-auto">
          <h3 className="text-xl text-center font-medium text-secondary">
            <FiAlertCircle className="inline mr-2 mb-1" />
            Unlock a fraction of the locked rewards every Three Days. You can
            only claim the unlocked rewards into your account.
          </h3>
          {/* <RiCloseFill className="absolute top-auto botton-auto" /> */}
        </div>
      </div>
      <div className="bg-primary-dull border border-primary-light p-4 mt-4 rounded-xl h-auto">
        {/* div with 3 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* card 1 */}
          <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-lg">
            <div className="bg-primary-dull shadow rounded-lg flex relative z-30 m-px">
              <div className="w-full p-8">
                <p className="text-base leading-6 text-gray-500 mb-3">
                  LOCKED REWARDS
                </p>
                <h2 className="flex items-center text-2xl font-semibold text-gray-200">
                  0.00
                </h2>
              </div>
            </div>
          </div>
          {/* card 2 */}
          <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-lg">
            <div className="bg-primary-dull shadow rounded-lg flex relative z-30 m-px">
              <div className="w-full p-8">
                <p className="text-base leading-6 text-gray-500 mb-3">
                  UNLOCKED REWARDS
                </p>
                <h2 className="flex items-center text-2xl font-semibold text-gray-200">
                  0.00
                </h2>
              </div>
            </div>
          </div>
          {/* card 3 */}
          <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-lg">
            <div className="bg-primary-dull shadow rounded-lg flex relative z-30 m-px">
              <div className="w-full p-8">
                <p className="text-base leading-6 text-gray-500 mb-3">
                  CLAIMED REWARDS
                </p>
                <h2 className="flex items-center text-2xl font-semibold text-gray-200">
                  0.00
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* div with 2 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* card 1 */}
          <div className="bg-primary-light shadow rounded-lg flex relative z-30 m-px">
            <div className="w-full p-8">
              <p className="text-base leading-6 text-secondary">
                You can Unlock 1/60 part of your Helpi Balance every 3 Days
              </p>

              <button className="w-full font-semibold text-primary-light bg-gradient-to-r from-grad-green via-grad-blue to-grad-purple hover:bg-gradient-to-l hover:from-grad-green hover:via-grad-blue hover:to-grad-purple rounded-full py-3 px-6 mt-6">
                UNLOCKED NEW TOKENS
              </button>
            </div>
          </div>
          {/* card 2 */}
          <div className="bg-primary-light shadow rounded-lg flex relative z-30 m-px">
            <div className="w-full p-8">
              <p className="text-base leading-6 text-secondary">
                Unlocked Balance: 0.00 HLP
              </p>
              <div className="flex items-center">
                <div className="w-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-full mt-6 mr-2">
                  <input
                    value={claimAmount}
                    type="number"
                    placeholder="0"
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-[calc(100%-2px)] font-medium text-primary-dull border-none rounded-full py-3 px-6 m-px"
                  />
                </div>
                <button
                  onClick={claimReward}
                  className="w-4/15 text-primary-dark font-medium bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-full mt-4 py-3 px-6"
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vesting;
