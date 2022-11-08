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
    NavbarButtonExtended,
    Connection,
    ConnectionButton,
    Button
} from "./Navbar.style";
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdClose} from 'react-icons/md'
import JoinDao from '../../pages/JoinDao/JoinDao'
import Dropdown from './Dropdown'
import Profile from  '../../components/profilePoPUP/Profile'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
  const [click, setClick] = useState<any | any>(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click)

  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  // this function is powering Profile Modal page

  const openProfileModal = () => {
  setShowProfileModal(prev => !prev);
  }


    return (
    <>
    {/* Profile Modal pop up */}
    <Profile showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal} />

    <NavbarContainer click={click}>
        {/* Modal component is here */}
      <JoinDao showModal={showModal} setShowModal={setShowModal} />
      <NavbarInnerContainer>
          <LeftContainer>
          <Logo> 
            <Link href="/"><Image src={logo} alt="Succour Logo" /></Link>
          </Logo>
          </LeftContainer>

          <RightContainer>
          <NavbarLinkContainer>
              <Link href="/dao"><NavbarLink>DAO</NavbarLink></Link>
              <Link href="/Projects/Projects"><NavbarLink>Projects</NavbarLink></Link>
              <NavbarLink 
              onClick={openModal}
              >
                Join DAO
              </NavbarLink>

              <Link href="/Crowdfunding"><NavbarButton>Crowdfunding</NavbarButton></Link>
              {/* Custom Connection Button is here */}
               <Connection>
              <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <ConnectionButton onClick={openConnectModal} type="button">
                    Connect Wallet
                  </ConnectionButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <ConnectionButton onClick={openChainModal} type="button">
                    Wrong network
                  </ConnectionButton>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
              </ConnectButton.Custom>
             </Connection>
             {/* End of Custom Connection Button */}
              <NavbarUser>
              <TiUserOutline color="white" fontSize="1.5rem" onMouseOver={openProfileModal} />
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
        <NavbarLinkExtended><Link href="/dao">DAO</Link></NavbarLinkExtended>
        <NavbarLinkExtended><Link href="/Projects/Projects">Projects</Link></NavbarLinkExtended>
        <NavbarLinkExtended onClick={openModal}>Join DAO</NavbarLinkExtended>
        <NavbarLinkExtended><Link href="/Crowdfunding"><NavbarButtonExtended>Crowdfunding</NavbarButtonExtended></Link></NavbarLinkExtended>
        <NavbarUserExtended>
          <TiUserOutline color="white" fontSize="1.5rem" />
        </NavbarUserExtended>
      </NavbarExtendedContainer>
      )}
    </NavbarContainer>
    {/* Profile Drop down */}
        {/* <Dropdown /> */}
        {/* Profile Drop down ends */}
    </>
    )
}

export default Navbar
