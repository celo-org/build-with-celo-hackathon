import { Component, OnInit , ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router,Params } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { Web3Service } from '../../../services/web3.service';
import { PoapService } from '../../../components/poap/poap.service';
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
  

  formSubscriptions: Subscription[]=[];

  
  web3ServiceConnect$: Subscription|undefined;
  userChain: string|null = 'celot';

  isOpenForClaim = false;
  isOwner = false;

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
     'whitelistAddresses': {
       'required': 'Required',
       'minLength': 'Minimum Length not reached',
        'maxLength': 'Maximum Length exceeded'
     }
   };

   placement = ToasterPlacement.TopCenter;

   datePickerConfig: any={
    format: 'YYYY/MM/DD HH:mm'
  };

  
  
  listOfMinters? : string[] = undefined;
  

  // supportedPurchaseCoins: {
  //   name: string,
  //   address: string,
  //   decimals: number
  // }[] ;
  
  currentChainId: number;

  

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  poapContract: ethers.Contract;

  // icons = { cilList, cilShieldAlt };

  public icons!: [string, string[]][];
  
  constructor(private titleService: Title, 
    public web3Service: Web3Service,
    private route: ActivatedRoute,
    private router: Router,
    private poapService: PoapService,
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
        
          const purchaseTokenAddress =await this.poapService.getCampaignPurchaseToken(environment.poapFactoryAddress, this.poapId!);

          const pToken = await this.web3Service.getERC20Details(purchaseTokenAddress);
          this.purchaseCoin = pToken?.symbol??this.nativeCoin?.symbol;
          this.purchaseCoinDecimals = pToken?.decimals??18;

          this.poap = await this.poapService.getPoapDetails(environment.poapFactoryAddress, this.poapId!);

          
          
          
          this.mainFormGroup = this.fb.group({
          
            amount: ['', [Validators.required,Validators.min(+this.campaign.minAllocationPerUser ),Validators.max(+this.campaign.maxAllocationPerUserTierTwo )]],
      
          })

          this.postponeSaleFormGroup = this.fb.group({
          
            startDate: [this.campaign.saleStartTime, [Validators.required,ValidateDateIsNotInPast]],
            endDate: [this.campaign.saleEndTime, [Validators.required,ValidateDateIsNotInPast, ValidateEndDateLaterThanStartDate]],
      
          })

          this.whitelistFormGroup = this.fb.group({
          
            enable: [this.campaign.useWhiteList, []],
            addresses: ['', [Validators.required, Validators.minLength(32), Validators.maxLength(42000) /*42 * 1000*/]],
      
          })


          this.validationMessages['amount'].min = `Amount must be at least ${ this.campaign.minAllocationPerUser} `
          this.validationMessages['amount'].max = `Amount must be at most ${this.campaign.maxAllocationPerUserTierTwo} `

          let now = Date.now();
          this.isOpenForClaim = this.campaign.saleStartTime.getTime() < now  && this.campaign.saleEndTime.getTime() > now && this.campaign.totalCoinReceived < this.campaign.hardCap ;
          
          // this.isOwner = this.web3Service.accounts.findIndex(f=>f==this.campaign?.owner??'none')>=0;
          this.isOwner = this.web3Service.accounts[0] == (this.campaign?.owner??'none' );

          const amount = parseFloat( this.campaign.totalCoinReceived ) ;
          const hardCap = parseFloat( this.campaign.hardCap );
          const softCap = parseFloat( this.campaign.softCap );

          this.saleProgress = 100 * Math.min( amount/softCap ,  amount/ hardCap)
          if(this.saleProgress==100){
            this.saleProgress = 100 * amount/ hardCap;
          }

          this.campaignContract = await this.poapService.getCampaignContractWithSigner(this.campaign!.campaignAddress);
            
          

          // await this.retrieveDescriptionFromIpfs(this.campaign.description);
        }
        
      })
      
      
    })

    


    this.titleService.setTitle('Participate in Campaign | ZSale');
    // this.icons = this.getIconsView('cib');
    
  } 

  toKebabCase(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
  }

}
