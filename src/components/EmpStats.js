import React from "react"
import { Chart } from 'react-google-charts';


function EmpStats(props) {

      const data = [
        ['Month', 'Amount of appointments'],
        ...props.e.map(e => [e.lastName, e.count])

    ];

    const options = {
        title: 'Top five doctors with most appointmetns per month',
        chartArea: { width: '40%' },
        hAxis: {
            title: 'Month',
            minValue: 0,
        },
        vAxis: {
            title: 'Amount of appointments',
        },
        legend: { position: 'top' },
        series: {
            0: { color: '#839D9A' },
          },
    };

    return (
        <Chart
        chartType="ColumnChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
    />
    )
}

export default EmpStats