import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractInteractionService {

  CONTRACT_ADDRESS: string = "";
  ABI: any;
  signerWallet: ethers.Wallet;
  contract: ethers.Contract;

  constructor() {
    this.instantiateContractObject();
  }

  async instantiateContractObject(){
    this.contract = new ethers.Contract(this.CONTRACT_ADDRESS, this.ABI);
  }

  initUserWallet(wallet: ethers.Wallet){
    this.signerWallet = wallet;
  }

  async registerCard(cardNumber:string){
    let tx = await this.contract.connect(this.signerWallet).registerCard(cardNumber);
    tx.wait()
  }

  async withdrawFromCard(amount:number){
    let tx = await this.contract.connect(this.signerWallet).withdraw(ethers.utils.parseEther(amount.toString()));
    tx.wait()
  }

  async getBalance(){
    let tx = await this.contract.connect(this.signerWallet).getBalance(this.signerWallet.address);
    tx.wait()
  }

  async spendFunds(amount:string){
    let tx = await this.contract.connect(this.signerWallet).spend(amount);
    tx.wait()
  }
  
  async topup(amount:string){
    const tx = {
      to: this.contract.address,
      value: ethers.utils.parseEther(amount.toString()),
    }
    let executeTx = await this.signerWallet.sendTransaction(tx);
    executeTx.wait()
  }

}
