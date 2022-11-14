import React, { useState, useEffect, useContext } from 'react'
import Section from './Section'
import Chart from './Chart'
import { dummy } from '../Util/Dummy'
import { uuidv4 } from '@firebase/util'
import Card from './Card'
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, defaults } from 'chart.js';
import { InstrumentContext } from '../Contexts/InstrumentContext'

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

function TickerDetail() {

    const { parsedData, tickerObject, selectedTicker } = useContext(InstrumentContext)

    const [sample, setSample] = useState(null)
    const [sampleSize, setSampleSize] = useState(50)
    const [weeks, setWeeks] = useState(0)
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        (async () => {
            const res = await parsedData
            if (parsedData && parsedData.length) {
                if (sampleSize < res.length) {
                    setSample(res.slice(res.length - sampleSize))
                }
            }
        })()
    }, [parsedData, sampleSize])


    useEffect(() => {
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                    label: "First dataset",
                    data: [33, 53, 85, 41, 44, 65],
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Second dataset",
                    data: [33, 25, 35, 51, 54, 76],
                    fill: false,
                    borderColor: "#742774"
                }
            ]
        }
        setChartData(data)
    }, [])

    useEffect(() => {
        if (sample !== null) {
            const backgroundColor = sample[0].close > sample[sample.length - 1].close ? 'rgba(255, 99, 132, 0.5)' : "rgba(75,192,192,0.2)"
            const data = {
                labels: sample.map(i => i.date.toString().split(' ').slice(1, 4)),
                datasets: [{
                    label: 'Adj. Close',
                    data: sample.map(i => i.close),
                    backgroundColor: backgroundColor,
                    fill: true
                }]
            }
            setChartData(data)
        }
    }, [sample])

    const renderParsedData = () => {
        if (parsedData) {
            return parsedData.map(val => {
                return (
                    <div key={uuidv4()}>
                        < div > {val.close}</div >
                    </div >
                )
            })
        }
    }




    const renderAverageClosingPrice = (data) => {
        if (data && data.length) {
            const obs = data.length
            let averageClosingPrice = data.reduce((acc, v) => { return acc + v.close }, 0) / obs
            return (
                <h3>
                    {averageClosingPrice.toFixed(3)}{dummy.meta.currency}
                </h3>
            )
        }
    }
    const formatToPercentage = (value) => (value * 100).toFixed(2) + '%'

    const handleSampleSizeChange = (val) => {
        if (val > 0 && sampleSize <= 5000) {
            setSampleSize(prev => prev + 5)
        } else if (val < 0 && sampleSize > 5) {
            setSampleSize(prev => prev - 5)
        }
    }

    const renderAverageYearlySimpleReturns = (data) => {
        if (data && data.length) {
            const shiftedData = data.slice(1)
            const dailyReturns = data.map((v, i) => {
                if (shiftedData[i] && shiftedData[i].close && shiftedData[i].close !== NaN) {
                    return (v.close / shiftedData[i].close) - 1
                }
            })
            const averageYearlyReturns = (dailyReturns.slice(0, dailyReturns.length - 1)
                .reduce((acc, v) => { return acc + v }) / data.length) * 250

            return (
                <h3>Average Yearly simple returns: {formatToPercentage(averageYearlyReturns)}</h3>
            )
        }

    }
    return (
        <Section height='fit-content' display='grid'>
            <Card>
                <span>
                    <h1>{tickerObject[selectedTicker.symbol]?.meta.name}</h1>
                    <p>{tickerObject[selectedTicker.symbol]?.meta.currency}</p>
                </span>
                <p>Trading Days:{sampleSize}</p>
                {renderAverageClosingPrice(parsedData)}
                {renderAverageYearlySimpleReturns(parsedData)}
            </Card>
            <Card span='2'>
                {sample && sample.length > 0 && <Chart chartData={chartData} handleSampleSizeChange={handleSampleSizeChange} />}
            </Card>
        </Section >
    )
}

export default TickerDetail