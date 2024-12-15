import styled from 'styled-components'
import { Box } from './Box'

const Div = styled.div`
width:100%;
display: flex;


`

const Cont = styled.div`
width:100%;

`

const Line = styled.div`
border-top:1px solid #0071c2;
margin-top:1px;
`

export const TopSection = () => {

  return (
    <Cont>
      <Div>
        <Box>Thông tin & giá</Box>
        <Box>Tiện nghi</Box>
        <Box>Nội quy nhà</Box>
        <Box>Chữ in nhỏ</Box>
        <Box>Đánh giá của khách</Box>
      </Div>
      <Line />
    </Cont>
  )
}