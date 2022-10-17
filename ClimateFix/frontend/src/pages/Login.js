import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CustomButton from "../components/CustomButton/customButton";
import TextInput from "../components/TextInputs/TextInput";
import brandLogo from "../assets/icons/brand-logo-dark.svg";
import PasswordInput from "../components/TextInputs/PasswordInput"

const Login = () => {
  return (
    <Flex w="100%">
      <Box w="55%" className="main-bg" h="100vh">
        <Text color="brand.lightGrey" fontWeight="900" fontSize="40px">
          Welcome Back!
        </Text>
        <Text color="brand.yellow" fontSize="14px">
          Begin your journey to improve the ecosystem
        </Text>
      </Box>
      <Box w="45%" p="80px">
        <a href="/">
          <Image src={brandLogo} alt="brand-logo" margin="0 auto" />
        </a>
        <Box mt="50px">
        <Text color="brand.dark" fontWeight="extrabold" fontSize="25px">
          Login
        </Text>
          <form>
            <TextInput
              type="email"
              placeholder="Enter your email"
              label="Email"
              color="brand.dark"
            />
            <PasswordInput
              type="password"
              placeholder="Enter your password"
              label="Password"
              color="brand.dark"
            />
            <CustomButton m="30px 0" w="100%" p="25px" bg="brand.lightGreen" color="brand.white" hoverBg="brand.green">Log In</CustomButton>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
