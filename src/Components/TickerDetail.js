import React, { useContext } from 'react'
import { InstrumentContext } from '../Contexts/InstrumentContext'
import Section from './Section'
import Chart from './Chart'

function TickerDetail() {

    const { ticker, tickerObject } = useContext(InstrumentContext)


    console.log(tickerObject)
    return (
        <Section>
            <h1>{ticker}</h1>
            <div></div>
            <Chart />
        </Section>
    )
}

export default TickerDetail