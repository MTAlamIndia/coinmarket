import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

import PriceChartControls from "./PriceChartControls";

const PriceChart = () => {
  const { chartDetails, chartTimeStamp } = useSelector(
    (state) => state.cryptoSliceReducer
  );

  const timeStamp = Date.now() - chartTimeStamp * 86400000;

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      min: timeStamp,
      max: Date.now(),
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  return (
    <>
      <div className="price__chart">
        <PriceChartControls />
        <Chart
          options={options}
          series={chartDetails}
          type="area"
          height={400}
        />
      </div>
    </>
  );
};

export default PriceChart;
