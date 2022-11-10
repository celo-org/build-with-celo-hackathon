import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Web3Service } from '../../../app/services/web3.service';
import { Poap } from '../../../app/models/poap';

const PoapAbi = require('../../../assets/Poap.json');
const PoapMarketAbi = require('../../../assets/PoapMarket.json');
const NFTAbi = require('../../../assets/NFT.json');
import {utils} from 'ethers';
import {getDateFromEther, formatEtherDateToJs} from '../../../app/utils/date';

@Injectable({
  providedIn: 'root'
})
export class PoapNFTService {

  constructor(public web3Service: Web3Service) { 
    
  }

  public getMarketContract (address: string) {
    
    const cContract = new ethers.Contract(address, PoapMarketAbi, this.web3Service.ethersProvider);
    return cContract;
  }

  public getMarketContractWithSigner (address: string) {
    
    const cContract = new ethers.Contract(address, PoapMarketAbi, this.web3Service.ethersSigner);
    return cContract;
  }

  public getNFTContract (address: string) {
    
    const cContract = new ethers.Contract(address, NFTAbi, this.web3Service.ethersProvider);
    return cContract;
  }

  public getNFTContractWithSigner (address: string) {
    
    const cContract = new ethers.Contract(address, NFTAbi, this.web3Service.ethersSigner);
    return cContract;
  }



  public async getNFTDetails (address: string, tokenId: string){ //decimals is nativecoin decimals
    const nftContract = this.getNFTContract(address); 
    let tokenURI = await nftContract.tokenURI(tokenId);
    
    let ba64 = tokenURI.substring("data:application/json;base64,".length)
    
    const metadataJSON = JSON.parse(atob(ba64).replace(", ]","]"));

    // // If it's an IPFS URI, replace it with an HTTP Gateway link
    // tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");

    // // Resolve the Token URI
    // const metadata = await fetch(tokenURI);
    // const metadataJSON = await metadata.json();

    
    // Extract image URI from the metadata
    let image = metadataJSON.image;
    // If it's an IPFS URI, replace it with an HTTP Gateway link
    image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
    

    return {
      address,
      tokenId,
      name: metadataJSON.name, 
      imageUrl: image,
      
    };

  }

  
}
