import { Card } from "react-bootstrap";
import Chart from 'react-apexcharts';

const BarChart = ( {title="Promedio Mensual", found_rate=10, fill_rate=10, contacto=10, on_time=10 } ) => {
  const options = {
  chart: {
    type: 'bar'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        style: {
          fontSize: '20px'
        }
      }
    }
  },
  series: [{
    data: [{
      x: 'Found Rate',
      y: found_rate
    }, {
      x: 'Fill Rate',
      y: fill_rate
    }, {
      x: 'Contacto',
      y: contacto
    }, {
      x: 'On Time',
      y: on_time
    }]
  }]
}

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title><h4>{ title }</h4></Card.Title>
          <Chart
            options={options}
            series={options.series}
            type="bar"
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default BarChart;