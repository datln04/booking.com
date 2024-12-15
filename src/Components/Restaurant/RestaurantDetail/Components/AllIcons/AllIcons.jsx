import styled from 'styled-components';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import WifiIcon from '@material-ui/icons/Wifi';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Cont = styled.div`
  display: grid;
  margin-top: 15px;
  margin-bottom: 10px;
  justify-content: center;

  p {
    margin: 0;
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #969696;
  }
`;

const styles = {
  fontSize: "35px", 
  color: "#333", 
  display: "block", 
  margin: "auto"
};

export const AllIcons = () => {
  return (
    <FlexDiv>
      <Cont>
        <LocalDiningIcon style={styles} />
        <p>Ăn uống tại chỗ</p>
      </Cont>
      <Cont>
        <WifiIcon style={styles} />
        <p>WiFi miễn phí</p>
      </Cont>
      <Cont>
        <LocalParkingIcon style={styles} />
        <p>Đỗ xe miễn phí</p>
      </Cont>
      <Cont> 
        <AcUnitIcon style={styles} />
        <p>Điều hòa không khí</p>
      </Cont>
      <Cont> 
        <OutdoorGrillIcon style={styles} />
        <p>Chỗ ngồi ngoài trời</p>
      </Cont>
    </FlexDiv>
  );
};
