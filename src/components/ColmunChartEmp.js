import React from 'react'
import { Chart } from 'react-google-charts';
import { ColumnChartOptions } from 'react-google-charts';
import { ColumnChart } from 'react-google-charts';

function ColmunChartEmp(props) {
    const data = [
        ['Month', 'Doc1'],
        [props.stat.firstName, props.stat.appointmentCount]

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

export default ColmunChartEmp