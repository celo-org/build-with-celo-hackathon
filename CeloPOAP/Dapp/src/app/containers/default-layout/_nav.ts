import { INavData } from '@coreui/angular';
import { IconComponent } from '@coreui/icons-angular';
import { url } from 'inspector';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   iconComponent: { name: 'cil-speedometer' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },

  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },

  {
    title: true,
    name: 'POAPs'
  },
  {
    name: 'All POAPs',
    url: '/poaps',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Create a POAP',
    url: '/poaps/create',
    iconComponent: { name: 'cil-dollar' }
  },
  // {
  //   title: true,
  //   name: 'Tokens'
  // },
  // {
  //   name: 'Token List',
  //   url: '/tokens',
  //   iconComponent: { name: 'cil-drop'}
  // },
  // {
  //   name: 'Token Minter',
  //   url: '/tokens/token-minter',
  //   iconComponent: { name: 'cil-paper-plane'}
  // },
  // {
  //   name: 'Token Locker',
  //   url: '/tokens/token-lock',
  //   iconComponent: { name: 'cil-lock-locked'},
  //   badge: {
  //     color: 'secondary',
  //     text: 'COMING SOON'
  //   }
  // },
  {
    title: true,
    name: 'Others'
  },
  {
    name: 'Docs',
    url: '/docs/',
    iconComponent: { name: 'cil-drop'},
    badge: {
      color: 'secondary',
      text: 'COMING SOON'
    }
    
  }
];
