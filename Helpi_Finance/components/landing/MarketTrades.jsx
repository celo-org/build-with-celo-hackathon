import React from "react";

function MarketTrades() {
  return (
    <div className="flex flex-col lg:flex-row px-12 2xl:px-32 my-10">
      <div className="w-full lg:w-6/12 flex flex-col lg:flex-row">
        <div className="w-full lg:w-7/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
          <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 lg:py-2 pr-3 rounded-r-xl">
            Optimized to bring you the best rates to trade your stablecoins and
            pegged assets. Support us as liquidity providers or stake our token
            HELPI for solid yields.
          </div>
        </div>
        <div className="w-full lg:w-5/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
          <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
            <h4 className="text-2xl font-semibold text-right">
              $38.2m/$126.4k
            </h4>
            <p className="w-full text-right text-sm text-secondary">
              Total/24hr Volume
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-6/12 flex flex-col lg:flex-row">
        {/* 2.1 */}
        <div className="w-full lg:w-3/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
          <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
            <h4 className="text-2xl font-semibold text-right">$89.5m</h4>
            <p className="w-full text-right text-sm text-secondary">TVL</p>
          </div>
        </div>
        {/* 2.2 */}
        <div className="w-full lg:w-3/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
          <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
            <h4 className="text-2xl font-semibold text-right">$57.9m</h4>
            <p className="w-full text-right text-sm text-secondary">
              Marketcap
            </p>
          </div>
        </div>
        {/* 2.3 */}
        <div className="w-full lg:w-3/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
          <div className="w-auto h-full bg-primary-dark mb-0.5 lg:mr-0.5 py-8 px-3 lg:py-2 rounded-r-xl">
            <h4 className="text-2xl font-semibold text-right">737.7m</h4>
            <h4 className="text-2xl font-semibold text-right">HLP</h4>
            <p className="w-full text-right text-sm text-secondary">
              Circulating Supply
            </p>
          </div>
        </div>
        {/* 2.4 */}
        <div className="w-full lg:w-3/12  bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-r-xl">
          <div className="w-auto h-full bg-primary-dark mb-0.5 lg:m-0 py-8 px-3 lg:py-2 rounded-r-xl">
            <h4 className="text-2xl font-semibold text-right">40.6m</h4>
            <h4 className="text-2xl font-semibold text-right">xHLP</h4>
            <p className="w-full text-right text-sm text-secondary">
              Locked in Vault
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketTrades;
