import './home.css';
import './App.css';
import FirstPage from './home';

import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
// import "./styles.css";

import Hotels from './image/Hotels.png';
import Appartment from './image/Appartment.png';
import Resort from './image/Resort.png';
import Villas from './image/Villas.png';
import Cabins from './image/Cabins.png';
import Cottages from './image/Cottages.png';
// import Glamping from './image/Glamping.png';
import Serviced_appartment from './image/Serviced_appartment.png';
import Holidayhomes from './image/Holidayhomes.png';
import Guesthomes from './image/Guesthomes.png';
import hostels from './image/hostels.png';


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1, pagination: false },
  { width: 768, itemsToShow: 3, itemsToScroll: 1, pagination: false },
  { width: 800, itemsToShow: 4, itemsToScroll: 1, pagination: false }
];

function MiddleSection() {
  return (
    <div className="App">
      <FirstPage />
      <div className="corosel rec.rec-arrow:hover">
        <h2 className="browsH2">Các loại dịch vụ đang hiện hành</h2>
        <Carousel breakPoints={breakPoints} pagination={false} >

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Hotels} alt="Khách sạn" />
            </div>
            <div className="diver">
              <h4 className="subhead">Khách sạn</h4>
              <p className="bbrowssub">802,405 Khách sạn</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Appartment} alt="Căn hộ" />
            </div>
            <div className="diver">
              <h4 className="subhead">Căn hộ</h4>
              <p className="bbrowssub">807,884 Căn hộ</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Resort} alt="Khu nghỉ dưỡng" />
            </div>
            <div className="diver">
              <h4 className="subhead">Khu nghỉ dưỡng</h4>
              <p className="bbrowssub">17,482 Khu nghỉ dưỡng</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Villas} alt="Biệt thự" />
            </div>
            <div className="diver">
              <h4 className="subhead">Biệt thự</h4>
              <p className="bbrowssub">406,281 Biệt thự</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Cabins} alt="Nhà gỗ" />
            </div>
            <div className="diver">
              <h4 className="subhead">Nhà gỗ</h4>
              <p className="bbrowssub">31,734 Nhà gỗ</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Cottages} alt="Nhà tranh" />
            </div>
            <div className="diver">
              <h4 className="subhead">Nhà tranh</h4>
              <p className="bbrowssub">142,790 Nhà tranh</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Serviced_appartment} alt="Căn hộ dịch vụ" />
            </div>
            <div className="diver">
              <h4 className="subhead">Căn hộ dịch vụ</h4>
              <p className="bbrowssub">33,743 Căn hộ dịch vụ</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Holidayhomes} alt="Nhà nghỉ dưỡng" />
            </div>
            <div className="diver">
              <h4 className="subhead">Nhà nghỉ dưỡng</h4>
              <p className="bbrowssub">406,281 Nhà nghỉ dưỡng</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={Guesthomes} alt="Nhà khách" />
            </div>
            <div className="diver">
              <h4 className="subhead">Nhà khách</h4>
              <p className="bbrowssub">115,537 Nhà khách</p>
            </div>
          </Item>

          <Item>
            <div className="divimg">
              <img className="browsimg" src={hostels} alt="Nhà trọ" />
            </div>
            <div className="diver">
              <h4 className="subhead">Nhà trọ</h4>
              <p className="bbrowssub">115,537 Nhà trọ</p>
            </div>
          </Item>

        </Carousel>
      </div>

      <div>
      </div>

    </div>
  );
}


// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
export { MiddleSection };
