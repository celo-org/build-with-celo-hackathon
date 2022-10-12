import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/Succour.png'
import {TiUserOutline} from 'react-icons/ti'
import { NavbarContainer, 
     LeftContainer, 
     RightContainer,
     NavbarInnerContainer,
     NavbarExtendedContainer,
     NavbarLinkContainer,
     NavbarLink,
     Logo,
     NavbarButton,
     NavbarUser,
     NavbarUserExtended,
     NavbarLinkRightContainer,
     OpenLinksButton,
     NavbarLinkExtended,
     NavbarButtonExtended
} from "./Navbar.style";
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdClose} from 'react-icons/md'

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click)

     return (
      <>
      <NavbarContainer click={click}>
        <NavbarInnerContainer>
           <LeftContainer>
            <Logo> 
              <Image src={logo} alt="Succour Logo" />
            </Logo>
           </LeftContainer>
          
           <RightContainer>
            <NavbarLinkContainer>
               <Link href="/dao"><NavbarLink>DAO</NavbarLink></Link>
               <Link href="/funding"><NavbarLink>Public funding</NavbarLink></Link>
               <Link href="/join"><NavbarButton>Join DAO</NavbarButton></Link>
               <NavbarUser>
                <TiUserOutline color="white" fontSize="1.5rem" />
               </NavbarUser>
                <OpenLinksButton 
                  onClick={() => {setClick((curr) => !curr);
                }}
                >
                    {click ? <><MdClose color="white" fontSize="1.5rem" /></> : <>
                    <GiHamburgerMenu color="white" fontSize="1.5rem" />
                </>
               }
              </OpenLinksButton>
            </NavbarLinkContainer>
           </RightContainer>
        </NavbarInnerContainer>
        { click &&  (
        <NavbarExtendedContainer>
          <NavbarLinkExtended>DAO</NavbarLinkExtended>
          <NavbarLinkExtended>Projects</NavbarLinkExtended>
          <NavbarLinkExtended><Link href="/join"><NavbarButtonExtended>Join DAO</NavbarButtonExtended></Link></NavbarLinkExtended>
          <NavbarUserExtended>
           <TiUserOutline color="white" fontSize="1.5rem" />
          </NavbarUserExtended>
        </NavbarExtendedContainer>
        )}
     </NavbarContainer>
     </>             
     )
}

export default Navbar


