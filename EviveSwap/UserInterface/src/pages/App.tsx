import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Polling from '../components/Header/Polling';
import Popups from '../components/Popups';
import Web3ReactManager from '../components/Web3ReactManager';
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader';
import AddLiquidity from './AddLiquidity';
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './AddLiquidity/redirects';
import Pool from './Pool';
import PoolFinder from './PoolFinder';
import RemoveLiquidity from './RemoveLiquidity';
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects';
import Swap from './Swap';
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly } from './Swap/redirects';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`;

export default function App() {
  return (
    <Suspense fallback={null}>
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>

        <BodyWrapper>
          <Popups />
          <Polling />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  );
}
