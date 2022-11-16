import React, { useState } from 'react'
import Section from './Section'
import './Hero.scss'

function Hero(props) {

    const [xAxis, setXAxis] = useState(55)
    const [yAxis, setYAxis] = useState(55)


    useState(() => {
        window.addEventListener('mousemove', (e) => {
            setXAxis((e.clientX / (e.screenX / 2)) * 100)
            setYAxis((e.clientY / (e.screenY)) * 100)
        })
    })

    useState(() => {
        document.addEventListener('mouseleave', () => {
            setXAxis(55)
            setYAxis(55)
        })
    })

    const irisStyles = {
        transform: `translate(${xAxis}%, ${yAxis}%)`
    }
    const pupilStyles = {
        transform: `translate(${xAxis * 1.2}%, ${yAxis * 1.2}%)`
    }
    const shadowStyles = {
        // transform: `translateX(-${xAxis * .5}%)`
    }

    const { height } = props
    return (
        <Section display='flex' height={height} >
            <div className='tagline-ctn'>
                <div className='logo-ctn'>
                    <div className='eye'>
                        <div className='iris' style={irisStyles}>
                            <div className='pupil' style={pupilStyles}>
                            </div>
                        </div>
                    </div>
                    <div className='shadow' style={shadowStyles}></div>
                </div>
                <div>
                    <h1 className='tagline'>Never miss the trade.</h1>
                    <h3 className='subtitle'>With MyFi's all-seeing eye</h3>
                </div>
            </div>
        </Section>
    )
}

export default Hero