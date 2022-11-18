//Navigation Screens Import
import DaoListScreen from '../screens/DaoScreens/DaoListScreen';
import CreateDaoScreen from '../screens/DaoScreens/CreateDaoScreen';
import CofounderDetailsScreen from '../screens/DaoScreens/CofounderDetailsScreen';
import ReviewScreen from '../screens/DaoScreens/ReviewScreen';
import DaoHomeScreen from '../screens/DaoScreens/DaoHomeScreen';
import WalletHomeScreen from '../screens/WalletScreens/WalletHomeScreen';
import SendScreen from '../screens/WalletScreens/SendScreen';
import CreateProposal from '../screens/DaoScreens/CreateProposal';
import ProposalDetailsScreen from '../screens/DaoScreens/ProposalDetailsScreen';
// import RestoreScreen from '../screens/RestoreScreen';
import DAOSuiteInfo from '../screens/InstructionScreens/DAOSuiteInfo';
import AlfajoresWalletInfo from '../screens/InstructionScreens/AlfajoresWalletInfo';
import GovernorInfo from '../screens/InstructionScreens/GovernorInfo';

import TokenListScreen from '../screens/TokenScreens/TokenListScreen';
import CreateTokenScreen from '../screens/TokenScreens/CreateTokenScreen';
import TokenHomeScreen from '../screens/TokenScreens/TokenHomeScreen';

import CrowdsaleListScreen from '../screens/CrowdsaleScreens/CrowdsaleListScreen';
import CreateCrowdsaleScreen from '../screens/CrowdsaleScreens/CreateCrowdsaleScreen';
import CrowdsaleHomeScreen from '../screens/CrowdsaleScreens/CrowdsaleHomeScreen';


import GovernorListScreen from '../screens/GovernanceScreens/GovernorListScreen';
import CreateGovernorScreen from '../screens/GovernanceScreens/CreateGovernorScreen';
import GovernorHomeScreen from '../screens/GovernanceScreens/GovernorHomeScreen';
import CreateProposalScreen from '../screens/GovernanceScreens/CreateProposalScreen';
import GovernorProposalDetailsScreen from '../screens/GovernanceScreens/GovernorProposalDetails';
import GovernorSettingScreen from '../screens/GovernanceScreens/GovernorSettingScreen';

import TokenMintingInfo from '../screens/InstructionScreens/TokenMintingInfo';
import CrowdsaleInfo from '../screens/InstructionScreens/CrowdsaleInfo';

export const DaoScreens = [
  {
    name: 'DaoList',
    title: 'Project List',
    component: DaoListScreen
  },
  {
    name: 'CreateDao',
    title: 'Create your Project',
    component: CreateDaoScreen
  },
  {
    name: 'cofounderDetails',
    title: 'Create your Project',
    component: CofounderDetailsScreen
  },
  {
    name: 'Review',
    title: 'Review',
    component: ReviewScreen
  },
  {
    name: 'DaoHomeScreen',
    title: 'Home',
    component: DaoHomeScreen
  },
  {
    name: 'CreateProposal',
    title: 'Create Proposal',
    component: CreateProposal
  },
  {
    name: 'ProposalDetails',
    title: 'Proposal Details',
    component: ProposalDetailsScreen
  }
];

export const WalletScreens = [
  {
    name: 'WalletHomeScreen',
    title: 'Wallet',
    component: WalletHomeScreen
  },
  {
    name: 'SendScreen',
    title: 'Transfer Tokens',
    component: SendScreen
  },
];

export const InstructionScreens = [
  {
    name: 'Wallet',
    title: 'Instructions',
    component: AlfajoresWalletInfo
  },
  {
    name: 'Equistart',
    title: 'Instructions',
    component: DAOSuiteInfo
  },
  {
    name: 'Minting',
    title: 'Instructions',
    component: TokenMintingInfo
  },
  {
    name: 'Crowdsale',
    title: 'Instructions',
    component: CrowdsaleInfo
  },
  {
    name: 'Governor',
    title: 'Instructions',
    component: GovernorInfo
  }
]

export const TokenScreens = [
  {
    name: 'TokenListScreen',
    title: 'ERC20Token',
    component: TokenListScreen
  },
  {
    name: 'CreateToken',
    title: 'Create your token',
    component: CreateTokenScreen
  },
  {
    name: 'TokenHomeScreen',
    title: 'ERC20 Token',
    component: TokenHomeScreen
  }
]

export const CrowdsaleScreens = [
  {
    name: 'CrowdsaleListScreen',
    title: 'Token Sale',
    component: CrowdsaleListScreen
  },
  {
    name: 'CreateCrowdsale',
    title: 'Create a Crowdsale',
    component: CreateCrowdsaleScreen
  },
  {
    name: "CrowdsaleHomeScreen",
    title: 'Buy Tokens',
    component: CrowdsaleHomeScreen
  }
]

export const GovernanceScreens = [
  {
    name: 'GovernorListScreen',
    title: 'Governance',
    component: GovernorListScreen
  },
  {
    name: 'CreateGovernor',
    title: 'Create New Governor',
    component: CreateGovernorScreen
  },
  {
    name: 'GovernorHomeScreen',
    title: 'Governor',
    component: GovernorHomeScreen
  },
  {
    name: 'CreateProposalScreen',
    title: 'Create A New Proposal',
    component: CreateProposalScreen
  },
  {
    name: 'GovernorProposalDetails',
    title: 'Proposal Details',
    component: GovernorProposalDetailsScreen
  },
  {
    name: 'GovernorSettingScreen',
    title: 'Timelock Settings',
    component:GovernorSettingScreen
  }

]


//   export const RestoreScreens = [
//     {
//         name: 'RestoreScreen',
//         title: 'Restore Wallet',
//         component: RestoreScreen
//       },
//   ];