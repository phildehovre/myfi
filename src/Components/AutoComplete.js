import InstrumentProvider, { InstrumentContext } from '../Contexts/InstrumentContext'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { uuidv4 } from '@firebase/util'

function AutoComplete({ term, setShow, show, autoComplete }) {

    const { handleTickerChange, handleAddToWatchlist } = useContext(InstrumentContext)

    const [showButton, setShowButton] = useState(false)
    const [isHovered, setIsHovered] = useState(null)

    const handleTickerClick = (t) => {
        handleTickerChange(t)
        setShow(false)
    }

    const handleMouseEnter = (val) => {
        setIsHovered(val)
    }

    const handleMouseLeave = (e) => {
        setShowButton('')
    }

    const renderAutoComplete = () => {
        if (term && show && autoComplete && autoComplete.length > 0) {
            return autoComplete.map(val => {
                return (
                    <li className='autocomplete-list-item'
                        key={uuidv4()}
                        onClick={e => { handleTickerClick(val.symbol) }}
                        onMouseEnter={(e) => handleMouseEnter(val.mic_code)}
                        onMouseLeave={() => handleMouseLeave()}
                    >
                        <span className='symbol'>
                            {val.symbol}
                        </span>
                        <span className='shortname'>
                            {val.name}
                        </span>
                        <span className='shortname'>
                            {val.currency}
                        </span>
                        <div
                            className={`watchlist_add-btn ${isHovered === val.mic_code && showButton ? 'visible' : ''}`}
                            onClick={() => { handleAddToWatchlist(val) }}
                        >
                            <FontAwesomeIcon icon={faBinoculars} />
                        </div>
                    </li>
                )
            })
        }
    }
    return (
        <div className='autocomplete-list'
            onMouseEnter={() => { setShowButton(true) }}
            onMouseLeave={() => { setShowButton(false) }}
        >{renderAutoComplete()}</div>
    )
}

export default AutoComplete