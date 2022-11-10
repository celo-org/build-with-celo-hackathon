import React, { useState, useEffect } from 'react';
import Body from '../components/body';
import Summery from '../components/summery';
import Advertise from '../components/advertise';
import Causes from '../components/causes';
import LeaderBoard from '../components/leaderboard';
import Gallery from '../components/galary';
import { client } from "../lib/sanityClient";

const Home = () => {

    // useEffect(() => {
    //     clearFields()
    // }, [])

    // async function clearFields() {
    //     const query = '*[_type == "task"]'
    //     //const params = { status: 'no', date: Number(((new Date().getTime()) / 1000).toFixed(0)) }
    //     const result = await client.delete({ query })
    // }

    return (
        <div>
            <Body />
            <Summery />
            <Advertise />
            <Causes />
            <LeaderBoard />
            <Gallery />

        </div>
    )
}


export default Home