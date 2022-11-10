import React, { useState } from 'react';
import { client } from "../lib/sanityClient";
import toast, { Toaster } from 'react-hot-toast'
import { CircleLoader, PulseLoader } from 'react-spinners'
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'

const ActiveCampaign = ({ classOne, classTwo, index, campaign }) => {

    const [file, setFile] = useState(false)
    const [loadingState, setLoadingState] = useState(false)
    const [imagesAssets, setImagesAssets] = useState(null);
    const [proof, setProof] = useState(false)
    const [taskDone, setTaskDone] = useState(false)
    const [wrongTypeofImage, setWrongTypeofImage] = useState(false);
    const [setField] = useState();

    async function saveonChain() {
        setLoadingState(true)
        try {
            await (window).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
            const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
            const network = await provider.getNetwork()
            const signer = provider.getSigner()
            const gacContract = new ethers.Contract(
                getConfigByChain(network.chainId)[0].contractProxyAddress,
                GrowAChild.abi,
                signer
            )

            const tx = await gacContract.completedTask(campaign?.campaignID)

            toast('Verification in progress !!', { icon: '👏' })
            const receipt = await provider
                .waitForTransaction(tx.hash, 1, 150000)
                .then(() => {
                    toast.success(`Task Completed Successfully !!`)
                    setProof(true)
                    setLoadingState(false)
                    setTaskDone(true)
                })
        } catch (e) {
            toast.error("Transaction Cancelled")
            setLoadingState(false)
        }
    }

    const withdraw = async () => {
        setLoadingState(true)
        try {
            await (window).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
            const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
            const network = await provider.getNetwork()
            const signer = provider.getSigner()
            const gacContract = new ethers.Contract(
                getConfigByChain(network.chainId)[0].contractProxyAddress,
                GrowAChild.abi,
                signer
            )
            const token = getConfigByChain(network.chainId)[0].cUSDAddress
            const tx = await gacContract.withdrawDailyFund(campaign.campaignID, token)
            toast('Processing Withdrawal !!', { icon: '👏' })
            const receipt = await provider
                .waitForTransaction(tx.hash, 1, 150000)
                .then(() => {
                    toast.success(`Withdaw Success !!`)
                    setLoadingState(false)
                }).catch((e) => {
                    toast.error("409:Something is not Right !!")
                })
        } catch (e) {
            toast.error('409:Something is not Right !!')
            console.log(`error is: ${e}`)
            setLoadingState(false)
        }
    }

    const uploadProof = async () => {
        // upload image to sanity with date and campaign id
        if (document.getElementById('taskDescription').value === '' || imagesAssets === null) {
            toast.error("Provide adequate proof")
        } else {
            const proofDoc = {
                _type: "task",
                campaignid: campaign?.campaignID,
                taskDescription: document.getElementById('taskDescription').value,
                dailytask: {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: imagesAssets?._id,
                    },
                },
                date: Date(),
            };
            try {
                const result = await client.create(proofDoc);
                // upload signal to blockchain telling that task for today completed
                saveonChain()

            } catch (e) {
                console.log("error is ", e)
            }
        }
    }

    async function onChange(e) {

        const files = e.target.files[0]
        if (files.type != 'image/png') {
            toast.error("Please upload png files only for clarity")
        } else {
            setLoadingState(true)
            if (files.size <= 1000000) {

                //setWrongTypeofImage(false);
                client.assets
                    .upload('image', files, { contentType: files.type, filename: files.name })
                    .then((document) => {
                        setImagesAssets(document);
                        setFile(true)
                        setLoadingState(false)
                    })
                    .catch((error) => {
                        console.log('Upload failed:', error.message);
                    });
            } else {
                toast.error('File size should be less than 1MB')
                setLoadingState(false)
            }
        }
    }
    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} />
            <section class="mt-5">
                <div class="container">
                    <div class="row d-flex">
                        <div class={classOne}>
                            <div class="img img-about align-self-stretch"
                                style={{ backgroundImage: `url(${campaign.campaignPic})`, width: "100%" }} />
                        </div>
                        <div class={classTwo}>
                            <h2 class="mb-1"> <a href={`/campaign-details?campId=${campaign.campaignID}`} class="campaignTitle">{campaign.name}</a> </h2>
                            <p class="mb-1"><h5 class="mb-0">Minimum Daily requirement:<span class="value"> ${campaign.dailyFundNeed} </span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Funds Received till date:<span class="value"> ${campaign.totalReceived} </span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Funds Utilised till date:<span class="value"> ${ethers.utils.formatUnits(campaign.totalUsed.toString(), 'ether')} </span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Total children benifited:<span class="value"> {campaign.noOfBeneficiaries}</span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Campaign Balance:<span class="value"> ${(Number(campaign.availableBalance) / 10 ** 18).toFixed(1)}</span></h5></p>
                            <hr />
                            <p> Upload your proof of work</p>
                            <input type="file"
                                name="Proof"
                                required
                                onChange={onChange}
                            />
                            {loadingState ? (
                                <p><PulseLoader size={10} />Loading...</p>
                            ) : (
                                <>
                                    <p>Show us what you did yesterday?</p>
                                    <p>**File size less than 1MB(only png files allowed)</p>
                                </>
                            )}

                            <textarea id="taskDescription" name="taskDescription" rows="4" cols="50">

                            </textarea>


                            {proof ? (

                                loadingState ? (
                                    <CircleLoader size={10} />
                                ) : (
                                    <button class="btn btn-primary py-2 mt-2" onClick={withdraw} >
                                        Withdraw Daily Fund
                                    </button>
                                )
                            ) : (
                                <button class="btn btn-primary py-2 mt-2 mr-4" disabled={!file} onClick={uploadProof}>
                                    Upload Proof
                                </button>
                            )}




                        </div>
                    </div>
                </div>
            </section >
        </div >
    )

}
export default ActiveCampaign