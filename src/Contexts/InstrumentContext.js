import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { fetchPortfolio } from '../Util/db'
import { yahoo } from '../apis/Yahoo'
import { dummy } from '../Util/Dummy'

export const InstrumentContext = React.createContext({})

function InstrumentProvider({ children }) {

    const [selectedTicker, setSelectedTicker] = useState('')
    const [interval, setInterval] = useState('1day')
    const [tickerObject, setTickerObject] = useState(null)
    const [portfolio, setPortfolio] = useState([])
    const [parsedData, setParsedData] = useState(null)
    const [today, setToday] = useState()
    const [date, setDate] = useState({ 'start': '', 'end': today })
    const [tickers, setTickers] = useState([])

    let parseTime = (val) => {
        if (val < 10) {
            return '0' + val
        } else {
            return val
        }
    }

    useEffect(() => {
        const today = new Date()
        let day = parseTime(today.getDate())
        let month = parseTime(today.getMonth() + 1)
        let year = parseTime(today.getFullYear())
        let hours = parseTime(today.getHours())
        let minutes = parseTime(today.getMinutes())

        let parsedDate = [year, month, day].join('-')
        let parsedTime = [hours, minutes].join(':')
        let parsedDateTime = [parsedDate, parsedTime].join(' ')

        setToday(parsedDateTime)
    },)

    useEffect(() => {
        setParsedData(parseDate(dummy))
    }, [])


    useEffect(() => {
        axios.get(`https://api.twelvedata.com/time_series?symbol=${selectedTicker}&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
            params: {
                symbol: selectedTicker,
                interval: interval,
                output: '200'
            }
        }).then((res, err) => {
            validateTicker(selectedTicker, res.code)
            if (res.data.code !== 400) {
                setTickerObject(prev => ({ ...prev, [selectedTicker]: res.data }))
            }
        });
    }, [selectedTicker]);


    // useEffect(() => {
    //     axios.get(`https://api.twelvedata.com/time_series?end_date=${today}&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
    //         params: {
    //             symbol: 'AAPL',
    //             interval: interval,
    //             output: 200,
    //             end_date: today
    //         }
    //     }).then((res, err) => {
    //         validateTicker(selectedTicker, res.code)
    //         console.log(res.data)
    //         if (res.data.code !== 400) {
    //             setTickerObject(prev => ({ ...prev, [selectedTicker]: res.data }))
    //         }
    //     });
    // }, []);


    useEffect(() => {
        if (selectedTicker && selectedTicker.length > 0) {
        }
    }, [selectedTicker])

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

    const parseDate = (data) => {
        let array = []
        data.values.forEach(row => {
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
    };

    const handleTickerChange = (t) => {
        setSelectedTicker(t)
    };

    const handleAddToWatchlist = (val) => {
        setTickerObject(prev => ({ ...prev, [val.symbol]: val }))
    }


    const value = {
        selectedTicker,
        tickerObject,
        setPortfolio,
        handleTickerChange,
        validateTicker,
        setTickerObject,
        parsedData,
        handleAddToWatchlist
    }


    return (
        <InstrumentContext.Provider value={value}>
            {children}
        </InstrumentContext.Provider >
    )
}

export default InstrumentProvider