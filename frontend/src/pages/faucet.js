import React, { useState } from 'react';
import BreadCrumb from '../components/breadcrumb';
import { ethers } from 'ethers';
import { getConfigByChain } from '../config';
import { useAccount, useNetwork } from 'wagmi';
import toast, { Toaster } from 'react-hot-toast'
import faucet from '../artifacts/contracts/faucet.sol/faucet.json'

const Faucet = () => {

    const { chain } = useNetwork()
    const { address } = useAccount()

    async function getCoins(e) {
        e.preventDefault();
        window.ethereum.send("eth_requestAccounts"); // opens up metamask extension and connects Web2 to Web3
        const provider = new ethers.providers.Web3Provider(window.ethereum); //create provider
        //const wallet = new ethers.Wallet("process.env.api", provider) //use it autosign
        const signer = provider.getSigner(); // get signer
        const network = await provider.getNetwork();
        console.log("token", getConfigByChain(network.chainId)[0]);

        const contract = new ethers.Contract(
            getConfigByChain(network.chainId)[0].faucet,
            faucet.abi,
            signer
        );
        const etherAmount = ethers.utils.parseUnits(
            '500',
            "ether"
        );
        const tx = await contract.transferERC20(getConfigByChain(network.chainId)[0].cUSDAddress, address, etherAmount);
        toast("Transfer process Ongoing...", { icon: "👏" });
        const receipt = await provider
            .waitForTransaction(tx.hash, 1, 150000)
            .then(() => {
                toast.success("cUSD Transfer Completed.");
            });
    }

    return (
        <div>
            <Toaster position='top-right' reverseOrder='false' />
            <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Get test cUSD coins" pageURL="faucet" />
            <section class="ftco-section contact-section ftco-degree-bg">
                <div class="container">
                    <div class="row d-flex mb-5 contact-info">
                        <div class="col-md-12 mb-4">
                            <h2 class="h4">Only for Alfajores Testnet</h2>
                        </div>

                    </div>
                    <div class="row block-9">
                        <div class="col-md-6 pr-md-5">
                            <h4 class="mb-4">Get test cUSD coins for testing this app</h4>
                            <form onSubmit={getCoins}>
                                <span>Contract address of cUSD</span>
                                <div class="form-group">
                                    <input type="text" value={getConfigByChain(chain?.id)[0].cUSDAddress} class="form-control" />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" value={address}
                                        placeholder="Your Wallet Address" />
                                </div>
                                <span>Amount (in cUSD)</span>
                                <div class="form-group">
                                    <input type="number" value={500} class="form-control" placeholder="Amount of cUSD" />
                                </div>

                                <div class="form-group">
                                    <input type="submit" value="Get Test cUSD" class="btn btn-primary py-3 px-5" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )

}
export default Faucet