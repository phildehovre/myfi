import React, { useContext, useState, useEffect } from 'react'
import { InstrumentContext } from '../Contexts/InstrumentContext'
import Section from './Section'
import Chart from './Chart'
import { dummy } from '../Util/Dummy'
import { uuidv4 } from '@firebase/util'

function TickerDetail() {

    const { ticker, parsedData } = useContext(InstrumentContext)

    const [sample500, setSample500] = useState(null)
    const [sampleSize, setSampleSize] = useState(500)

    useEffect(() => {
        (async () => {
            const res = await parsedData
            if (parsedData && parsedData.length) {
                setSample500(res.slice(0, sampleSize))
            }
        })()
    }, [parsedData, sampleSize])



    const renderParsedData = () => {
        if (parsedData) {
            return parsedData.map(val => {
                return (
                    <div key={uuidv4()}>
                        {/* <div>{val.date}</div> */}
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

    const handleSampleSizeChange = (e) => {
        setSampleSize(e.target.value)
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

            console.log(averageYearlyReturns)
            return (
                <h3>Average Yearly simple returns: {formatToPercentage(averageYearlyReturns)}</h3>
            )
        }

    }

    return (
        <Section>
            <h1>{ticker}</h1>
            <div>
                <p>{sampleSize}</p>
                <input type='range' min='7' max='5000' onChange={(e) => handleSampleSizeChange(e)} />
            </div>
            {renderAverageClosingPrice(sample500)}
            {renderAverageYearlySimpleReturns(sample500)}
        </Section>
    )
}

export default TickerDetail