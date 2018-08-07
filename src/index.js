import React from "react";
import ReactDOM from "react-dom";

import * as d3 from "d3";

const dummyData = [
  {
    id: "1",
    type: "positive",
    parentRefId: "adsf"
  },
  {
    id: "2",
    type: "positive"
  },
  {
    id: "3",
    type: "negative"
  },
  {
    id: "4",
    type: "egative"
  },
  {
    id: "4",
    type: "positive",
    isChild: true,
    parentId: "asdf"
  }
];

const Circle = ({ xoffset, yoffset, status, radius = 10 }) => {
  let fillColor = null;

  switch (status) {
    case "negative":
      fillColor = "red";
      break;
    case "positive":
      fillColor = "green";
      break;
    default:
      fillColor = "yellow";
  }

  return <circle cx={xoffset} cy={yoffset} r={radius} fill={fillColor} />;
};

const lineStyle = {
  stroke: "steelblue",
  strokeWidth: "2px",
  fill: "rgba(0, 0, 0, 0)"
};

export const Link = ({ start, end }) => {
  const link = d3.linkHorizontal();

  return <path d={link({ source: start, target: end })} style={lineStyle} />;
};

const Connector = ({ start, end, radius = 5 }) => {
  const line = d3
    .line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveBundle.beta(1));

  const points = [
    start,
    [start[0], end[1] - radius],
    [start[0] + radius, end[1]],
    end
  ];

  return <path d={line(points)} style={lineStyle} />;
};

function App() {
  return (
    <svg width="500" height="500">
      <Connector start={[50, 50]} end={[150, 100]} radius={0} />

      {dummyData.map((value, index, array) => {
        return (
          <g>
            {value.isChild && (
              <Circle
                xoffset={50 + 50}
                yoffset={50 * (index + 1)}
                status={value.type}
                radius={10}
              />
            )}
            {!value.isChild && (
              <Circle
                xoffset={50}
                yoffset={50 * (index + 1)}
                status={value.type}
                radius={10}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
