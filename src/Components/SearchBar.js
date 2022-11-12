import React, {
    useState,
    useEffect,
    useContext,
    // useRef 
} from 'react'
import { InstrumentContext } from '../Contexts/InstrumentContext'
import AutoComplete from './AutoComplete'
import { useForm } from 'react-hook-form'
import { auth } from '../Config/firebase'
import axios from 'axios'
import Container from './Container'
import './SearchBar.scss'
import { addInstrument } from '../Util/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import { uuidv4 } from '@firebase/util'

function SearchBar(props) {

    const { height } = props
    const { handleSubmit, register, reset } = useForm()
    const { setTicker, setTickerObject, tickerObject } = useContext(InstrumentContext)

    const [term, setTerm] = useState(null)
    const [autoComplete, setAutoComplete] = useState([])
    const [show, setShow] = useState(true)
    const [type, setType] = useState('stocks')

    useEffect(() => {
        if (term && term.length) {
            axios.get(`https://api.twelvedata.com/${type}?symbol=${term}&apikey=${process.env.REACT_APP_TWELVEDATA_API_KEY}`, {
            }).then((res, err) => {
                setAutoComplete(res.data.data)
            }).catch(err => alert(err))
        }
    }, [term]);


    const onSubmit = (data) => {
        handleSubmit(data)
        addInstrument(auth.currentUser.uid, term)
        reset()
        setTerm('')
    }



    const handleOnSearchBarInput = (e) => {
        setShow(true)
        setTerm(e.target.value)
    }

    const handleTypeChange = (type) => {
        setType(type)
        setTerm('')
    }



    return (
        <>
            <Container height={height}>
                <div className='instrument_selction-ctn'>
                    <button className={`instrument_selction-btn ${type === 'stocks' && 'active'}`} type='check' onClick={() => { handleTypeChange('stocks') }}>Stocks</button>
                    <button className={`instrument_selction-btn ${type === 'etf' && 'active'}`} type='check' onClick={() => { handleTypeChange('etf') }}>ETF</button>
                    <button className={`instrument_selction-btn ${type === 'indices' && 'active'}`} type='check' onClick={() => { handleTypeChange('indices') }}>Indices</button>
                </div>
                <form className='searchbar_form-ctn' onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('term')} name='searchTerm' autoComplete="off" className='searchbar' onChange={e => { handleOnSearchBarInput(e) }} type='text'></input>
                    <button className='searchbar-btn' type='submit'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                    </button>
                    <AutoComplete term={term} setShow={setShow} show={show} autoComplete={autoComplete} />
                </form>
            </Container>
        </>
    )
}

export default SearchBar


    // useEffect(() => {
    //     const closeDropdown = (e) => {
    //         setShow(false)
    //     }
    //     document.body.addEventListener('click', closeDropdown)
    //     return () => document.body.removeEventListener('click', closeDropdown)
    // })