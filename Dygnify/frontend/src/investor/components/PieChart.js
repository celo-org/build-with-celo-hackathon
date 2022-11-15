import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

const data = [
  { name: "Total Yield", value: 106850 },
  { name: "Total Invested", value: 195850 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    // percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return React.createElement(
    "g",
    null,
    React.createElement(
      "text",
      { x: cx, y: cy, dy: 8, textAnchor: "middle", fill: fill },
      <div style={{ fontSize: 14 }}>Amount Invested</div>
    ),
    React.createElement(Sector, {
      cx: cx,
      cy: cy,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: startAngle,
      endAngle: endAngle,
      fill: "#5375FE",
    }),

    React.createElement(Sector, {
      cx: cx,
      cy: cy,
      startAngle: startAngle,
      endAngle: endAngle,
      innerRadius: outerRadius + 6,
      outerRadius: outerRadius + 10,
      fill: fill,
    }),
    React.createElement("path", {
      d: `M${sx},${sy}L${mx},${my}L${ex},${ey}`,
      stroke: fill,
      fill: "none",
    }),
    React.createElement("circle", {
      cx: ex,
      cy: ey,
      r: 2,
      fill: fill,
      stroke: "none",
    }),
    React.createElement(
      "text",
      {
        x: ex + (cos >= 0 ? 1 : -1) * 12,
        y: ey,
        textAnchor: textAnchor,
        fill: "#333",
      },
      `${"Amount Invested"}`
    ),
    React.createElement(
      "text",
      {
        x: ex + (cos >= 0 ? 1 : -1) * 12,
        y: ey,
        dy: 18,
        textAnchor: textAnchor,
        fill: "#999",
      },
      `${value} ${process.env.REACT_APP_TOKEN_NAME}`
    )
  );
};
const PieGraph = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return React.createElement(
    PieChart,
    { width: 550, height: 300 },
    React.createElement(Pie, {
      activeIndex: activeIndex,
      activeShape: renderActiveShape,
      data: data,
      cx: 200,
      cy: 150,
      innerRadius: 60,
      outerRadius: 80,
      fill: "#F790F9",
      dataKey: "value",
      onMouseEnter: onPieEnter,
    })
  );
};

export default PieGraph;
