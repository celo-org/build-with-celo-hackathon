import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
// import { NgHelmetModule } from "ng-helmet";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Web3ModalModule, Web3ModalService} from '@mindsorg/web3modal-angular';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from '@coreui/angular';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from '@coreui/angular';
import { SafePipe } from './safe.pipe';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    FormsModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    Web3ModalModule,
    ArchwizardModule,
    NgxSpinnerModule,
    ToastModule,
    CarouselModule,
    GraphQLModule,
    HttpClientModule,
    // NgxEditorModule
    // NgHelmetModule.forRoot({
    //   baseTitle: "| ZSale",
    // }),
    // NgbModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy //,HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
    // {
    //   provide: Web3ModalService,
    //   useFactory: () => {
    //     return new Web3ModalService({
    //       network: "mainnet", // optional
    //       cacheProvider: true, // optional
    //       disableInjectedProvider: false,

    //       /**const providerOptions = {
    //         walletconnect: {
    //           package: WalletConnectProvider,
    //           options: {
    //             // Mikko's test key - don't copy as your mileage may vary
    //             infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
    //           }
    //         },

    //         fortmatic: {
    //           package: Fortmatic,
    //           options: {
    //             // Mikko's TESTNET api key
    //             key: "pk_test_391E26A3B43A3350"
    //           }
    //         }
    //       }; */

    //       providerOptions : {
    //         walletconnect: {
    //           package: WalletConnectProvider, // required
    //           options: {
    //             infuraId: '8043bb2cf99347b1bfadfb233c5325c0', // required change this with your own infura id
    //             description: 'Scan the qr code and sign in',
    //             qrcodeModalOptions: {
    //               mobileLinks: [
    //                 'rainbow',
    //                 'metamask',
    //                 'argent',
    //                 'trust',
    //                 'imtoken',
    //                 'pillar'
    //               ]
    //             }
    //           }
    //         },
    //         fortmatic: {
    //           package: Fortmatic,
    //           options: {
    //             // Mikko's TESTNET api key
    //             key: "pk_test_391E26A3B43A3350",
    //             network: {
    //               rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    //               chainId: 137
    //             }
    //           }
    //         },
    //         injected: {
    //           display: {
    //             logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
    //             name: 'metamask',
    //             description: "Connect with the provider in your Browser"
    //           },
    //           package: null
    //         },
    //       } // required
    //     });
    //   },
    // },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
