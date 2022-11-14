import styled from 'styled-components'

export const AppDrawer = styled.aside`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
  
  li {
    margin-bottom: 20px;
    
    a {
      color: #fefefe;
    }
  }

  
  `