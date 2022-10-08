import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import BreadCrumb from '../components/breadcrumb';
import { useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi';
import queryString from 'query-string'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { LoaderIcon } from 'react-hot-toast';
import Donate from '../components/donate';

const CampaignDetails = () => {
    const { search } = useLocation()
    const { campId } = queryString.parse(search)
    const [campaign, setCampaign] = useState([])

    useEffect(() => {
        load()
    }, [])
    async function load() {
        await (window).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
        const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        const gacContract = new ethers.Contract(
            getConfigByChain(network.chainId)[0].contractProxyAddress,
            GrowAChild.abi,
            signer
        )
        const data = await gacContract.getCampaignDetails(campId)
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
        console.log("it", items)
        setCampaign(items[0])
    }
    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_7.jpg" pagename={`${campaign.name}`} pageURL="details" />
            <section class="ftco-section contact-section ftco-degree-bg">

                <div class="container">
                    <div class="row d-flex mb-5 contact-info">
                        <div class="col-md-12 mb-4">
                            <h2 class="h4">All you need to know</h2>
                        </div>
                        <div class="col-md-12 mb-4">
                            <div class="row">
                                <div class="col-md-6 pr-md-5">
                                    <Carousel autoPlay="true" >
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-6.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-5.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-4.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-3.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-1.jpg'} alt='' />
                                        </div>
                                    </Carousel>

                                </div>
                                <div class="col-md-6 pr-md-5">
                                    <div class="row">
                                        <div class="col-md-12 pl-md-5">
                                            <p class="mb-1"><h5 class="mb-0">Minimum Daily requirement:<span class="value"> ${campaign.dailyFundNeed} </span></h5></p>
                                            <p class="mb-1"><h5 class="mb-0">Funds Received till date:<span class="value">  ${campaign.totalReceived} </span></h5></p>
                                            <p class="mb-1"><h5 class="mb-0">Funds Utilised till date:<span class="value">  ${campaign.totalUsed}</span></h5></p>
                                            <p class="mb-3"><h5 class="mb-0">Total children benifited:<span class="value">  {campaign.noOfBeneficiaries}</span></h5></p>
                                            <p class="mb-1"><h5 class="mb-0">NGO Profile:</h5></p>
                                            <div class="col-md-12 pl-0 pr-0">
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Name: </div>
                                                    <div class="col-8 pl-0 pr-0"> {campaign.ngoName} </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Address: </div>
                                                    <div class="col-8 pl-0 pr-0"> {campaign.ngoAddress}</div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Reg No: </div>
                                                    <div class="col-8 pl-0 pr-0"> {campaign.ngoregistrationNo} </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Reg With: </div>
                                                    <div class="col-8 pl-0 pr-0"> {campaign.ngoregisteredByGovt} </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Country: </div>
                                                    <div class="col-8 pl-0 pr-0"> {campaign.ngocountry} </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Live Campaigns: </div>
                                                    <div class="col-8 pl-0 pr-0">{campaign.ngocampaignCount} campaigns </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Serving since: </div>
                                                    <div class="col-8 pl-0 pr-0"> {campaign.ngoserviceSince} </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 pl-0 pr-0 mt-3 d-flex flex-row-reverse">
                                                <Donate campaignId={campaign.campaignID} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mb-4">
                            <p class="mb-1"><h5 class="mb-0">Desciption:</h5></p>
                            <p>
                                {campaign.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default CampaignDetails