import React from 'react';
import styled from 'styled-components';
import { CardProps, Text } from 'rebass';
import { Box } from 'rebass/styled-components';

const Card = styled(Box)<{ width?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;
export default Card;

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg3};
  background-color: ${({ theme }) => theme.bg2};
`;

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg3};
`;

const BlueCardStyled = styled(Card)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  width: fit-content;
`;

export const BlueCard = ({ children, ...rest }: CardProps) => {
  return (
    <BlueCardStyled {...rest}>
      <Text fontWeight={500} color="#4F6DFF">
        {children}
      </Text>
    </BlueCardStyled>
  );
};
