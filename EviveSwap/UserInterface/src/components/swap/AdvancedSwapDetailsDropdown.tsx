import React from 'react';
import styled from 'styled-components';
import { useLastTruthy } from '../../hooks/useLast';
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails';

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  padding-top: calc(8px + 2rem);
  padding-bottom: 16px;
  margin-top: -2rem;
  width: 100%;
  max-width: 500px;
  border-radius: 0 0 1.2rem 1.2rem;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  z-index: -1;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`;

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade);

  return (
    <AdvancedDetailsFooter show={Boolean(trade)}>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </AdvancedDetailsFooter>
  );
}
