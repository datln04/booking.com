import styled from "styled-components";
import { ImageContainer } from "./ImageContainer";

const Cont = styled.div`
  width: 80%;
  margin: auto;
`;
const H1 = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
  margin-bottom: 16px;
  color: #333333;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NextTrip = () => {
  return (
    <Cont>
      <H1>Lấy cảm hứng cho chuyến đi tiếp theo của bạn</H1>

      <FlexDiv>
        <ImageContainer
          wide="320px"
          img="https://cf.bstatic.com/xdata/images/xphoto/540x405/122925057.webp?k=09f14b17546723a74f3c71cc9d5e5040e60c1594234b5a06cc3ce376ad299da5&o="
        >
          <h1>Các công viên nước hấp dẫn nhất của Đức</h1>
          <p>
            Từ những máng trượt đầy hỗn loạn đến các phòng xông hơi thư giãn, luôn có điều thú vị
            cho tất cả mọi người.
          </p>
        </ImageContainer>

        <ImageContainer
          wide="320px"
          img="https://cf.bstatic.com/xdata/images/xphoto/540x405/124728212.webp?k=7b5c982e56da0da2c45cb3e7663683b608d309a239a77ba2729f14cc6f0f36b2&o="
        >
          <h1>48 giờ ở Tokyo dành cho mọi khách du lịch</h1>
          <p>
            Hành trình hoàn hảo cho một chuyến đi hai ngày vòng quanh Tokyo – dành cho mọi kiểu du
            khách.
          </p>
        </ImageContainer>

        <ImageContainer
          wide="320px"
          img="https://cf.bstatic.com/xdata/images/xphoto/540x405/122809197.webp?k=e7f86e398e43427ca04f743292823c6cdbc72ce486cb8a5609af837afd6f5255&o="
        >
          <h1>8 ý tưởng cho một chuyến đi một mình đáng nhớ</h1>
          <p>
            Tận hưởng thời gian riêng tư bằng cách khám phá một thành phố mới hoặc chỉ đơn giản là
            thư giãn.
          </p>
        </ImageContainer>
      </FlexDiv>

      <FlexDiv>
        <ImageContainer
          wide="490px"
          img="https://cf.bstatic.com/xdata/images/xphoto/540x405/121352725.webp?k=b630e51b3ad653b598a22809bd644c80513f8911932846d0ff981ee236a36a35&o="
        >
          <h1>5 hồ và vịnh mơ ước ở châu Âu để bơi lội hoang dã</h1>
          <p>
            Những cuộc phiêu lưu thú vị qua làn nước băng ở Na Uy và bơi lội mùa hè trong các hồ
            Provence.
          </p>
        </ImageContainer>

        <ImageContainer
          wide="490px"
          img="https://cf.bstatic.com/xdata/images/xphoto/540x405/63486779.webp?k=316f6f1b92d64eb083891b2d8cf4d6f9b88a487052eed17a97846ff1f74da509&o="
        >
          <h1>5 kỳ nghỉ tuyệt đẹp với hồ bơi riêng</h1>
          <p>
            Thưởng thức kỳ nghỉ của bạn khi nằm thư giãn bên bể bơi vô cực riêng hoặc hồ bơi có tầm
            nhìn toàn cảnh.
          </p>
        </ImageContainer>
      </FlexDiv>
    </Cont>
  );
};
