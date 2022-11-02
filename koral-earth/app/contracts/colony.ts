import { getEnvVar } from '../common/env';
import ColonyAlfajores from './alfajores/Colony.json';
import ColonyGanache from './ganache/Colony.json';
import ColonyMainnet from './mainnet/Colony.json';
import { Network } from '../common/blockchain';

type NetworkContract = {
  [key in Network]:
    | typeof ColonyGanache
    | typeof ColonyAlfajores
    | typeof ColonyMainnet;
};

export const ColonyContract: NetworkContract = {
  ganache: ColonyGanache,
  alfajores: ColonyAlfajores,
  mainnet: ColonyMainnet,
};
