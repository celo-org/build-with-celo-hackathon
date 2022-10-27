import { Component, OnInit , ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router,Params } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { Web3Service } from '../../../services/web3.service';
import { PoapService } from '../../../components/poap/poap.service';
import { PoapNFTService } from '../../../components/poap-market/poap-nft.service';
import { Poap } from '../../../models/poap';
import contractList from '../../../models/contract-list';
import {getDateFromEther, formatEtherDateToJs, formatDateToJsString} from '../../../utils/date';
import {formatPercent} from '../../../utils/numbers'
import {Contract, ethers, utils} from 'ethers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { cilList, cilShieldAlt } from '@coreui/icons';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { AppToastComponent } from '../../../views/notifications/toasters/toast-simple/toast.component';
import { NgxSpinnerService } from "ngx-spinner";

import {sendEmail} from '../../../utils/mailer';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Web3Storage } from 'web3.storage';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet,  freeSet } from '@coreui/icons';




@Component({
  selector: 'app-poap-detail',
  templateUrl: './poap-detail.component.html',
  styleUrls: ['./poap-detail.component.scss']
})
export class PoapDetailComponent implements OnInit {
  poapId: string|undefined;
  poap: Poap|undefined;
  
  mainFormGroup!: FormGroup;
  emailListFormGroup!: FormGroup;	
  mintPoapFormGroup!: FormGroup;	
  listPoapForSaleFormGroup!: FormGroup;  	
  

  formSubscriptions: Subscription[]=[];

  
  web3ServiceConnect$: Subscription|undefined;
  userChain: string|null = 'celot';

  
  isOwner = false;
  isPoapOwner=false;
  isOwnerPOAPListedOnMarket=false;

  now = Date.now();

  nativeCoin: {
    name: string;
    symbol: string;
    decimals: number;
  }| undefined;


  validationMessages : {
    [index: string]: any
   } = {
    'amount': {
      'required'  :   'Amount is Required.',
      'min': 'Amount must be at least 0 ',
      'max': 'Amount must be at most 100 '
    },
    'startDate' : {
       'required'  :   'Start Date is Required.',
       'past': 'Start Date can not be in the past'
     },
     'endDate' : {
       'required'  :   'End Date is Required.',
       'past': 'End Date can not be in the past',
       //'less': 'End date cannot be less than Start date'
       // 'pattern'   :   'Contact No. should only contain Numbers '
     },
     'emaillistAddresses': {
       'required': 'Required',
       'minlength': 'Minimum Length not reached(3)',
        'maxlength': 'Maximum Length exceeded'
     },
	 'mintEventCode': {
       'required': 'Required',
       'minlength': 'Minimum Length(6) not reached',
        'maxlength': 'Maximum Length(6) exceeded'
     },
     'salePrice': {
      'required'  :   'Sale Price is Required.',
      'min': 'Sale Price must be at least 0.1',
      'max': 'Sale Price must be at most 1,000,000,000 '
    }
   };

   placement = ToasterPlacement.TopCenter;

   datePickerConfig: any={
    format: 'YYYY/MM/DD HH:mm'
  };

  
  
  listOfMinters? : string[] = undefined;
  poapOwners?: {owner: string, tokenId: string}[]=undefined;
  

  // supportedPurchaseCoins: {
  //   name: string,
  //   address: string,
  //   decimals: number
  // }[] ;
  
  currentChainId: number;
  
  emaiListModalVisible = false;
  mintPoapModalVisible = false;
  listPoapOnMarketModalVisible=false;

  tokenId = undefined;

  

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  poapContract: ethers.Contract;

  // icons = { cilList, cilShieldAlt };

  public icons!: [string, string[]][];
  
  constructor(private titleService: Title, 
    public web3Service: Web3Service,
    private route: ActivatedRoute,
    private router: Router,
    private poapService: PoapService,
    private poapNFTService:PoapNFTService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient, public iconSet: IconSetService) {
      iconSet.icons = { ...freeSet, ...brandSet };
    }

  ngOnInit(): void {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;


    this.route.params.subscribe((params: Params) => {
      
      this.userChain = params['chain'];
      this.poapId = params['poapId']!;
      
      this.web3ServiceConnect$ = this.web3Service.onConnectChange.subscribe(async (connected: boolean)=>{
        if(connected){
          if(this.userChain ){
            await this.web3Service.switchNetworkByChainShortName(this.userChain); 
          }

          this.currentChainId = await this.web3Service.getCurrentChainId();
          this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
        
          
          this.poap = await this.poapService.getPoapDetails(environment.poapFactoryAddress, this.poapId!);
          
          this.mainFormGroup = this.fb.group({
          
            amount: ['', [Validators.required]],
      
          })
		  
    		  this.emailListFormGroup = this.fb.group({
            addresses: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(42000) /*42 * 1000*/]],
    			  mintEventCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6) ]],
          
          })

    		  this.mintPoapFormGroup = this.fb.group({
              
                
            mintEventCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6) ]],
      
          })

          this.listPoapForSaleFormGroup = this.fb.group({
          
            salePrice: ['', [Validators.required, Validators.min(0.1), Validators.max(1000000000)]],
      
          })

      
          let now = Date.now();
          
          
          // this.isOwner = this.web3Service.accounts.findIndex(f=>f==this.campaign?.owner??'none')>=0;
          this.isOwner = this.web3Service.accounts[0] == (this.poap?.eventOwner??'none' );

          this.poapContract = await this.poapService.getPoapContract(this.poap!.address);
            
          this.isPoapOwner = await this.checkIfAddressIsPoapOwner(this.web3Service.accounts[0] )
    		  
    		  this.poapOwners = await this.getAllPOAPOwners();


          if(this.isPoapOwner){
            this.tokenId = this.poapOwners.find(f=>f.owner==this.web3Service.accounts[0])?.tokenId??0;
            this.isOwnerPOAPListedOnMarket = await this.poapContract.isListed(this.tokenId);
          }
          

          // await this.retrieveDescriptionFromIpfs(this.campaign.description);
        }
        
      })
      
      
    })

    


    this.titleService.setTitle('View POAP | Celo POAP');
    // this.icons = this.getIconsView('cib');
    
	//sendEmail(`Claim your POAP for `, 'xcelsis02@gmail.com', 
	//	`<html><h2>CELO POAP</h2> <b>Thanks for attending <strong><a href="https://localhost:4200/poaps/m/${this.poapId}">Claim Your POAP now</a> </strong><br></br></html>` );
        
	
  } 

  
  ngOnDestroy(){
    this.web3ServiceConnect$!.unsubscribe();
    // this.formSubscriptions.forEach( sub=>{
    //   sub.unsubscribe();
    // });
  }
  
  
  async checkIfAddressIsPoapOwner(address: string){
	  
	  let currentUserBalance = await this.poapContract.balanceOf(address);
		return currentUserBalance > 0;
		
  }
  
  
  async getAllPOAPOwners(){
	  
	  let currentUserBalance = await this.poapContract.balanceOf(this.web3Service.accounts[0]);
		
		let supply = await this.poapContract.totalSupply();
		
	  let owners = [];
		for(let i=1;i<= supply ; i++){
  		// this will check each nft owner
  		// i is the id of each nft.

  		// this will return the owner address
  		let owner = await this.poapContract.ownerOf(i);
  		owners.push({
  			owner: owner,
  			tokenId: i
  		});
  		// if owner == msg.sender then we know he owns this token id

		}
		
		return owners;
		
  }
  
  
  openEmailModal(){
    this.emaiListModalVisible=true;
  }
  
  
  closeEmailModal(){
    this.emaiListModalVisible=false;
  }
  
  
  async emailList(){
    this.spinner.show();
   
		const code = this.emailListFormGroup.get('mintEventCode')!.value;
      const addresses = this.emailListFormGroup.get('addresses')!.value.split(/[, \n]+/).map((m: string) => m.trim());
      
      
      var uniqueAddresses = addresses.filter((value: any, index: number, self: any) => {
        return self.indexOf(value) === index;
      });
            
      try{

        await sendEmail(`Claim your POAP for ${this.poap.eventName}`, uniqueAddresses, 
		`<html><h2>CELO POAP</h2> <b>Thanks for attending ${this.poap.eventName} </b> <br/> <strong><a href="http://localhost:4200/poaps/d/${this.poapId}"> Claim Your POAP now</a> </strong><br><strong>Use Event Code ${code} </strong></br></html>` );
        
		this.spinner.hide();
		this.emaiListModalVisible=false;
		this.showToast('Success!','Email Sent');
      }catch(eerr) {
        console.error(eerr);
        this.spinner.hide();
        this.emaiListModalVisible=false;
        this.showToast('Oops!','Email Sending Failed', 'danger');
        return;
      }

      
  }

  toKebabCase(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
  }

  async enableDisable(status: boolean) {
	    try{
			this.spinner.show();
			const poapContractSigner = await this.poapService.getPoapContractWithSigner(this.poap!.address);
			let tx = await poapContractSigner.allowMint(status , {        
				gasLimit: 18000000
			} );

			const txResult = await tx.wait();
			this.poap.isOpenForClaim = status;
			this.showToast('Success!','Your Event has been created succesfully!');
	    }catch(err){
		  this.showToast('Oops!','Something went wrong!', 'danger');
		  console.log('Error Creating: ', err);
		}
		finally{
		  this.spinner.hide();
		}
    
  }


  
  
  openListFormModal(){
    this.listPoapOnMarketModalVisible=true;
  }
  
  
  closeListFormModal(){
    this.listPoapOnMarketModalVisible=false;
  }

  async listPoap(){
    try{
      this.spinner.show();
      const price =   utils.formatUnits( utils.parseEther(this.listPoapForSaleFormGroup.get('salePrice')!.value.toString()), 'wei');
      console.log('Price s:', price)  

      const poapContractSigner =  await this.poapService.getPoapContractWithSigner(this.poap!.address);

      //approve token for contract
      // let transaction = await contract.setApprovalForAll(nftMarketAddress, true);
      // await transaction.wait();

      let transaction = await poapContractSigner.setApprovalForAll(environment.poapMarketAddress, true);
      await transaction.wait();

      
      let tx = await poapContractSigner.listPOAPOnMarketplace(this.tokenId, price, {        
        gasLimit: 18000000
      } );

      const txResult = await tx.wait();
      
      this.isOwnerPOAPListedOnMarket = true;
      this.showToast('Success!','Your POAP has been listed succesfully!');
      this.listPoapOnMarketModalVisible=false;
         
      this.spinner.hide();
    } catch(err){
      this.showToast('Oops!','Something went wrong!', 'danger');
      console.log('Error Creating: ', err);
    }
    finally{
      this.spinner.hide();
      this.listPoapOnMarketModalVisible=false;
    }
    
  }


  async delistOnMarket(){
    if(confirm('Are you sure you want to delist?')){
      try{
        this.spinner.show();
        
        const marketContractSigner =  await this.poapNFTService.getMarketContractWithSigner(environment.poapMarketAddress);

        let tx = await marketContractSigner.cancelListing(this.poap!.address, this.tokenId,  {        
          gasLimit: 10000000
        } );

        const txResult = await tx.wait();
        
        this.isOwnerPOAPListedOnMarket = false;
        this.showToast('Success!','Your POAP has been delisted succesfully!');
        
           
        this.spinner.hide();
      } catch(err){
        this.showToast('Oops!','Something went wrong!', 'danger');
        console.log('Error delisting: ', err);
      }
      finally{
        this.spinner.hide();
        
      }
    }
  }
  

  
  openMintFormModal(){
    this.mintPoapModalVisible=true;
  }
  
  
  closeMintFormModal(){
    this.mintPoapModalVisible=false;
  }
  
  
  async mintPoap(){
	   try{
			this.spinner.show();
			const code = this.mintPoapFormGroup.get('mintEventCode')!.value;
		   //~ if(code != this.poap.eventCode){
			   //~ this.mintPoapModalVisible=false;
			   //~ this.showToast('Oops!','Your Event Code was wrong!', 'danger');
			   //~ this.spinner.hide();
			   //~ return;			   
		   //~ }
		   
		   
		   const poapContractSigner = await this.poapService.getPoapContractWithSigner(this.poap!.address);
			let tx = await poapContractSigner.mintPOAP(code , {        
				gasLimit: 18000000
			} );

			const txResult = await tx.wait();
			
			this.isPoapOwner = true;
			this.showToast('Success!','Your POAP has been minted succesfully!');
			this.mintPoapModalVisible=false;
			   
			this.spinner.hide();
	    }catch(err){
		  this.showToast('Oops!','Something went wrong!', 'danger');
		  console.log('Error Creating: ', err);
		}
		finally{
		  this.spinner.hide();
      this.mintPoapModalVisible=false;
		}
	  
  }
  
  
  
  
  /*Colors 
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  dark = 'dark',
  light = 'light',*/
  showToast(title: string, body: string, color='info') {
    const options = {
      title,
      delay: 5000,
      placement: this.placement,
      color,
      autohide: true,
      body
    }
    const componentRef = this.toaster.addToast(AppToastComponent, { ...options });
  }

  addToast() {
    const options = {
      title: `Successful`,
      delay: 5000,
      placement: this.placement,
      color: 'info',
      autohide: true,
      body: 'Token Minted Successfuly!'
    }
    const componentRef = this.toaster.addToast(AppToastComponent, { ...options });
  }
  
  
  objectKeys(o: any){
    if(!o){
      return []
    }
    return Object.keys(o)
  }

}
