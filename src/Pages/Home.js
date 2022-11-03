import Hero from "../Components/Hero";
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { InstrumentContext } from "../Contexts/InstrumentContext";
// import { timeParse } from "d3-time-format";
// import { tsvParse, csvParse } from "d3-dsv";
// import { parse } from "@fortawesome/fontawesome-svg-core";



function Home() {

    const { validateTicker, ticker, setTickerObject, tickerObject } = useContext(InstrumentContext)

    const parseDate = (data) => {
        let array = []
        data[ticker].values.forEach(row => {
            let newRow = {
                date: new Date(row.datetime),
                open: +row.open,
                high: +row.high,
                low: +row.low,
                close: +row.close,
                volume: +row.volume
            }
            array.push(newRow)
        })
        return array
    }

    function getData() {
        axios.get(`https://api.twelvedata.com/time_series?&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
            params: {
                symbol: ticker,
                interval: '1week',
                output: '200'
            }
        }).then((res, err) => {
            validateTicker(ticker, res.code)
            if (res.data.code !== 400) {
                setTickerObject(prev => ({ ...prev, [ticker]: res.data }))

            }
        })
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (ticker && tickerObject !== null) {
            const parsedTickerObject = parseDate(tickerObject)
        }
    }, [tickerObject, parseDate])

    return (
        <Hero />
    )
}

export default Home