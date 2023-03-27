import React, {useEffect} from "react";
import { createGraphNodes } from "./tools/createGraphNodes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { eventType } from "../../lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph({ events }: { events: eventType }) {

  const nodeData = events.length > 0 ? createGraphNodes(events) : null;
  const nodes = nodeData? nodeData.periodNodes.concat(nodeData.yearNodes) : null;

  useEffect(() => {
    console.log(nodes)  
  }, [nodes])

  const minYear = events.length > 0 ? events[0].nextYear : 1900;
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        grid: {
          display: false,
        },
        min: minYear,
        ticks: {
          callback: function (value: any) {
            if (Math.floor(value) === value) {
              return value;
            }
          },
        },
      },
      y: {
        type: "linear",
        grid: {
          display: false,
        },
        min: -6,
        max: 6,
        ticks: {
          autoSkip: false,
          stepSize: 1,
          callback: function (value: any) {
            return value % 5 === 0 ? value : "";
          },
        },
      },
    },
    cubicInterpolationMode: "monotone",
    //tension: 0.4
  };

  const data = {
    datasets: [
      {
        data: nodes ? nodes.sort(function (a, b) {
          return a.xValue - b.xValue;
        }) : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        parsing: {
          xAxisKey: "xValue",
          yAxisKey: "yValue",
        },
      },
    ],
  };
  // @ts-expect-error
  return <Line options={options} data={data} />;
}
