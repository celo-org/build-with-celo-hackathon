import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Web3Service } from '../../../app/services/web3.service';
import { Poap } from '../../../app/models/Poap';
import { PoapFactoryService } from './poap-factory.service';
const PoapAbi = require('../../../assets/Poap.json');
import {utils} from 'ethers';
import {getDateFromEther, formatEtherDateToJs} from '../../../app/utils/date';

@Injectable({
  providedIn: 'root'
})
export class PoapService {

  constructor(public web3Service: Web3Service,
    public poapFactoryService: PoapFactoryService) { 
    
  }

  public getPoapContract (address: string) {
    
    const cContract = new ethers.Contract(address, PoapAbi, this.web3Service.ethersProvider);
    return cContract;
  }

  public getPoapContractWithSigner (address: string) {
    
    const cContract = new ethers.Contract(address, PoapAbi, this.web3Service.ethersSigner);
    return cContract;
  }

  public async getPoapDetails (factoryAddress: string, eventId: string): Promise<Poap> { //decimals is nativecoin decimals
    const poapFactoryContract = this.poapFactoryService.getPoapFactoryContract(factoryAddress); 
    const [success,evtAddress] = await poapFactoryContract.tryGetEventByKey(eventId);

    const poapContract = this.getPoapContract(evtAddress);

    
    let {eventName, desc, logo, website,maxCapacity,date, poapsMinted, orgName,eventOwner} = await poapContract.eventDetails();

    const owner = await poapContract.owner();
    
    

    return {
      eventName, 
      desc, 
      logo, 
      website,
      maxCapacity, 
      poapsMinted, 
      orgName,
      eventOwner,
      date: getDateFromEther(date)
    };

  }

  
}
