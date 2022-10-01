import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';


const NavBar = () => {

    const { address } = useAccount()


    return (
        <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div class="container">
                <a class="navbar-brand" href="/">GrowAChild</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="oi oi-menu"></span> Menu
                </button>
                <div class="collapse navbar-collapse" id="ftco-nav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
                        <li class="nav-item"><a href="campaigns" class="nav-link">Campaigns</a></li>
                        <li class="nav-item"><a href="gallery" class="nav-link">Gallery</a></li>
                        <li class="nav-item"><a href="contactUs" class="nav-link">Contact</a></li>
                        {address && (
                            <li class="nav-item"><a href="dashboard" class="nav-link">Dashboard</a></li>
                        )}
                        <li class="nav-item">
                            <a >
                                <ConnectButton showBalance={false} chainStatus="icon" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}
export default NavBar