import React, { useState, useContext, useEffect, useRef } from 'react'
import { InstrumentContext } from '../Contexts/InstrumentContext'
import { useForm } from 'react-hook-form'
import { auth } from '../Config/firebase'
import axios from 'axios'
import Container from './Container'
import './SearchBar.scss'
import { addInstrument } from '../Util/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar(props) {

    const { height } = props
    const { handleSubmit, register, reset } = useForm()
    const { setTicker } = useContext(InstrumentContext)

    const [term, setTerm] = useState('')
    const [autoComplete, setAutoComplete] = useState([])
    const [show, setShow] = useState(true)
    const dropdownRef = useRef()

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
            params: { q: term, region: 'US' },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_YAHOO_API_KEY,
                'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setAutoComplete(response.data.quotes);
        }).catch(function (error) {
            console.error(error);
        });
    }, [term])


    const onSubmit = (data) => {
        console.log('data', term)
        handleSubmit(data)
        addInstrument(auth.currentUser.uid, term)
        reset()
        setTerm('')
    }



    useEffect(() => {

        const closeDropdown = (e) => {
            setShow(false)
        }

        document.body.addEventListener('click', closeDropdown)

        return () => document.body.removeEventListener('click', closeDropdown)
    })

    const handleOnSearchBarInput = (e) => {
        setShow(true)
        setTerm(e.target.value)
    }

    const handleTickerClick = (t) => {
        setTicker(t)
    }

    const renderAutoComplete = () => {
        if (term && show && autoComplete && autoComplete.length > 0) {
            return autoComplete.map(val => {
                return (
                    <li className='autocomplete-list-item' ref={dropdownRef} key={val.symbol} onClick={e => { handleTickerClick(val.symbol) }}>
                        <span className='symbol'>
                            {val.symbol}
                        </span>
                        <span className='shortname'>
                            {val.shortname}
                        </span>
                    </li>
                )
            })
        }
    }

    return (
        <>
            <Container height={height}>
                <form className='searchbar_form-ctn' onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('term')} name='searchTerm' autocomplete="off" className='searchbar' onChange={e => { handleOnSearchBarInput(e) }} type='text'></input>
                    {/* {errors && <p style={{ position: 'absolute' }}>Invalid Ticker</p>} */}
                    <button className='searchbar-btn' type='submit'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                    </button>
                    <ul className='autocomplete-list'>{renderAutoComplete()}</ul>
                </form>
            </Container>
        </>
    )
}

export default SearchBar