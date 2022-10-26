import { TCO2Token } from './market.entity';
import axios from 'axios';
import { tco2Tokens } from './market.query';
import toucanTco2Tokens from '../shared/data/toucanTco2Tokens.json';

type TCO2TokenResponse = {
  data: {
    tco2Tokens: TCO2Token[];
  };
};

export const getTokens = async (): Promise<TCO2Token[]> => {
  try {
    const results = await axios.post<TCO2TokenResponse>(
      'https://api.thegraph.com/subgraphs/name/toucanprotocol/matic',
      {
        query: tco2Tokens,
        variables: null,
      }
    );
    return results.data.data.tco2Tokens;
  } catch (error) {
    console.log(
      'Getting projects failed! Defaulting to pre-fetched projects',
      error
    );
    return toucanTco2Tokens.data.tco2Tokens as TCO2Token[];
  }
};
