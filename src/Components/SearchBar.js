import React, { useState, useContext, useEffect } from 'react'
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
    const { handleSubmit, register } = useForm()
    // const { ticker } = useContext(InstrumentContext)

    const [term, setTerm] = useState('')
    const [autoComplete, setAutoComplete] = useState([])
    const [show, setShow] = useState(true)


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
        handleSubmit(data)
        addInstrument(auth.currentUser.uid, data.searchTerm)
    }

    window.addEventListener('click', (e) => {
        if (show && e.target.classname !== 'autocomplete-list') {
            setShow(false)
        }
        else {
            setShow(true)
        }
    })

    const renderAutoComplete = () => {
        if (term && show && autoComplete && autoComplete.length > 0) {
            return autoComplete.map(val => {
                return (
                    <li className='autocomplete-list-item' >
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
                    <input {...register('searchTerm')} name='searchTerm' className='searchbar' onChange={e => { setTerm(e.target.value) }} type='text'></input>
                    {/* {errors && <p style={{ position: 'absolute' }}>Invalid Ticker</p>} */}
                    <button className='searchbar-btn' type='submit'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='l' />
                    </button>
                    <ul className='autocomplete-list'>{renderAutoComplete()}</ul>
                </form>
            </Container>
        </>
    )
}

export default SearchBar