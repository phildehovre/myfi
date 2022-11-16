import React, { useContext } from 'react'
import './InstrumentSlice.scss'
import { InstrumentContext } from '../Contexts/InstrumentContext'


function InstrumentSlice(props) {
    const { name, symbol, currency } = props.data

    const { handleTickerChange } = useContext(InstrumentContext)

    return (
        <div className='slice-ctn' onClick={() => { handleTickerChange(props.data) }}>
            <div className='slice-name'>{name}</div>
            {/* <div className='slice-symbol'>{symbol}</div>
            <div className='slice-currency'>{currency}</div> */}
        </div>
    )
}


export default InstrumentSlice