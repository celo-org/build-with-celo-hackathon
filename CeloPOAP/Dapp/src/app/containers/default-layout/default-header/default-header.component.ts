import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Web3Service } from 'src/app/services/web3.service';

// import chains from 'eth-chains';
import getSupportedChains from '../../../models/supported-chains';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  networkList = getSupportedChains();
  selectedNetwork: any=44787; 

  web3ServiceConnect$: Subscription|undefined;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    public web3Service: Web3Service) {
    super();

    
    
  }

  
  ngOnInit(): void {
    
    this.web3ServiceConnect$ = this.web3Service.onConnectChange.subscribe(async (connected)=>{
      if(connected){
        this.selectedNetwork = await this.web3Service.getCurrentChainId();    
      }else{
        // this.selectedNetwork = undefined;
      } 
    })
    // this.selectedNetwork = 83;
    // this.web3Service.switchNetworkByChainId(this.selectedNetwork);
    // this.web3Service.connect().then(async ()=>{
    //   this.selectedNetwork = await this.web3Service.getCurrentChainId();
    //   console.log('loaded chin: ', this.selectedNetwork)
    // });
  }

  ngOnDestroy(){
    //this.web3ServiceConnect$!.unsubscribe();
  }

  onSwitchNetwork(newNetwork: any){
    this.selectedNetwork = newNetwork;
    
    this.web3Service.switchNetworkByChainId(this.selectedNetwork);
  }

  async connect (){
    
    await this.web3Service.connect();
    
  }

  async disconnect (){
    
    await this.web3Service.disconnect();
    
  }
}
