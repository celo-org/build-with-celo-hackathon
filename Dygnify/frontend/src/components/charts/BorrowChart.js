import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "June",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "July",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Aug",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Sept",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Oct",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Nov",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BorrowChart = () => {
  return React.createElement(
    AreaChart,
    {
      width: 400,
      height: 200,
      data: data,
      margin: {
        top: 10,
        right: 20,
        left: 0,
        bottom: 0,
      },
    },
    // React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
    React.createElement(XAxis, { dataKey: "name" }),
    React.createElement(YAxis, null),
    React.createElement(Tooltip, null),
    React.createElement(Area, {
      type: "monotone",
      dataKey: "uv",
      stroke: "#8884d8",
      fill: "#8884d8",
    })
  );
};

export default BorrowChart;
