import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import RingLoader from "react-spinners/RingLoader";
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