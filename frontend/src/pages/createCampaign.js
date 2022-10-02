import React, { useState } from 'react';
import { create as ipfsHttpClient } from "ipfs-http-client";
import BreadCrumb from '../components/breadcrumb';
import { Buffer } from 'buffer';
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import RingLoader from "react-spinners/RingLoader";
import Alert from 'react-bootstrap/Alert';

const projectId = '2DkWK5numOIP1H7GyUZ3aEPhLXK'
const projectSecret = '9c669d03ed7813aae7dc0a32c5cfd386'
const projectIdAndSecret = `${projectId}:${projectSecret}`

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
            'base64'
        )}`,
    },
})

const CreateCampaign = () => {

    const [fileUrl, setFileUrl] = useState(null);
    const [loadingState, setLoadingState] = useState(false)
    const [formInput, updateFormInput] = useState({
        name: '',
        description: '',
        noOfBeneficiary: 0,
        dailyFund: 0
    });

    async function createCampaign() {
        await (window).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
        const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        const gacContract = new ethers.Contract(
            getConfigByChain(network.chainId)[0].contractProxyAddress,
            GrowAChild.abi,
            signer
        )
        const etherAmount = ethers.utils.parseUnits(formInput.dailyFund.toString(), 'ether')
        console.log(`name:${formInput.name} desc:${formInput.description} ben:${formInput.noOfBeneficiary}`)
        const tx = await gacContract.registerCampign(
            formInput.name, fileUrl, formInput.description,
            formInput.noOfBeneficiary,
            etherAmount
        )
        setLoadingState(true)
        toast('Verification in progress !!', { icon: '👏' })
        const receipt = await provider
            .waitForTransaction(tx.hash, 1, 150000)
            .then(() => {
                toast.success(`Campaign Created Successfully !!`)
                setLoadingState(false)
            })
    }

    async function onChange(e) {
        const file = e.target.files[0]
        if (e.target.files[0].size <= 100000 && e.target.files[0].size >= 50000) {
            setLoadingState(true)
            console.log("file", client)

            try {
                const added = await client.add(file, {
                    progress: (prog) => console.log(`received: ${prog}`)
                })
                console.log('added is:', client)
                const url = `https://nftmarketcover.infura-ipfs.io/ipfs/${added.path}`
                setFileUrl(url)
                setLoadingState(false)
            } catch (e) {
                console.log(`Error is: ${e}`)
            }
        } else {
            toast.error('File size should be between 50-100 KB')
        }

    }

    return (
        <>
            <div>
                <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Create Your Campaign" pageURL="create-campaign" />
                <Toaster position='top-center' reverseOrder={false} />
                <section class="ftco-section contact-section ftco-degree-bg">

                    <div class="container block-9">
                        <h4 class="mb-4">Create you campaign and secure funds </h4><h6>(all fields required)</h6>
                        <form id="form-create-item">
                            <div class="form-group">
                                <input type="text" class="form-control " placeholder="Name of Your Campaign" onChange={(e) =>
                                    updateFormInput((formInput) => ({
                                        ...formInput,
                                        name: (e.target.value),
                                    }))
                                } required />
                            </div>
                            <div class="form-group">
                                <textarea onChange={(e) =>
                                    updateFormInput((formInput) => ({
                                        ...formInput,
                                        description: (e.target.value),
                                    }))
                                } name="" id="" cols="30" rows="7" class="form-control" placeholder="Describe Your Campaign" required></textarea>
                            </div>
                            <div class="form-group">
                                <input onChange={(e) =>
                                    updateFormInput((formInput) => ({
                                        ...formInput,
                                        noOfBeneficiary: Number(e.target.value),
                                    }))
                                } type="text" class="form-control" placeholder="Number of Children to be benefited" required />
                            </div>
                            <div class="form-group">
                                <input onChange={(e) =>
                                    updateFormInput((formInput) => ({
                                        ...formInput,
                                        dailyFund: Number(e.target.value),
                                    }))
                                } type="text" class="form-control" placeholder="Daily fund requirement (in USD)" required />
                            </div>
                            <div>Campaign Display Picture</div>
                            <div className='warn'>File size should be between 50-100 KB</div>
                            <div class="form-group">
                                <input type="file"
                                    name="Asset"
                                    required
                                    onChange={onChange}
                                />
                            </div>
                            <div class="form-group">
                                {!loadingState ? (

                                    <input type="button" value="Create" onClick={createCampaign} class="btn btn-primary py-3 px-5" />

                                ) : (
                                    <div className='flex'>
                                        <RingLoader color='#000000' loading={loadingState} size={50} /> Uploading Please Wait...</div>
                                )}
                            </div>

                        </form>
                    </div>
                </section>
            </div>
        </>
    )

}
export default CreateCampaign