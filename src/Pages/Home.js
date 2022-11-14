import Hero from "../Components/Hero";
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { InstrumentContext } from "../Contexts/InstrumentContext";
// import { timeParse } from "d3-time-format";
// import { tsvParse, csvParse } from "d3-dsv";
// import { parse } from "@fortawesome/fontawesome-svg-core";



function Home() {


    return (
        <Hero height='100vh' />
    )
}

export default Home