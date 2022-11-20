import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  
  #hide-menu {
    font-size: 40px;
    display: none;
    cursor: pointer;
  }
  
  ul li {
    display: inline;
    margin: 0 20px;
  }
  
   ul li a{
    font-weight: 900;
    color: #111;
  }
  
   @media screen and (max-width: 767px) {
     ul {
      display: none;
     }  
  }

`

export const OpenMenu = styled.div` 
  display: none;
  cursor: pointer;
  
  div {
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
    
  }
 
  
   @media screen and (max-width: 767px) {
     display: block;   
  }

`