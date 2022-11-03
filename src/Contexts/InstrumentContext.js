import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { fetchPortfolio, getUser } from '../Util/db'
import { yahoo } from '../apis/Yahoo'

export const InstrumentContext = React.createContext({})

function InstrumentProvider({ children }) {

    const [ticker, setTicker] = useState('')
    const [interval, setInterval] = useState('1day')
    const [tickerObject, setTickerObject] = useState(null)
    const [portfolio, setPortfolio] = useState([])

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
                interval: '1year',
                output: '200'
            }
        }).then((res, err) => {
            validateTicker(ticker, res.code)
            if (res.data.code !== 400) {
                setTickerObject(prev => ({ ...prev, [ticker]: res.data }))
            }
        })
    }, [ticker])

    useEffect(() => {
        if (auth.currentUser && !portfolio.length) {
            fetchPortfolio(auth.currentUser.uid).then((res, err) => {
                setPortfolio(res.portfolio)
            }).catch(err => console.log(err))
        }
    })

    const value = {
        ticker,
        tickerObject,
        setPortfolio,
        setTicker,
        validateTicker,
        setTickerObject
    }


    return (
        <InstrumentContext.Provider value={value}>
            {children}
        </InstrumentContext.Provider >
    )
}

export default InstrumentProvider