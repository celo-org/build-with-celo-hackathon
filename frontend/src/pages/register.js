import React, { useState } from 'react';
import BreadCrumb from '../components/breadcrumb';
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import RingLoader from "react-spinners/RingLoader";

const Register = () => {

    const [loadingState, setLoadingState] = useState(false)
    const [formInput, updateFormInput] = useState({
        name: '',
        intro: '',
        regNo: '',
        govtName: '',
        since: 0,
        addess: '',
        country: '',
    });

    async function saveNGO() {
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

        const tx = await gacContract.registerNGO(
            formInput.name, formInput.intro, formInput.regNo, formInput.govtName,
            formInput.since, formInput.addess, formInput.country
        )
        toast('Verification in progress !!', { icon: '👏' })
        const receipt = await provider
            .waitForTransaction(tx.hash, 1, 150000)
            .then(() => {
                toast.success(`NGO Registered Successfully !!`)
                setLoadingState(false)
            })
    }

    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Register Your Organization" pageURL="register" />
            <Toaster position='top-center' reverseOrder={false} />
            <section class="ftco-section contact-section ftco-degree-bg">
                <div class="container block-9">
                    <h4 class="mb-4">Let us know about your organisation </h4><h6>(all fields required)</h6>
                    <form id="form-create-item">
                        <div class="form-group">
                            <input onChange={(e) =>
                                updateFormInput((formInput) => ({
                                    ...formInput,
                                    name: (e.target.value),
                                }))
                            } type="text" class="form-control" placeholder="Name of Your NGO/Organization" required />
                        </div>
                        <div class="form-group">
                            <textarea onChange={(e) =>
                                updateFormInput((formInput) => ({
                                    ...formInput,
                                    intro: (e.target.value),
                                }))
                            } name="" id="" cols="30" rows="7" class="form-control" placeholder="Introduce your organization" required></textarea>
                        </div>
                        <div class="form-group">
                            <input onChange={(e) =>
                                updateFormInput((formInput) => ({
                                    ...formInput,
                                    regNo: (e.target.value),
                                }))
                            } type="text" class="form-control" placeholder="Enter your Government Registration Number" required />
                        </div>
                        <div class="form-group">
                            <input onChange={(e) =>
                                updateFormInput((formInput) => ({
                                    ...formInput,
                                    govtName: (e.target.value),
                                }))
                            } type="text" class="form-control" placeholder="Name of the Government under whom you are registered" required />
                        </div>
                        <div class="form-group">
                            <input onChange={(e) =>
                                updateFormInput((formInput) => ({
                                    ...formInput,
                                    since: Number(e.target.value),
                                }))
                            } type="text" class="form-control" placeholder="Registration Valid from (yyyy)" required />
                        </div>
                        <div class="form-group">
                            <input onChange={(e) =>
                                updateFormInput((formInput) => ({
                                    ...formInput,
                                    addess: (e.target.value),
                                }))
                            } type="text" class="form-control" placeholder="Registered Address" required />
                        </div>
                        <div class="form-group">
                            <input onChange={(e) =>
                                updateFormInput((formInput) => ({
                                    ...formInput,
                                    country: (e.target.value),
                                }))
                            } type="text" class="form-control" placeholder="Country of Registration" required />
                        </div>


                        <div class="form-group">
                            {!loadingState ? (
                                <input onClick={saveNGO} type="button" value="Register" class="btn btn-primary py-3 px-5" />
                            ) : (
                                <div><RingLoader color='#000000' loading={loadingState} size={50} /> Uploading Please Wait...</div>
                            )}

                        </div>
                    </form>
                </div>
            </section>
        </div>

    )

}
export default Register