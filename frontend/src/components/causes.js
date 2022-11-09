import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import { Dna } from 'react-loader-spinner'

import Cause from './cause';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
    responsiveClass: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
};


const Causes = () => {

    const [campaign, setCampaign] = useState([])
    const [loadingState, setLoadingState] = useState(true)

    useEffect(() => {
        viewCampaigns()
    }, [])

    async function viewCampaigns() {
        setLoadingState(true)
        await (window).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
        const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        const gacContract = new ethers.Contract(
            getConfigByChain(network.chainId)[0].contractProxyAddress,
            GrowAChild.abi,
            signer
        )
        const data = await gacContract.getAllCampaigns()
        const items = await Promise.all(
            data.map(async (i) => {
                const ngoDetails = await gacContract.getNGODetails(i.ngo)
                let item = {
                    campaignID: Number(ethers.utils.formatUnits(i.campaignID.toString(), 'ether')) * 10 ** 18,
                    ngo: i.ngo,
                    campaignPic: i.campaignPic,
                    name: i.name,
                    description: i.description,
                    noOfBeneficiaries: Number(ethers.utils.formatUnits(i.noOfBeneficiaries.toString(), 'ether')) * 10 ** 18,
                    dailyFundNeed: Number(ethers.utils.formatUnits(i.dailyFundNeed.toString(), 'ether')),
                    availableBalance: Number(ethers.utils.formatUnits(i.availableBalance.toString(), 'ether')),
                    totalReceived: Number(ethers.utils.formatUnits(i.totalReceived.toString(), 'ether')) * 10 ** 18,
                    totalUsed: Number(ethers.utils.formatUnits(i.totalUsed.toString(), 'ether')) * 10 ** 18,
                    ngoName: ngoDetails[0].name,
                    ngoregistrationNo: ngoDetails[0].registrationNo,
                    ngoregisteredByGovt: ngoDetails[0].registeredByGovt,
                    ngoserviceSince: (Number(ethers.utils.formatUnits(ngoDetails[0].serviceSince.toString(), 'ether')) * 10 ** 18).toFixed(0),
                    ngoAddress: ngoDetails[0].ngoAddress,
                    ngocountry: ngoDetails[0].country,
                    ngocampaignCount: Number(ethers.utils.formatUnits(ngoDetails[0].campaignCount.toString(), 'ether')) * 10 ** 18,
                };
                return item;
            })
        );
        console.log("data------------------", items)
        setCampaign(items)
        setLoadingState(false)

    }

    return (
        <section class="ftco-section bg-light">
            <div class="container-fluid">
                <div class="row justify-content-center mb-5 pb-3">
                    <div class="col-md-7 heading-section text-center">
                        <h2 class="mb-4">Some Statistics</h2>
                        <p>1. An estimated <b>153 million</b> children worldwide are orphans (UNICEF).</p>
                        <p>2. Asia holds the largest number of orphaned children, at <b>71 million</b> – India alone is home to <b>31 million</b> orphans. This is followed by Africa, which harbors 59 million.
                            .</p>
                        <p>3. Each day, <b>39,000</b> children are forced from their homes alone because of the death of a parent, family illness or abuse and abandonment. COVID-19: Schools for more than <b>168 million</b> children globally have been <b>completely closed</b> for almost a full year, says UNICEF
                        </p>
                    </div>
                </div>
                <div class="row justify-content-center mb-5 pb-3">
                    <div class="col-md-7 heading-section text-center">
                        <h2 class="mb-4">Our Solutions</h2>
                        <p>1. GrowAChild only approves trusted organizations after manual and automated verification (OTP-based) and then records their data on the blockchain  .</p>
                        <p>2. Asia holds the largest number of orphaned children, at <b>71 million</b> – India alone is home to <b>31 million</b> orphans. This is followed by Africa, which harbors 59 million.
                            .</p>
                        <p>3. Each day, <b>39,000</b> children are forced from their homes alone because of the death of a parent, family illness or abuse and abandonment. COVID-19: Schools for more than <b>168 million</b> children globally have been <b>completely closed</b> for almost a full year, says UNICEF
                        </p>
                    </div>
                </div>
            </div>
        </section>

    )

}

export default Causes
