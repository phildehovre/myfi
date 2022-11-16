import React, { useEffect, useContext } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { InstrumentContext } from '../Contexts/InstrumentContext'

function Chart({ chartData, handleSampleSizeChange }) {

    const handleWheelOverChart = (e) => {
        handleSampleSizeChange(e.deltaY)
        e.stopPropagation()
    }

    return (
        <Line
            data={chartData}
            options={{}}
            onWheel={e => { handleWheelOverChart(e) }}
        />
    )
}

export default Chart