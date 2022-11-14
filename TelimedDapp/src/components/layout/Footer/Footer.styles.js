import styled from 'styled-components'

export const AppFooter = styled.footer`
  padding: 20px 100px;
  color: #fefefe;
  display: flex;
  justify-content: space-between;
  background: #DEB63D;
  
  .tnc {
    margin-left: 15px;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    font-size: 12px;
    justify-content: space-between;
    
      .tnc {
        margin-left: 5px;
      }
  }
`


