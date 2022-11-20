import React, { Component } from "react";
import Chart from "react-google-charts";
const pieData = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];
const pieOptions = {
  title: "My Daily Activities",
  pieHole: 0.4,
};
class PieChartNew extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2>React Donut Chart Example</h2>
        <Chart
          width={"600px"}
          height={"320px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieData}
          options={pieOptions}
          rootProps={{ "data-testid": "3" }}
        />
      </div>
    );
  }
}
export default PieChartNew;
