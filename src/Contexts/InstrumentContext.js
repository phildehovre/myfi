import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { fetchPortfolio, getUser } from '../Util/db'
import { yahoo } from '../apis/Yahoo'

export const InstrumentContext = React.createContext({})

function InstrumentProvider({ children }) {

    const [ticker, setTicker] = useState('')
    const [interval, setInterval] = useState('1day')
    const [tickerObjects, setTickerObjects] = useState({})
    const [portfolio, setPortfolio] = useState([])

    let tickers = []

    const validateTicker = (t, code) => {
        if (code === 200) {
            tickers.push(t)
            return true
        }
        return false
    }
    // useEffect(() => {
    //     axios.get(`https://api.twelvedata.com/time_series?&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
    //         params: {
    //             symbol: ticker,
    //             interval: '1week',
    //             output: '200'
    //         }
    //     }).then((res, err) => {
    //         validateTicker(ticker, res.code)
    //         if (res.data.code !== 400) {
    //             setTickerObjects(prev => ({ ...prev, [ticker]: res.data }))
    //         }
    //     })
    // }, [ticker])

    useEffect(() => {
        if (auth.currentUser && !portfolio.length) {
            fetchPortfolio(auth.currentUser.uid).then((res, err) => {
                setPortfolio(res.portfolio)
            }).catch(err => console.log(err))
        }
    })

    useEffect(() => {
        // const options = {
        //     method: 'GET',
        //     url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
        //     params: { q: 'tesla', region: 'US' },
        //     headers: {
        //         'X-RapidAPI-Key': process.env.REACT_APP_YAHOO_API_KEY,
        //         'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        //     }
        // };

        // axios.request(options).then(function (response) {
        //     console.log(response.data);
        // }).catch(function (error) {
        //     console.error(error);
        // });
    })


    const value = { ticker, tickerObjects, setPortfolio }


    return (
        <InstrumentContext.Provider value={value}>
            {children}
        </InstrumentContext.Provider >
    )
}

export default InstrumentProvider