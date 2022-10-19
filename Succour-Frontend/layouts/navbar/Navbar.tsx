import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/Succour.svg'
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
import JoinDao from '../../pages/JoinDao/JoinDao'

const Navbar = () => {
  const [click, setClick] = useState<any | any>(false);

  const handleClick = () => setClick(!click)

  //  const [showModal, setShowModal] = useState(false);

  //    const openModal = () => {
  //      setShowModal(prev => !prev);
  //    }

     return (
      <>
      <NavbarContainer click={click}>
          {/* Modal component is here */}
        {/* <JoinDao showModal={showModal} setShowModal={setShowModal} /> */}
        <NavbarInnerContainer>
           <LeftContainer>
            <Logo> 
              <Link href="/"><Image src={logo} alt="Succour Logo" /></Link>
            </Logo>
           </LeftContainer>
          
           <RightContainer>
            <NavbarLinkContainer>
               <Link href="/DAO/dao"><NavbarLink>DAO</NavbarLink></Link>
               <Link href="/Projects/Projects"><NavbarLink>Projects</NavbarLink></Link>
               {/* <NavbarLink 
                onClick={openModal}
                >
                  Join DAO
               </NavbarLink> */}
               
               <Link href="/Crowdfunding/Crowdfunding"><NavbarButton>Crowdfunding</NavbarButton></Link>
               <NavbarUser>
                <TiUserOutline color="white" fontSize="1.5rem" />
               </NavbarUser>
                <OpenLinksButton 
                  onClick={() => {setClick((curr : any) => !curr);
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
          <NavbarLinkExtended><Link href="/DAO/dao">DAO</Link></NavbarLinkExtended>
          <NavbarLinkExtended><Link href="/Projects/Projects">Projects</Link></NavbarLinkExtended>
          {/* <NavbarLinkExtended onClick={openModal}>Join DAO</NavbarLinkExtended> */}
          <NavbarLinkExtended><Link href="/Crowdfunding/Crowdfunding"><NavbarButtonExtended>Crowdfunding</NavbarButtonExtended></Link></NavbarLinkExtended>
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


