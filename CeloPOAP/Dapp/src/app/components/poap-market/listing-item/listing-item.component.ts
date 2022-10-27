import { Component, OnInit, Input } from '@angular/core';
import { Web3Service } from '../../../services/web3.service';
import { PoapNFTService } from '../../../components/poap-market/poap-nft.service';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet,  freeSet } from '@coreui/icons';
import { firstValueFrom, Subscription } from 'rxjs';
import {Contract, ethers, utils} from 'ethers';


@Component({
  selector: 'nft-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {

  @Input() nftAddress: any=undefined;
  @Input() nftTokenId: any=undefined;
  @Input() nftSeller: string=undefined;
  @Input() nftPrice: any=undefined;

  price = 'None';
  isOwner = false;

  poapNft: any=undefined;

  web3ServiceConnect$: Subscription|undefined;

  constructor(public web3Service: Web3Service,
    private poapNftService: PoapNFTService, public iconSet: IconSetService) { 
    iconSet.icons = { ...freeSet, ...brandSet };
  }

  async ngOnInit() {
    this.web3ServiceConnect$ = this.web3Service.onConnectChange.subscribe(async (connected: boolean)=>{
      if(connected){
        this.poapNft = await this.poapNftService.getNFTDetails(this.nftAddress, this.nftTokenId);
        this.isOwner = this.web3Service.accounts[0].toLowerCase() == this.nftSeller.toLowerCase();

        this.price = utils.formatUnits(this.nftPrice, 'ether');
      }
      
    })
    
  }


  ngOnDestroy(){
    this.web3ServiceConnect$!.unsubscribe();
    // this.formSubscriptions.forEach( sub=>{
    //   sub.unsubscribe();
    // });
  }

}
