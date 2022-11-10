import { Component, OnInit , ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router,Params } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { Web3Service } from '../../../services/web3.service';


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
import { Apollo, gql } from 'apollo-angular'

@Component({
  selector: 'poap-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  poapNft = undefined;
  isOwner=false;
  seller: string = '';



  @ViewChild(ToasterComponent) toaster!: ToasterComponent;
  placement = ToasterPlacement.TopCenter;

  nftContract: ethers.Contract;

  
  public icons!: [string, string[]][];
  

  constructor(private titleService: Title, 
    public web3Service: Web3Service,
    private route: ActivatedRoute,
    private router: Router,
    
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient, public iconSet: IconSetService , private apollo: Apollo) {

    iconSet.icons = { ...freeSet, ...brandSet };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      
      // this.userChain = params['chain'];
      // this.poapId = params['poapId']!;
      
      // this.web3ServiceConnect$ = this.web3Service.onConnectChange.subscribe(async (connected: boolean)=>{
      //   if(connected){
      //     if(this.userChain ){
      //       await this.web3Service.switchNetworkByChainShortName(this.userChain); 
      //     }

      //     this.currentChainId = await this.web3Service.getCurrentChainId();
      //     this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
        
                    
          
      //     // this.isOwner = this.web3Service.accounts.findIndex(f=>f==this.campaign?.owner??'none')>=0;
      //     this.isOwner = this.web3Service.accounts[0] == (this.poap?.eventOwner??'none' );

      //     this.poapContract = await this.poapService.getPoapContract(this.poap!.address);
            
      //     this.isPoapOwner = await this.checkIfAddressIsPoapOwner(this.web3Service.accounts[0] )
          
      //     this.poapOwners = await this.getAllPOAPOwners();


      //     if(this.isPoapOwner){
      //       this.tokenId = this.poapOwners.find(f=>f.owner==this.web3Service.accounts[0])?.tokenId??0;
      //       this.isOwnerPOAPListedOnMarket = await this.poapContract.isListed(this.tokenId);
      //     }
          

      //     // await this.retrieveDescriptionFromIpfs(this.campaign.description);
      //   }
        
      // })

      this.apollo
      .watchQuery({
        query: gql`
          {
            listingEntities {
              id
              nftAddress
              tokenId
              price
              seller
              buyer
            }
          }
        `
      //   ListingsQuery {
      //   listingEntities {
      //     id
      //     nftAddress
      //     tokenId
      //     price
      //     seller
      //     buyer
      //   }
      // }
      })
      .valueChanges.subscribe((response: any) => {
        console.log('response: ', response);

        const listingEntities = response.data.listingEntities;

        // Filter out active listings i.e. ones which haven't been sold yet
        const activeListings = listingEntities.filter((l) => l.buyer === null);

        // this.rates = result.data?.rates
        // this.loading = result.loading
        // this.error = result.error
      })
      
      
    })

    


    this.titleService.setTitle('View NFT | Celo POAP');
  }

}
