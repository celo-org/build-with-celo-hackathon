import React from "react";

import * as Chart from "../Chart";

export default function Pulse({ wallet, blockchain }) {
  // const activityString = "You've been quite active for the last 3 months";
  const [mostActive, setMostActive] = React.useState();

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const activityString = `The most active month is ${months[mostActive]}`;

  const exceptions = "ripple";

  return (
    <div className="card pulse">
      {blockchain != exceptions && !wallet.stats.noData && (
        <Chart.Pulse wallet={wallet} setMostActive={setMostActive} />
      )}
      <h5>
        {blockchain != exceptions
          ? wallet.stats.noData
            ? "Innactive Wallet"
            : "Wallet's Pulse"
          : "No Pusle Chart"}
      </h5>
      <p>
        {blockchain != exceptions
          ? wallet.stats.noData
            ? "Here will be your activity pulse after a couple of transactions."
            : `This is wallet's on-chain activity. ${activityString}.`
          : "There is no data to show."}
      </p>
    </div>
  );
}
