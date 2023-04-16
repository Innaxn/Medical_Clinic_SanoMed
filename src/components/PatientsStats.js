import React from "react"
import { Chart } from 'react-google-charts';


function PatientsStats(props) {
    
      const data = [
        ['Month', 'Amount of diagnoses  '],
        ...props.p.map(p => [p.lastName, p.count])

    ];

    const options = {
        title: 'Top five patients with most diagnoses',
        chartArea: { width: '40%' },
        hAxis: {
            title: 'Month',
            minValue: 0,
        },
        vAxis: {
            title: 'Amount of diagnoses in total',
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

export default PatientsStats