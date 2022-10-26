import type { GetStaticPropsResult, NextPage, NextPageContext } from 'next';
import { TCO2Token } from '../backend/market/market.entity';
import { Market } from '../frontend/views/market/Market';
import { getTokens } from '../backend/market/market.repo';

type Props = {
  tco2Tokens: TCO2Token[];
};

const Home: NextPage<Props> = ({ tco2Tokens }) => (
  <Market tco2Tokens={tco2Tokens} />
);

export const getStaticProps = async (
  _context: NextPageContext
): Promise<GetStaticPropsResult<Props>> => {
  const tco2Tokens = await getTokens();

  return {
    props: { tco2Tokens },
  };
};

export default Home;
