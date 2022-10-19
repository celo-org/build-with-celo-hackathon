import { Button, Box, useColorMode } from '@chakra-ui/react';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Box
        display="flex"
        justifyContent="flex-end"
        maxWidth="1200px"
        m="0 auto"
      >
        <Button m="1rem" onClick={toggleColorMode}>
          {colorMode === 'dark' ? <BsFillSunFill /> : <BsMoonStarsFill />}
        </Button>
      </Box>
    </header>
  );
};

export default Header;
