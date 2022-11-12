import React, { useEffect, useContext } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { InstrumentContext } from '../Contexts/InstrumentContext'

function Chart({ chartData, handleSampleSizeChange }) {



    return (
        <Line
            data={chartData}
            options={{}}
            onWheel={e => handleSampleSizeChange(e.deltaY)}
        />
    )
}

export default Chart