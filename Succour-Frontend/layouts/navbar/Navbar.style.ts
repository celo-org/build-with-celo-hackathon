
//@ts-ignore
import styled from "styled-components";
export const NavbarContainer = styled.nav`
 position: fixed;
 width: 100%;
 height: ${(props:any) => (props.click ? "100vh" : "105px" )};
 background: #070606;
 display: flex;
 z-index: 1000;
 flex-direction: column;
`
export const LeftContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  padding-left: 8%;
`;
export const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10%;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height:  100px;
  display: flex;
`
export const NavbarLinkContainer = styled.div`
   display: flex;
   align-items: center;
`
export const NavbarLink = styled.a`
  cursor: pointer;
  font-weight: 500;
  padding-left: 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 165%;
  color: #AFAEAE;
  transition: all 400ms ease-in-out;
  /* margin: 19px; */
  margin-right: 40px;
  &:hover {
     color: #FFFFFF;
  }
   @media (max-width: 800px) {
     display: none;
  }
`

export const Connection = styled.div`
  margin-left: -5px;
  margin-right: 15px;
`

export const ConnectionButton = styled.button`
 cursor: pointer;
 border: none;
 background: linear-gradient(93.01deg, rgba(22, 222, 181, 0.71) -9.8%, #264D45 65.6%, rgba(7, 51, 42, 0.980365) 94.34%);
 border-radius: 10px;
 width: 120px;
 height: 45px;
 font-weight: 500;
 font-size: 15px;
 line-height: 165%;
 color: #FFFEFE;
 transition: all 100ms ease-out;
`

export const Button = styled.button`
 background: #1C3933;
 /* background: #0B1715; */
 border: 1px solid #0B1715;
 font-weight: 500;
 font-size: 12px;
 line-height: 165%;
 color: #FFFEFE;
`

export const Logo = styled.div`
  cursor: pointer;
  margin: 10px;
  max-width: 180px;
  height: auto;
`
export const NavbarButton = styled.button`
  cursor: pointer;
  border: none;
  text-align: center;
  width: 200px;
  height: 70px;
  font-size: 18px;
  line-height: 60px;
  letter-spacing: 2px;
  text-decoration: none;
  color: #FFFFFF;
  background: transparent;
  transition: all 200ms ease-out;
  /* border: 2px solid var(--color-bg);
  border-width: 2px;
  border-radius: 30px; */
  margin-right: 40px;
  @media (max-width: 700px) {
     display: none;
  }
  
  &:hover {
    background: rgba(7, 51, 42, 0.980365);
  }
`
export const NavbarButtonExtended = styled.button`
  position: relative;
  transition: all 200ms ease-out;
  border: none;
  cursor: pointer;
  width: 210px;
  height: 70px;
  font-size: 18px;
  line-height: 60px;
  letter-spacing: 2px;
  text-decoration: none;
  background: transparent;
  text-align: center;
  color: #FFFFFF;
   &:hover {
    background: rgba(7, 51, 42, 0.980365);
  }
`
export const NavbarUser = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer; 
     width: 64px;
     height: 64px;
     background: linear-gradient(120.83deg, #131313 0%, rgba(54, 53, 53, 0) 100%, rgba(54, 53, 53, 0) 100%);
     border-radius: 30px;
     @media(max-width: 700px) {
          display: none;
     }
`
export const NavbarUserExtended = styled.div`
     cursor: pointer; 
     width: 64px;
     height: 64px;
     background: linear-gradient(120.83deg, #131313 0%, rgba(54, 53, 53, 0) 100%, rgba(54, 53, 53, 0) 100%);
     border-radius: 30px;
     display: flex;
     align-items: center;
     justify-content: center;
`
export const NavbarLinkExtended = styled.a`
  cursor: pointer;
  font-weight: 500;
  padding-left: 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 165%;
  color: #AFAEAE;
  transition: all 400ms ease-in-out;
  text-decoration: none;
  margin: 19px;
  &:hover {
     color: #FFFFFF;
  }
`
export const NavbarLinkRightContainer = styled.div`
 display: flex;
 margin-top: 10px;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;
  @media (min-width: 700px) {
     display: none;
  }
`

export const NavbarExtendedContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 @media (min-width: 700px) {
     display: none;
 }
`