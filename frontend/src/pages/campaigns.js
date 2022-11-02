import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/breadcrumb';
import Campaign from '../components/campaign';
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import SyncLoader from "react-spinners/SyncLoader";


const Campaigns = () => {

    const [campaign, setCampaign] = useState([])
    const [loadingState, setLoadingState] = useState(false)

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
        console.log("data", items)
        setCampaign(items)
        setLoadingState(false)
    }

    return (
        <div>

            {!loadingState ? (
                <>
                    <BreadCrumb imageURL="/asssets/images/bg_7.jpg" pagename="Live Campaigns" pageURL="campaigns" />
                    {campaign.map((camp, id) => (
                        <Campaign key={id} campaign={camp} />
                    ))}
                </>
            ) : (
                <div className='flex'>
                    <SyncLoader color='#000000' loading={loadingState} /> Loading Campaigns...</div>
            )}


        </div>
    )

}
export default Campaigns