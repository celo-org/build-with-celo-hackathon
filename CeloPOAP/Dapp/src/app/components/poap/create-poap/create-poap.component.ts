import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators,  ValidatorFn, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';
import { Web3Service } from 'src/app/services/web3.service';
import contractList from '../../../models/contract-list';
import {Location} from '@angular/common';
import { BigNumber , constants, Contract, ethers, utils } from 'ethers';
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { AppToastComponent } from 'src/app/views/notifications/toasters/toast-simple/toast.component';
import { firstValueFrom, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {  ValidateDateIsNotInPast} from '../../../validators/create-launchpad-validators';

const PoapFactoryAbi = require('../../../../assets/PoapFactory.json');
const fee = "0.001";

@Component({
  selector: 'create-poap',
  templateUrl: './create-poap.component.html',
  styleUrls: ['./create-poap.component.scss']
})
export class CreatePoapComponent implements OnInit {
  mainFormGroup!: FormGroup;

  formSubscriptions: Subscription[]=[];

  testFG!: FormGroup;

  placement = ToasterPlacement.TopCenter;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  
  nativeCoin= '';

  datePickerConfig: any={
    format: 'YYYY/MM/DD HH:mm'
  };


  validationMessages : {
    [index: string]: any
   } = {
     'eventName' : {
       'required'  :   'Event Title is Required.',
       'minlength' :   'Event Title must be at least 3 characters long..',
       'maxlength' :   'Event Title cannot be more than 60 characters long'
     },
     'desc' : {
       'required'  :   'Description is required',
       'minlength' :   'Description must be at least 3 Characters',
       'maxlength' :   'Description cannot be more than 43 characters long'
     },
     'orgName' : {
      'required'  :   'Organization is required',
      'minlength' :   'Organization must be at least 3 Characters',
      'maxlength' :   'Organization cannot be more than 360 characters long'
    },
    'eventCode' : {
      'required'  :   'Event Code is required',
      'minlength' :   'Event Code must be at least 6 Characters',
      'maxlength' :   'Event Code cannot be more than 6 characters long'
    },
     'email' : {
       'required'  :   'Email is Required.',
       'email'     :   'Invalid Email'
     },
     
     'date' : {
       'required'  :   'Event Date is Required.',
       'past': 'Event Date can not be in the past'
     },
     
    'maxCapacity' : {
      'required'  :   'Expected Number of Attendees is Required.',
      'min': 'Expected Number of Attendees should be at least 1',
      'max': 'Expected Number of Attendees should be at most 100,000',
    },
     
    'logo' : {
      'required'  :   'Logo is Required.',
      'pattern' : 'Invalid Logo URL'
    },
    'twitter' : {
      'required'  :   'Twitter handle is Required.'
    },
    'telegram' : {
      'required'  :   'Telegram is Required.'
    },
    'website' : {
      'required'  :   'Website URl is Required.',
      'pattern' : 'Invalid URL'
    },
     'discord': {
       'required': 'Required'
     },
     'reddit': {
       'required': 'Required'
     },
 
   };


  
  
   web3ServiceConnect$: Subscription|undefined;
  userChain: string|null = 'celot';
  currentChainId: any; 

  
  constructor(private titleService: Title, 
    public web3Service: Web3Service,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private spinner: NgxSpinnerService,
    private router: Router,
    private http: HttpClient) { 
      
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userChain = params['chain'];

      this.web3ServiceConnect$ = this.web3Service.onConnectChange.subscribe(async (connected: boolean)=>{
        
        if(connected){
           if(this.userChain && this.userChain!='d' ){
            await this.web3Service.switchNetworkByChainShortName(this.userChain); 
          }else{
            this.userChain = (await this.web3Service.getCurrentChain())?.chain??'';
            this.updateURLWithNewParamsWithoutReloading()
          }

          this.currentChainId = await this.web3Service.getCurrentChainId();
          // this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency;
          this.nativeCoin = (await this.web3Service.getCurrentChain())?.nativeCurrency.symbol??'Coin';
          
        }

      });      
    })

   
    this.titleService.setTitle('Create POAP | POAP');

   
    this.mainFormGroup = this.fb.group({
      eventName: ['HackBer', [Validators.required]],
      desc: ['Global Hackathon', [Validators.required]],
      orgName: ['Celo', [Validators.required]],
      eventCode: ['123456', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      logo: ['https://place-hold.it/200?text=HB', [Validators.required]], // , Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
      date: ['2022-11-10', [Validators.required, ValidateDateIsNotInPast ] ],
      //expiryDate: ['', [Validators.required , ValidateDateIsNotInPast] ],    
      website: ['http://www.mysite.com', [Validators.required, , Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?') ]],
      
      maxCapacity: ['100', [Validators.required, Validators.min(1), Validators.max(100000) ] ],
      email: ['email@email.com', [Validators.required, Validators.email ] ],    
    })

    this.onFormChanges();
    
  }

  updateURLWithNewParamsWithoutReloading() {
    
    const url = this.router.createUrlTree(['poaps', this.userChain, 'create']).toString()

    this.location.go(url);
  }

  

  ngOnDestroy(): void {
    
    this.formSubscriptions.forEach( sub=>{
      sub.unsubscribe();
    } )

    this.web3ServiceConnect$!.unsubscribe();

    
  }

  onFormChanges(): void {
    

    // this.formSubscriptions.push(  
      
    //   this.mainFormGroup.get('campaignInfoFG.useTokenVesting')!.valueChanges.subscribe(val => {
        
    //     if(val==true){
          
    //       this.mainFormGroup.get('campaignInfoFG.tokenVestings')!.enable()
          
    //     }else{
    //       // this.mainFormGroup.get('tokenInfoFG.tokenType')!.enable()
    //       this.mainFormGroup.get('campaignInfoFG.tokenVestings')!.disable()
    //     }
        
    //   }) 
    // );

    
    //defaults
    // this.mainFormGroup.get('campaignInfoFG.tokenVestings')!.disable();
    

  }

  async onSubmit(form: FormGroup) {
    
    /** spinner starts on init */
    this.spinner.show();
    
    const currentChainId = this.currentChainId;
	
    this.spinner.show();
    const poapFactoryContract = new Contract(environment.poapFactoryAddress, PoapFactoryAbi, this.web3Service.signer); // contractList[this.currentChainId].poapFactoryAddress
    const now = new Date();
    const nowTimeStamp = Math.floor(now.getTime() / 1000)
    
    try{
      
      const gasFeeData = await this.web3Service.getFeeData().catch(()=>{}); //iif gasdata is available, use eip1559
      
      const currentChainId = await this.web3Service.getCurrentChainId();
      
      let tx;
      let eventDetails = {
        eventName: form.value.eventName,
        desc: form.value.desc,
        orgName: form.value.orgName,
        // eventCode: form.value.eventCode,
        logo: form.value.logo,
        date: Math.floor(Date.parse(form.value.date) / 1000) ,
        website: form.value.website,
        poapsMinted:0,
        maxCapacity: form.value.maxCapacity,
        eventOwner:  '0x0000000000000000000000000000000000000000',
        email: form.value.email
      };

      tx = await poapFactoryContract.createNewEvent(eventDetails,form.value.eventCode , {
        value: utils.parseEther(fee),
        gasLimit: 18000000
      } );

      // if(gasFeeData){
      //   tx = await poapFactoryContract.createNewEvent(eventDetails, form.value.eventCode, {
      //       value: utils.parseEther(fee),
      //       maxFeePerGas: gasFeeData.maxFeePerGas,// should use geasprice for bsc, since it doesnt support eip 1559 yet
      //       maxPriorityFeePerGas: gasFeeData.maxPriorityFeePerGas
      //   });
      // }else{
      //   tx = await poapFactoryContract.createNewEvent(eventDetails,form.value.eventCode , {
      //     value: utils.parseEther(fee),
      //     gasLimit: 18000000
      //   } );
      // }
      

      const txResult = await tx.wait();

      // this.newTokenAddress = txResult.events.filter((f: any)=>f.event=='TokenCreated')[0].args['createdTokenAddress']; 
      // // console.log('New Token Address: ', this.newTokenAddress);

      // this.mode = "display";
      let poapEvent = txResult.events.filter((f: any)=>f.event=='eventAdded')[0];
      let poapOwnerAddress = poapEvent.args['owner'];
      let eventIndex = poapEvent.args['eventID'].toString();

      console.log(poapOwnerAddress, ', ', eventIndex)

      this.showToast('Success!','Your Event has been created succesfully!');

      this.router.navigate(['/poaps', 'd',  eventIndex ]);
    }catch(err){
      this.showToast('Oops!','Something went wrong!', 'danger');
      console.log('Error Creating: ', err);
    }
    finally{
      this.spinner.hide();
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
