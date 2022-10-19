import type { NextPage } from 'next';
import { Frame } from '../frontend/core/frame/Frame';
import { Market } from '../frontend/views/market/Market';

const Home: NextPage = () => {
  return (
    <Frame>
      <Market />
    </Frame>
  );
};

export default Home;
