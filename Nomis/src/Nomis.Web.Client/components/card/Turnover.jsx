import Image from "next/image";

import * as Emoji from "../../public/emoji/turnover";

export default function Turnover({ wallet }) {
  const turnover = wallet.stats.walletTurnover;

  const low = 10;
  const avg = 20;
  const high = 50;

  const cheapTitle = "Small Activity";
  const lowTitle = "Active User";
  const avgTitle = "Should Be a Trader";
  const highTitle = "A Big Spender";

  const emoji =
    turnover >= low
      ? turnover >= avg
        ? turnover >= high
          ? Emoji.High
          : Emoji.Avg
        : Emoji.Low
      : Emoji.Cheap;

  const title =
    turnover >= low
      ? turnover >= avg
        ? turnover >= high
          ? highTitle
          : avgTitle
        : lowTitle
      : cheapTitle;

  return (
    <div className="card turnover">
      <Image src={emoji} width="64" height="64" />
      <h5>{title}</h5>
      <p>
        {turnover > 0
          ? "This wallet has a total spendings of more than " +
            Math.trunc(turnover / 10) * 10 +
            " native coins."
          : "This wallet has no transactions."}
      </p>
    </div>
  );
}
