import styled from 'styled-components'

export const CountWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`
export const Count = styled.span`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`
