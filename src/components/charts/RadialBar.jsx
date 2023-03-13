import React, { useState } from 'react';
import { Card } from "react-bootstrap";
import Chart from 'react-apexcharts';

const RadialBar = ( {title, serie=50, color="#9966ff", gradientColor="#00ff00" } ) => {
  const [chartData, setChartData] = useState({
    options: {
      
        chart: {
            height: 280,
            type: "radialBar",
        },
        colors: [color],
        plotOptions: {
            radialBar: {
            startAngle: -135,
            endAngle: 135,
            track: {
                background: '#333',
                startAngle: -135,
                endAngle: 135,
            },
            dataLabels: {
                name: {
                show: false,
                },
                value: {
                fontSize: "30px",
                show: true
                }
            }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
            shade: "dark",
            type: "horizontal",
            gradientToColors: [gradientColor],
            stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        },
        labels: ["Progress"]
     },
     series: [serie],
    });

  return (
    <>
        <Card className="text-center">
            <Card.Body>
            <Card.Title><h4>{ title }</h4></Card.Title>
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="radialBar"
                />
            </Card.Body>
      </Card>
    </>
  );
};

export default RadialBar;