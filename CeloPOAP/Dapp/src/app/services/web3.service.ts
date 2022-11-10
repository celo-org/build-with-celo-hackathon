import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Web3ModalService} from '@mindsorg/web3modal-angular';
import { Web3Provider , JsonRpcSigner} from '@ethersproject/providers';
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import { BigNumber , constants, ethers, utils } from 'ethers';
import {BehaviorEventEmitter} from '../utils/BehaviorEventEmitter';
import { getSupportedChainById, getSupportedChainByChain } from '../models/supported-chains';
const ERC20AbiJSON = require('../../assets/ERC20.json');


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private _accountsObservable = new BehaviorSubject<string[]>([]);
  public readonly accounts$: Observable<string[]> = this._accountsObservable.asObservable();
  // ethers:  any;
  provider: any | undefined;
  ethersProvider: Web3Provider| undefined;
  ethersSigner: JsonRpcSigner| undefined;
  // accounts: string[] | undefined;
  // balance: string | undefined;

  web3Modal: Web3Modal ;

  @Output() onConnectChange: BehaviorEventEmitter<any> = new BehaviorEventEmitter(false);
  // @Output() onDisConnect: EventEmitter<void> = new EventEmitter();
  @Output() onNetworkChanged: EventEmitter<any> = new EventEmitter();

  infuraId = '8043bb2cf99347b1bfadfb233c5325c0';

  constructor() {

    const providerOptions = {
      coinbasewallet: {
        package: CoinbaseWalletSDK, 
        options: {
          appName: "Web 3 Modal Demo",
          infuraId: this.infuraId 
        }
      },
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: this.infuraId, // required change this with your own infura id
          description: 'Scan the qr code and sign in',
          qrcodeModalOptions: {
            mobileLinks: [
              'rainbow',
              'metamask',
              'argent',
              'trust',
              'imtoken',
              'pillar'
            ]
          },
          // rpc: {
          //   56: 'https://bsc-dataseed.binance.org',
          // },
          // network: 'binance'

          // rpc: { 
          //   1337: 'http://localhost:8545', 
          // }, 
          // chainId: 1337
        }
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          // Mikko's TESTNET api key
          key: "pk_test_391E26A3B43A3350",
          network: {
            rpcUrl: 'https://rpc-mainnet.maticvigil.com',
            chainId: 137
          }
        }
      },
      injected: {
        display: {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
          name: 'metamask',
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
    };

    this.web3Modal = new Web3Modal({
      // network: "mainnet", // optional change this with the net you want to use like rinkeby etc
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });


    const cachedProvider =   window.localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER');
    if (cachedProvider) {
      // console.log('Using Cached web3modal')      
      setTimeout(()=>{
        this.connect().then(()=>{
        
        })
      }, 200)
    }
  }

  get accounts(){
    return this._accountsObservable.getValue();
  }

  get signer(){
    return this.ethersSigner;
  }

  async connect() {
    this.provider = await this.web3Modal.connect(); // set provider
    
    if (this.provider) {
      this.ethersProvider = new Web3Provider(this.provider);
      this.ethersSigner = this.ethersProvider.getSigner();  
      
      this.createProviderHooks(this.provider);

      this._accountsObservable.next(await this.ethersProvider.listAccounts());
      this.onConnectChange.emit(true);
    } // create web3 instance
    
  }

  async getCurrentChainId(){
    const n = await this.ethersProvider?.getNetwork();
    return n?.chainId??83;
  }

  async getCurrentChain(){
    const chainId = await this.getCurrentChainId();
    return getSupportedChainById(chainId);
  }

  // async accountInfo(account: any[]){
  //   const initialvalue = await this.web3js.eth.getBalance(account);
  //   this.balance = this.web3js.utils.fromWei(initialvalue , 'ether');
  //   return this.balance;
  // }

  createProviderHooks(provider: any) {
    // Subscribe to accounts change
    provider.on('accountsChanged', async (accounts: string[]) => {
      this._accountsObservable.next(await this.ethersProvider!.listAccounts());
      this.onConnectChange.emit(true);  
      
    });

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId: number) => {
      // location.reload();
      location.href = '/campaigns';
      //this.onConnectChange.emit(provider);
      this.onNetworkChanged.emit(chainId);
    });

    // Subscribe to provider connection
    provider.on('connect', (info: { chainId: number }) => {
      console.log(info);
      this.onConnectChange.emit(true);
      // location.reload();
    });

    // Subscribe to provider disconnection
    provider.on('disconnect', (error: { code: number; message: string }) => {
      console.log(error);
      console.log('disconnect')
      this.onConnectChange.emit(false);
    });

    // this.ethersProvider!.on("block", async (blockNum: number)=> {
    //   console.log("On Blocked - Block ",blockNum + ": " +new Date(Date.now()))
    //   const timestamp = (await this.ethersProvider!.getBlock(blockNum)).timestamp;

    //       console.log('Block timestamp: ', timestamp, ', date stamp: ', new Date().getTime()/1000 )
    // })
  }


  /**
   * Disconnect wallet button pressed.
   */
  async disconnect() {

    console.log("Killing the wallet connection", this.provider);

    // TODO: Which providers have close method?
    if(this.provider.close) {
      await this.provider.close();

      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.      
      await this.web3Modal.clearCachedProvider();
      
      // this.web3modalService.close();
      this.provider = null;
    }

    this._accountsObservable.next([]);
    this.onConnectChange.emit(false);
  }

  async switchNetwork(networkInfo: {
    chainId: number;
    chainName: string;
    nativeCurrency: {
        name: string,
        symbol: string,
        decimals: number,
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
  }  ) {

    await this._switchNetwork(networkInfo);
  };

  async switchNetworkByChainId(newChain:  number ) {
    const c = getSupportedChainById(newChain);
    let networkInfo = {
      chainId: c?.chainId??83,
      chainName: c?.name??'',
      rpcUrls: c?.rpc??[],
      nativeCurrency: c?.nativeCurrency,
      blockExplorerUrls: c?.blockExplorerUrls
    };   
    await this._switchNetwork(networkInfo);
  };

  async switchNetworkByChainShortName(newChain:  string) {
    const c = getSupportedChainByChain(newChain.toUpperCase());
    
    let networkInfo = {
      chainId: c?.chainId??97,
      chainName: c?.name??'',
      nativeCurrency: c?.nativeCurrency,
      rpcUrls: c?.rpc??[],
      blockExplorerUrls: c?.blockExplorerUrls
    };   
    
    await this._switchNetwork(networkInfo);
  };

  private async  _switchNetwork(networkInfo:  {
    chainId: number;
    chainName: string;
    nativeCurrency: {
        name: string,
        symbol: string,
        decimals: number,
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
  } ) {

    
    
    if(this.ethersProvider){
      try {
        
        //@ts-ignore
        await this.ethersProvider?.provider?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(networkInfo.chainId) }],
        });
        
        
      } catch (switchError: any) {
        console.error('web3provider not added to metamask::', switchError);
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            //@ts-ignore
            await this.ethersProvider.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: utils.hexValue(networkInfo.chainId),
                  nativeCurrency: networkInfo.nativeCurrency,
                  chainName: networkInfo.chainName, //"Polygon",
                  rpcUrls: networkInfo.rpcUrls, // ["https://polygon-rpc.com/"],
                  blockExplorerUrls: networkInfo.blockExplorerUrls // ["https://polygonscan.com/"],
                },
              ],
            });
          } catch (addError) {
            console.error('Error adding network: ', addError)
            throw addError;
          }
        }
      }
    }else{
      console.info('Web3provider not instantiated::');
    }

  };

  public async getFeeData(){
    return await this.ethersProvider?.getFeeData();
  }


  public getERC20Contract (address: string) {
    
    const cContract = new ethers.Contract(address, ERC20AbiJSON.abi, this.ethersProvider);
    return cContract;
  }

  public getERC20ContractWithSigner (address: string) {
    
    const cContract = new ethers.Contract(address, ERC20AbiJSON.abi, this.ethersSigner);
    return cContract;
  }

  public async getERC20Details(address: string){
    try{
      let tokenInfo = await this.getERC20Contract(address);
      // @ts-ignore
      let result = { 
        name: await tokenInfo.name(),
        symbol: await tokenInfo.symbol(), 
        decimals: await tokenInfo.decimals(), 
        totalSupply: await tokenInfo.totalSupply() 
      }
      

      return result;
    }catch(e){
      return null;
    }
  }


  public async getERC20ApprovalAllowance(tokenAddressOrContract: string|ethers.Contract, approvedAddress: string){
    if(typeof tokenAddressOrContract === 'string'){
      tokenAddressOrContract = await this.getERC20Contract(tokenAddressOrContract)
    }
    const allowance = await tokenAddressOrContract.allowance(this.accounts[0], approvedAddress);
    return allowance;
  }


  public async approveERC20Contract(addressOrContract: string|ethers.Contract, addressToApprove: string, amount: any){
    if(typeof addressOrContract === 'string'){
      addressOrContract = await this.getERC20ContractWithSigner(addressOrContract)
    }

    const currAllowance = await this.getERC20ApprovalAllowance(addressOrContract,addressToApprove);
    if(currAllowance.gte(BigNumber.from(amount))){
      return 'succeeded';
    }else{
      let allowanceTx = await addressOrContract.approve(addressToApprove, amount ); // Approve 1000 times the fee
      let txResult = await allowanceTx.wait();
      return txResult.status == 1 ? 'succeeded' : 'failed';
    }
    
  }

}


