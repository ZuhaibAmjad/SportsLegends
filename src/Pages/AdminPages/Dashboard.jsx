import * as React from "react";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import AdminSideBar from "../../Components/AdminSideBar";
import { useEffect } from "react";

export default function Dashboard() {
  const [chartData] = useState({
    series: [
      {
        name: "UTILIZATION",
        data: [44, 55, 57, 56, 61, 58, 93],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 250,
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5, // Specifies the number of ticks (values) on the y-axis
        labels: {
          formatter: function (val) {
            return val + "%"; // Formats the y-axis labels to display percentages
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        // title: {
        //     text: '$ (thousands)'
        //   }
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  });
  const [heatMap, setHeatMap] = useState({
    series: [
      {
        name: "Monday",
        data: [20, 30, 25, 45, 37, 60, 70, 20, 30, 25, 45, 37, 60, 70],
      },
      {
        name: "Tuesday",
        data: [35, 60, 45, 70, 60, 70, 90, 35, 60, 45, 70, 60, 70, 90],
      },
      {
        name: "Wednesday",
        data: [35, 60, 45, 70, 60, 70, 90, 35, 60, 45, 70, 60, 70, 90],
      },
      {
        name: "Thursday",
        data: [35, 60, 45, 70, 60, 70, 90, 35, 60, 45, 70, 60, 70, 90],
      },
      {
        name: "Friday",
        data: [20, 30, 25, 45, 37, 60, 70, 20, 30, 25, 45, 37, 60, 70],
      },
      {
        name: "Saturday",
        data: [20, 30, 25, 45, 37, 60, 70, 20, 30, 25, 45, 37, 60, 70],
      },
      {
        name: "Sunday",
        data: [20, 30, 25, 45, 37, 60, 70, 20, 30, 25, 45, 37, 60, 70],
      },
      //   {
      //     name: 'Metric8',
      //     data: generateData(18, {
      //       min: 0,
      //       max: 90
      //     })
      //   },
      //   {
      //     name: 'Metric9',
      //     data: generateData(18, {
      //       min: 0,
      //       max: 90
      //     })
      //   }
    ],
    options: {
      chart: {
        height: 250,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#008FFB"],
      title: {
        text: "UTILIZATION BY TIME OF WEEK",
      },
    },
  });
  const [lineChart,setLineChart]=useState({
    series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 250,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'UTILIZATION TIMELINE',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    },
  })
  const [donut,setDonut]=useState({
    series: [44, 55, 41, 17, 15],
            options: {
              chart: {
                type: 'donut',
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
  })

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 992);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="block lg:flex xl:flex 2xl:flex h-[100vh]">
    {isWideScreen ? (
      <AdminSideBar className="position-fixed start-0 top-0 w-16 h-[100vh]" />
    ) : (
      <Navbar className="" />
    )}
      <div className="w-full overflow-y-scroll h-[100vh]">
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-col-1 gap-4 m-2 p-5 m-5">
      <div className="border p-4">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={250}
        />
      </div>
      <div className="border p-4">
        <ReactApexChart
          options={heatMap.options}
          series={heatMap.series}
          type="heatmap"
          height={250}
        />
      </div>
      <div className="border p-4">
      <ReactApexChart options={lineChart.options} series={lineChart.series} type="line" height={250} />
      </div>
      <div className="border p-4">
      <ReactApexChart options={donut.options} series={donut.series} type="donut" height={250} />
      </div>
    </div>
    </div>
    </div>
  );
}
