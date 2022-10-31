import React, { useState, useContext, useEffect } from 'react'
import { InstrumentContext } from '../Contexts/InstrumentContext'
import { useForm } from 'react-hook-form'

import Container from './Container'
import './SearchBar.scss'


function SearchBar(props) {

    const { height } = props

    const { handleSubmit, register, formState: { errors } } = useForm()

    // const { handleSubmit } = useContext(InstrumentContext)

    const [searchTerm, setSearchTerm] = useState('')

    const onSubmit = (data) => {
        console.log(data)
        handleSubmit(data)
    }


    return (
        <Container height={height}>
            <form className='searchbar_form-ctn' onSubmit={handleSubmit(onSubmit)}>
                <input {...register('searchTerm')} name='searchTerm' className='searchbar' type='text'></input>
                <button className='searchbar-btn' type='submit'>Add Security</button>
            </form>
        </Container>
    )
}

export default SearchBar