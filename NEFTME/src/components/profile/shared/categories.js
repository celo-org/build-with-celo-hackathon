import CreatedIcon from '@assets/icons/created.svg';
import LockerIcon from '@assets/icons/locker.svg';
import SupportingIcon from '@assets/icons/supporting.svg';
import ClockIcon from '@assets/icons/clock.svg';

export default [
  {
    id: 'created',
    name: 'Created',
    Icon: CreatedIcon,
    width: 12,
    height: 12,
    description: (name) => `Here you can find all NFTs created by ${name}`,
  },
  {
    id: 'owned',
    name: 'Owned',
    Icon: LockerIcon,
    width: 12,
    height: 13.33,
    description: (name) => `Here you can find all NFTs owned by ${name}`,
  },
  {
    id: 'supporting',
    name: 'Supporting',
    Icon: SupportingIcon,
    width: 13.33,
    height: 13.33,
    description: (name) => `Here you can find all NFTs ${name === 'you' ? `${name} are` : `${name} is`} supporting`,
  },
  {
    id: 'saved',
    name: 'Saved',
    Icon: ClockIcon,
    width: 12,
    height: 12,
    description: () => 'Here you can find all NFTs you saved',
  },
];
