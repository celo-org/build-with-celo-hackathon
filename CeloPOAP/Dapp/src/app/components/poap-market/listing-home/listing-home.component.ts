
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
  selector: 'app-listing-home',
  templateUrl: './listing-home.component.html',
  styleUrls: ['./listing-home.component.scss']
})
export class ListingHomeComponent implements OnInit {




  @ViewChild(ToasterComponent) toaster!: ToasterComponent;
  placement = ToasterPlacement.TopCenter;

  activeListings: any[]  = undefined;
  loadingListings = false;
  
  public icons!: [string, string[]][];

  userChain: any ;
  web3ServiceConnect$: Subscription|undefined;
  currentChainId;
  nativeCoin;

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
      
      this.userChain = params['chain'];
      
      
      this.web3ServiceConnect$ = this.web3Service.onConnectChange.subscribe(async (connected: boolean)=>{
        if(connected){
          // if(this.userChain ){
          //   await this.web3Service.switchNetworkByChainShortName(this.userChain); 
          // }

          this.currentChainId = await this.web3Service.getCurrentChainId();
          this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
        
                    
          
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
            })
            .valueChanges.subscribe((response: any) => {
              
              this.loadingListings = response.loading;
              const listingEntities = response.data.listingEntities;

              // Filter out active listings i.e. ones which haven't been sold yet
              this.activeListings = listingEntities.filter((l) => l.buyer === null) ;

              // this.rates = result.data?.rates
              
              // this.error = result.error
            })
            
            
          
        }
        
      });

    });


    this.titleService.setTitle('View NFT | Celo POAP');
  }

  ngOnDestroy(){
    this.web3ServiceConnect$!.unsubscribe();
    // this.formSubscriptions.forEach( sub=>{
    //   sub.unsubscribe();
    // });
  }

}

