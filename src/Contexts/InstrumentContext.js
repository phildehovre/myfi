import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { fetchPortfolio } from '../Util/db'
import { parseDate, getToday } from '../Util/formatters'

export const InstrumentContext = React.createContext({})

function InstrumentProvider({ children }) {

    const [selectedTicker, setSelectedTicker] = useState({})
    const [interval, setInterval] = useState('1day')
    const [outputSize, setOutputSize] = useState(5000)
    const [tickerObject, setTickerObject] = useState(null)
    const [portfolio, setPortfolio] = useState([])
    const [parsedData, setParsedData] = useState(null)
    const [today, setToday] = useState()
    const [date, setDate] = useState({ 'start': '', 'end': today })
    const [tickers, setTickers] = useState([])

    useEffect(() => {
        setToday(getToday())
    },)

    useEffect(() => {
        if (tickerObject !== null && tickerObject[selectedTicker.symbol].values)
            setParsedData(parseDate(tickerObject[selectedTicker.symbol].values))
    }, [tickerObject])


    useEffect(() => {
        axios.get(`https://api.twelvedata.com/time_series?symbol=${selectedTicker.symbol}&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
            params: {
                symbol: selectedTicker.symbol,
                interval: interval,
                outputsize: outputSize
            }
        }).then((res, err) => {
            validateTicker(selectedTicker.symbol, res.code)
            if (res.data.code !== 400) {
                setTickerObject(prev => (
                    { [selectedTicker.symbol]: { ...res.data, meta: { ...res.data.meta, name: selectedTicker.name } } }))
            }
        });
    }, [selectedTicker, outputSize]);

    useEffect(() => {
        if (auth.currentUser && !portfolio.length) {
            fetchPortfolio(auth.currentUser.uid).then((res, err) => {
                setPortfolio(res.portfolio)
            }).catch(err => console.log(err))
        }
    })

    const validateTicker = (t, code) => {
        if (code === 200) {
            setTickers(prev => [...prev, t])
            return true
        }
        return false
    };

    console.log(selectedTicker)
    const handleIntervalChange = (val) => {
        setInterval(val)
    }
    const handleTickerChange = (t) => {
        setSelectedTicker(t)
    };

    const handleAddToWatchlist = (val) => {
        setTickerObject(prev => ({ ...prev, [val.symbol]: val }))
    }


    const value = {
        handleTickerChange,
        setTickerObject,
        parsedData,
        handleAddToWatchlist,
        selectedTicker,
        tickerObject
    }


    return (
        <InstrumentContext.Provider value={value}>
            {children}
        </InstrumentContext.Provider >
    )
}

export default InstrumentProvider