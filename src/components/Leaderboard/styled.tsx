import styled from 'styled-components'
import { getColorByrank } from '../../utils/badge'

const IMAGE_URL = 'https://loremflickr.com/40/40/sun'

export const Container = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  margin: 50px 0;
  gap: 10px;
  display: flex;
  flex-direction: column;
`
export const Row = styled.div`
  width: 800px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: #212121;
  color: white;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  width: 96%;
  max-width: 667px;
  font-size: 16px;
`

export const LeftSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  padding-left: 35px;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 16px;
  }
`
export const RightSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  padding-right: 35px;
  align-items: center;

  @media (max-width: 768px) {
    padding-right: 16px;
  }
`

export const Badge = styled.p<{ rank: number }>`
  border-radius: 4px;
  padding: 5px 10px;
  background-color: ${({ rank }) => getColorByrank(rank)};
  margin-right: 16px;
  min-width: 32px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`
export const Avatar = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: rgb(235, 207, 51);
  position: relative;
  margin-right: 8px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    height: 30px;
    width: 30px;
  }
`
export const ImageSpan = styled.span<{ userid: string }>`
  background-image: ${({ userid }) => `url('${IMAGE_URL}?random=${userid}')`};
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 50%;
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`
export const Name = styled.span`
  text-align: center;
  margin: 5px;
  font-size: 18px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
`
