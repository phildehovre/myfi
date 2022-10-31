import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { addInstrument } from '../Util/db'

export const InstrumentContext = React.createContext({})

function InstrumentProvider({ children }) {

    const [ticker, setTicker] = useState('')
    const [interval, setInterval] = useState('1day')
    const [tickerObjects, setTickerObjects] = useState({})
    let tickers = []

    const validateTicker = (t, code) => {
        if (code === 200) {
            tickers.push(t)
            return true
        }
        return false
    }
    useEffect(() => {
        axios.get(`https://api.twelvedata.com/time_series?&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
            params: {
                symbol: ticker,
                interval: '1week',
                output: '200'
            }
        }).then((res, err) => {
            validateTicker(ticker, res.code)
            if (res.data.code !== 400) {
                setTickerObjects(prev => ({ ...prev, [ticker]: res.data }))
            }
        })
    }, [ticker])


    const handleSubmit = (e, term) => {
        e.preventDefault()
        setTicker(term)
        addInstrument(auth.currentUser.uid, [term])
    }

    const value = { handleSubmit, ticker, tickerObjects }


    return (
        <InstrumentProvider.Provider value={value}>
            {children}
        </InstrumentProvider.Provider >
    )
}

export default InstrumentProvider