import { Button, Box, useColorMode, Heading } from '@chakra-ui/react';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession, signIn, signOut } from "next-auth/react"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { data: session, status } = useSession()

  if (status === "authenticated") {
    
    return (
      <header>
      
        <Box
          display="flex"
          justifyContent="flex-end"
          maxWidth="1200px"
          m="0 auto"
          maxHeight="38px"
          margin= "1rem"
          marginRight= "5%"
          marginLeft= "auto"    
        >
        <Heading
        flex="auto">
      Sacuda
      </Heading>
        <ConnectButton />
          <Button marginLeft="1%" onClick={toggleColorMode}>
            {colorMode === 'dark' ? <BsFillSunFill /> : <BsMoonStarsFill />}
          </Button>
          <Button marginLeft="1%"   onClick={signOut}>Logout</Button>
        </Box>
      </header>
    );
  }

  return (
    <header>
    
      <Box
        display="flex"
        justifyContent="flex-end"
        maxWidth="1200px"
        m="0 auto"
        maxHeight="38px"
        margin= "1rem"
        marginRight= "5%"
        marginLeft= "auto"    
      >
      <Heading
      flex="auto">
    Sacuda
    </Heading>
        <Button marginLeft="1%" onClick={toggleColorMode}>
          {colorMode === 'dark' ? <BsFillSunFill /> : <BsMoonStarsFill />}
        </Button>
        <Button marginLeft="1%"   onClick={signIn}>Login</Button>
      </Box>
    </header>
  );

};

export default Header;
