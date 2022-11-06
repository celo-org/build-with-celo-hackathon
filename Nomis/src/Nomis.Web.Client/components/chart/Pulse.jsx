import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Pulse({ wallet, setMostActive }) {
  const currentDay = new Date();
  const yearAgoDay = new Date(currentDay);
  yearAgoDay.setFullYear(yearAgoDay.getFullYear() - 1);

  const activityRaw = wallet.stats.turnoverIntervals.map((item) => {
    return {
      month: new Date(item.startDate).getMonth() * 1,
      year: new Date(item.startDate).getFullYear() * 1,
      count: item.count,
    };
  });

  const activity = [];

  activity[11] = {
    month: currentDay.getMonth(),
    year: currentDay.getFullYear(),
    count: 0,
  };

  for (let i = 10; i >= 0; i--) {
    activity[i] = {
      month: activity[i + 1].month > 0 ? activity[i + 1].month - 1 : 11,
      year:
        activity[i + 1].month > 0
          ? activity[i + 1].year
          : activity[i + 1].year - 1,
      count: 0,
    };
  }
  let min = 99999;
  let max = 0;
  let maxMonth;

  for (let i = 0; i < activity.length; i++) {
    for (let j = 0; j < activityRaw.length; j++) {
      if (
        activityRaw[j].month === activity[i].month &&
        activityRaw[j].year === activity[i].year
      ) {
        activity[i].count = activityRaw[j].count;
      }
    }
    if (min > activity[i].count) {
      min = activity[i].count;
    }
    if (max < activity[i].count) {
      max = activity[i].count;
      maxMonth = activity[i].month;
    }
  }

  setMostActive(maxMonth);

  const activityCounts = activity.map((item) => item.count);

  const labels = activity.map((item) => item.month + "mo " + item.year + "y");

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pulse Activity",
        data: activityCounts,
        borderColor: ["white"],
        borderWidth: 4,
        tension: 0.5,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    clip: false,
    scales: {
      y: {
        beginAtZero: true,
        display: false,
        min: min - 0.5,
        max: max + 0.5,
      },
      x: {
        display: false,
      },
    },
  };

  return (
    <div className="chart">
      <Line data={data} options={options} />
      <div className="blur">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
