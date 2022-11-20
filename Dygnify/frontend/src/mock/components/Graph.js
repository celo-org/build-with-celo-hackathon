import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

const Graph = () => {
  return React.createElement(
    LineChart,
    {
      width: 400,
      height: 200,
      data: data,
      margin: {
        top: 5,
        right: 30,
        left: 10,
        bottom: 5,
      },
    },
    // React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
    React.createElement(XAxis, { dataKey: "name" }),
    React.createElement(YAxis, null),
    React.createElement(Tooltip, null),
    // React.createElement(Legend, null),
    React.createElement(Line, {
      type: "monotone",
      dataKey: "pv",
      stroke: "#8884d8",
      activeDot: { r: 8 },
    })
  );
};

export default Graph;