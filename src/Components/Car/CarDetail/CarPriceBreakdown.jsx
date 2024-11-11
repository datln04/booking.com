import React from 'react';
import styled from 'styled-components';

const BreakdownContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 20px 0 20px 10px;
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CarPriceBreakdown = ({ price }) => {
  return (
    <BreakdownContainer>
      <h2>Car price breakdown</h2>
      <PriceItem>
        <p>Car hire charge</p>
        <p>₫{price}</p>
      </PriceItem>
      <PriceItem>
        <p>$74.50</p>
      </PriceItem>
      <p>VND prices are approx. You'll pay in USD, because that's your local currency.</p>
      <PriceItem>
        <p>Price for 3 days:</p>
        <p>approx. ₫{price}</p>
      </PriceItem>
    </BreakdownContainer>
  );
};

export default CarPriceBreakdown;