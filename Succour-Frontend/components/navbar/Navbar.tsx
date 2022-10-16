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
              <Link href="/"><Image src={logo} alt="Succour Logo" /></Link>
            </Logo>
           </LeftContainer>
          
           <RightContainer>
            <NavbarLinkContainer>
               <Link href="/Dao"><NavbarLink>DAO</NavbarLink></Link>
               <Link href="/Projects/Projects"><NavbarLink>Projects</NavbarLink></Link>
                <Link href="/Join"><NavbarLink>Join DAO</NavbarLink></Link>
               <Link href="/CrowdFunding"><NavbarButton>Crowdfunding</NavbarButton></Link>
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
          <NavbarLinkExtended><Link href="/Dao">DAO</Link></NavbarLinkExtended>
          <NavbarLinkExtended><Link href="/Projects/Projects">Projects</Link></NavbarLinkExtended>
          <NavbarLinkExtended><Link href="/Join">Join DAO</Link></NavbarLinkExtended>
          <NavbarLinkExtended><Link href="/Crowdfunding"><NavbarButtonExtended>Crowdfunding</NavbarButtonExtended></Link></NavbarLinkExtended>
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


