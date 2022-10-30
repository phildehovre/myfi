import React from 'react'
import './Section.scss'

function Section(props) {

    const { title, children } = props

    return (
        <div className='section'>
            <h1>{title}</h1>
            <div>{children}</div>
        </div>

    )
}

export default Section