import React from 'react';
import styled from 'styled-components';

const BreadcrumbContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 2px solid yellow;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
//   width: 70%;
  margin: 10px 0;
  padding: 20px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const Location = styled.p`
  font-weight: bold;
`;

const Time = styled.p`
  margin: 0;
`;

const Separator = styled.span`
  margin: 0 10px;
`;

const WarningMessage = styled.p`
  color: red;
`;

const CarBreadcrumb = ({ location, startTime, endTime }) => {
  return (
    <BreadcrumbContainer>
      <Row>
        <Block>
          <Location>{location}</Location>
          <Time>{startTime}</Time>
        </Block>
        <Separator>></Separator>
        <Block>
          <Location>{location}</Location>
          <Time>{endTime}</Time>
        </Block>
      </Row>
      <WarningMessage>Bạn cần phải lấy xe trước {startTime}</WarningMessage>
    </BreadcrumbContainer>
  );
};

export default CarBreadcrumb;