import React from "react";

export default function DataTable({ wallet }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const stats = [];
  let i = 0;
  for (var key in wallet.stats) {
    if (
      key != "noData" &&
      key != "turnoverIntervals" &&
      key != "statsDescriptions"
    ) {
      stats[i] = {
        title: key,
        value: wallet.stats[key],
      };
      for (var key1 in wallet.stats.statsDescriptions) {
        if (key.toLowerCase() === key1.toLowerCase()) {
          stats[i].description = wallet.stats.statsDescriptions[key1].label;
          stats[i].units = wallet.stats.statsDescriptions[key1].units;
        }
      }
      i++;
    }
  }

  return (
    <div className="DataTable">
      <h2>Wallet Stats</h2>
      <div className="table">
        <div className="head">
          <div className="parameter">Parameter</div>
          <div className="value">Value</div>
          <div className="Description">Description</div>
        </div>
        <ul className={`body ${isVisible ? "isVisible" : ""}`}>
          {stats.map((item) => (
            <li className="item" key={item.title}>
              <div className="parameter">{item.title}</div>
              <div className="value">{Math.round(item.value * 100) / 100}</div>
              <div className="description">
                {item.description}
                <span className="units">
                  {item.units.charAt(0).toUpperCase() + item.units.slice(1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}
