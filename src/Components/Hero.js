import React, { useState } from 'react'
import Section from './Section'
import './Hero.scss'

function Hero(props) {

    const [xAxis, setXAxis] = useState(0)
    const [yAxis, setYAxis] = useState(0)

    useState(() => {
        window.addEventListener('mousemove', (e) => {
            setXAxis((e.clientX / (e.screenX / 2)) * 100)
            setYAxis((e.clientY / (e.screenY)) * 100)
        })
    })

    const irisStyles = {
        transform: `translate(${xAxis}%, ${yAxis}%)`
    }
    const pupilStyles = {
        transform: `translate(${xAxis * 1.2}%, ${yAxis * 1.2}%)`
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