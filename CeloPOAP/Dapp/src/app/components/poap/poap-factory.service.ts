import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Web3Service } from '../../../app/services/web3.service';
const PoapFactoryAbi = require('../../../assets/PoapFactory.json');


@Injectable({
  providedIn: 'root'
})
export class PoapFactoryService {

  constructor(public web3Service: Web3Service) { 
    
  }

  public getPoapFactoryContract (address: string) {
    
    const cContract = new ethers.Contract(address, PoapFactoryAbi, this.web3Service.ethersProvider);
    return cContract;
  }

  public getPoapFactoryContractWithSigner (address: string) {
    
    const cContract = new ethers.Contract(address, PoapFactoryAbi, this.web3Service.ethersSigner);
    return cContract;
  }
}
