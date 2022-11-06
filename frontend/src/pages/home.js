import React, { useState, useEffect } from 'react'; 
import Body from '../components/body';
import Summery from '../components/summery';
import Advertise from '../components/advertise';
import Causes from '../components/causes';
import LeaderBoard from '../components/leaderboard';
import Gallery from '../components/galary';

const Home = () => {    
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