import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  labels,
  data,
  color,
  width = "202px",
  cutout = 70,
  legendStyle,
  borderWidth = 1,
}) => {
  const dataValue = {
    labels: labels,
    datasets: [
      {
        label: "Number of Votes",
        data: data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: borderWidth,
      },
    ],
  };
  return (
    <div style={{ width: width }}>
      <Doughnut
        data={dataValue}
        options={{
          cutout: cutout,
          plugins: {
            legend: legendStyle,
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;

// const dataValue = {
//     labels: ["Red", "Blue", "Yellow", "Green"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [10, 19, 3, 5],
//         backgroundColor: [
//           "green",
//           "rgba(54, 162, 235, 0.2)",
//           "white",
//           "rgba(75, 192, 192, 0.2)",
//         ],
//         borderColor: [
//           "green",
//           "rgba(54, 162, 235, 1)",
//           "white",
//           "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: [8, 1, 1, 1],
//       },
//     ],
//   };
