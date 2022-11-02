import BreadCrumb from '../components/breadcrumb';
import ActiveCampaign from '../components/active-campaigns';
import Donations from '../components/donations';
import React, { useEffect, useState } from 'react';
import Campaign from '../components/campaign';
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import RingLoader from "react-spinners/RingLoader";
import Summery from '../components/summery'
import { useAccount, useNetwork } from 'wagmi';


const Dashboard = () => {
    const [campaign, setCampaign] = useState([])
    const [donations, setDonations] = useState([])
    const [loadingState, setLoadingState] = useState(false)
    const { address } = useAccount()
    const { chain } = useNetwork()

    useEffect(() => {
        viewMyCampaigns()
        viewMyDonations()
    }, [address, chain.id])

    async function viewMyCampaigns() {
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
        const data = await gacContract.getMyCampaigns()
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
                    availableBalance: Number(ethers.utils.formatUnits(i.availableBalance.toString(), 'ether')) * 10 ** 18,
                    totalReceived: Number(ethers.utils.formatUnits(i.totalReceived.toString(), 'ether')),
                    totalUsed: Number(ethers.utils.formatUnits(i.totalUsed.toString(), 'ether')) * 10 ** 18,
                    ngoName: ngoDetails[0].name,
                    ngoregistrationNo: ngoDetails[0].registrationNo,
                    ngoregisteredByGovt: ngoDetails[0].registeredByGovt,
                    ngoserviceSince: Number(ethers.utils.formatUnits(ngoDetails[0].serviceSince.toString(), 'ether')) * 10 ** 18,
                    ngoAddress: ngoDetails[0].ngoAddress,
                    ngocountry: ngoDetails[0].country,
                    ngocampaignCount: Number(ethers.utils.formatUnits(ngoDetails[0].campaignCount.toString(), 'ether')) * 10 ** 18,
                };
                return item;
            })
        );
        console.log("items", items.length)
        setCampaign(items)
        setLoadingState(false)
    }

    async function viewMyDonations() {
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
        const data = await gacContract.getMyDonations()
        console.log("datass", data)
        const items = await Promise.all(
            data.filter((i) => i.campaignID != 0).map(async (i) => {
                const campaignDetails = await gacContract.getCampaignDetails(i.campaignID)
                const ngoDetails = await gacContract.getNGODetails(i.ngoAddress)
                let item = {
                    myDonation: Number(ethers.utils.formatUnits(i.depositAmount.toString(), 'ether')),
                    campaignID: Number(ethers.utils.formatUnits(i.campaignID.toString(), 'ether')) * 10 ** 18,
                    name: campaignDetails[0].name,
                    description: campaignDetails[0].description,
                    noOfBeneficiaries: Number(ethers.utils.formatUnits(campaignDetails[0].noOfBeneficiaries.toString(), 'ether')) * 10 ** 18,
                    dailyFundNeed: Number(ethers.utils.formatUnits(campaignDetails[0].dailyFundNeed.toString(), 'ether')),
                    availableBalance: Number(ethers.utils.formatUnits(campaignDetails[0].availableBalance.toString(), 'ether')) * 10 ** 18,
                    totalReceived: Number(ethers.utils.formatUnits(campaignDetails[0].totalReceived.toString(), 'ether')),
                    totalUsed: Number(ethers.utils.formatUnits(campaignDetails[0].totalUsed.toString(), 'ether')),
                    ngoName: ngoDetails[0].name,
                    ngoregistrationNo: ngoDetails[0].registrationNo,
                    ngoregisteredByGovt: ngoDetails[0].registeredByGovt,
                    ngoserviceSince: Number(ethers.utils.formatUnits(ngoDetails[0].serviceSince.toString(), 'ether')) * 10 ** 18,
                    ngoAddress: ngoDetails[0].ngoAddress,
                    ngocountry: ngoDetails[0].country,
                    ngocampaignCount: Number(ethers.utils.formatUnits(ngoDetails[0].campaignCount.toString(), 'ether')) * 10 ** 18,
                };
                return item;
            })
        );
        setDonations(items)
        setLoadingState(false)
    }


    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_6.jpg" pagename="Dashboard" pageURL="Dashboard" />
            <section class="ftco-section contact-section ftco-degree-bg">
                <div class="container tab">
                    <ul class="nav nav-tabs nav-pills nav-fill" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="campaigns-tab" data-toggle="tab" href="#campaigns" role="tab" aria-controls="campaigns" aria-selected="true">Active Campaigns</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="donations-tab" data-toggle="tab" href="#donations" role="tab" aria-controls="donations" aria-selected="false">My Donations</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="campaigns" role="tabpanel" aria-labelledby="campaigns-tab">
                            {campaign.length > 0 ? (
                                !loadingState ? (

                                    campaign.map((camp, id) => (
                                        <ActiveCampaign index={id} key={id} campaign={camp} classOne="col-md-6 d-flex order-md-1 order-sm-2" classTwo="col-md-6 pl-md-5 order-md-2 order-sm-1" />
                                    ))
                                ) : (
                                    <div className='flex'>
                                        <RingLoader color='#000000' loading={loadingState} size={350} /> Loading Campaigns...</div>
                                )
                            ) : (
                                <span>You have not launched any campaigns yet...</span>
                            )}


                        </div>
                        <div class="tab-pane fade" id="donations" role="tabpanel" aria-labelledby="donations-tab">
                            {donations.length > 0 ? (
                                !loadingState ? (
                                    donations.map((camp, id) => (
                                        <Donations key={id} details={camp} />
                                    ))
                                ) : (
                                    <div className='flex'>
                                        <RingLoader color='#000000' loading={loadingState} size={350} /> Loading Campaigns...</div>
                                )
                            ) : (
                                <span>You have not donated to any campaigns yet...</span>
                            )}



                        </div>

                    </div>
                </div>
            </section>

        </div>
    )

}

export default Dashboard