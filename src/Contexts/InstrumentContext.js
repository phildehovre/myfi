import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { fetchPortfolio, fetchWatchlist, updateWatchlist } from '../Util/db'
import { parseDate, getToday } from '../Util/formatters'

export const InstrumentContext = React.createContext({})

function InstrumentProvider({ children }) {

    const [selectedTicker, setSelectedTicker] = useState(null)
    const [interval, setInterval] = useState('1day')
    const [outputSize, setOutputSize] = useState(5000)
    const [tickerObject, setTickerObject] = useState(null)
    const [parsedData, setParsedData] = useState([])
    const [today, setToday] = useState()
    const [watchlist, setWatchlist] = useState([])

    console.log(selectedTicker)

    useEffect(() => {
        setToday(getToday())
    },)

    useEffect(() => {
        if (tickerObject !== null && tickerObject[selectedTicker.symbol]?.values)
            setParsedData(parseDate(tickerObject[selectedTicker.symbol].values))
    }, [tickerObject, selectedTicker])



    useEffect(() => {
        if (selectedTicker) {
            axios.get(`https://api.twelvedata.com/time_series?symbol=${selectedTicker.symbol}&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
                params: {
                    symbol: selectedTicker.symbol,
                    interval: interval,
                    outputsize: outputSize
                }
            }).then((res, err) => {
                if (res.data.code !== 400) {
                    setTickerObject(prev => (
                        { [selectedTicker.symbol]: { ...res.data, meta: { ...res.data.meta, name: selectedTicker.name } } }))
                }
            });
        }
    }, [selectedTicker, outputSize]);


    useEffect(() => {
        if (auth.currentUser && watchlist.length === 0) {
            fetchWatchlist(auth.currentUser.uid).then((res, err) => {
                setWatchlist(res.watchlist)
            }).catch(err => console.log(err))
        }
    })


    const handleIntervalChange = (val) => {
        setInterval(val)
    }
    const handleTickerChange = (t) => {
        setSelectedTicker(t)
    };

    const handleAddToWatchlist = (val) => {
        updateWatchlist(auth.currentUser.uid, val)
    }


    const value = {
        handleTickerChange,
        setTickerObject,
        setSelectedTicker,
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