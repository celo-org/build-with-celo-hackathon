import * as Chart from "../Chart";

export default function Score({ wallet }) {
  return (
    <div className="card score">
      <Chart.Score score={wallet.score * 100} />
      <h5>Nomis Score</h5>
      <p>
        The overall Nomis score is {Math.round(wallet.score * 10000) / 100}
        /100.00.
      </p>
    </div>
  );
}
