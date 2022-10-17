import { Box, Flex, FormLabel, Image, Text } from "@chakra-ui/react";
import CustomButton from "../components/CustomButton/customButton";
import TextInput from "../components/TextInputs/TextInput";
import brandLogo from "../assets/icons/brand-logo-dark.svg";
import PasswordInput from "../components/TextInputs/PasswordInput";
import { Select } from "@chakra-ui/react";
import { countries, userType } from "../utils/data";

const SignUp = () => {
  return (
    <Flex w="100%">
      <Box w="55%" className="main-bg" h="100vh">
        <Text color="brand.lightGrey" fontWeight="900" fontSize="40px">
          Create an Account
        </Text>
        <Text color="brand.yellow" fontSize="14px">
          Begin your journey to improve the ecosystem
        </Text>
      </Box>
      <Box w="45%" p="50px 80px 0">
        <a href="/">
          <Image src={brandLogo} alt="brand-logo" margin="0 auto" />
        </a>
        <Box mt="40px">
          <Text color="brand.dark" fontWeight="extrabold" fontSize="25px">
            Create an Account Here
          </Text>
          <form>
            <TextInput
              type="text"
              placeholder="Enter your full name"
              label="Full Name"
              color="brand.dark"
            />
            <TextInput
              type="email"
              placeholder="Enter your email"
              label="Email"
              color="brand.dark"
            />
            <FormLabel
              mt="20px"
              color="brand.dark"
              fontSize="14px"
              fontWeight="300"
            >
              Location
            </FormLabel>
            <Select
              placeholder="Select location"
              focusBorderColor="#65D593"
              _focus={{ border: "0.1px solid #65D593" }}
              color="brand.dark"
              h="48px"
              fontSize="14px"
            >
              {countries.map((res) => (
                <option value={res}>{res}</option>
              ))}
            </Select>
            <FormLabel
              mt="20px"
              color="brand.dark"
              fontSize="14px"
              fontWeight="300"
            >
              Sign up As
            </FormLabel>
            <Select
              placeholder="Select user type"
              focusBorderColor="#65D593"
              _focus={{ border: "0.1px solid #65D593" }}
              color="brand.dark"
              h="48px"
              fontSize="14px"
            >
              {userType.map((res) => (
                <option value={res}>{res}</option>
              ))}
            </Select>
            <PasswordInput
              type="password"
              placeholder="Enter your password"
              label="Password"
              color="brand.dark"
            />
            <CustomButton
              m="30px 0"
              w="100%"
              p="25px"
              bg="brand.lightGreen"
              color="brand.white"
              hoverBg="brand.green"
            >
              Create Account
            </CustomButton>
          </form>
          <Flex fontSize="14px" mt="-15px" justifyContent="center">
            <Text>Already have an account?</Text>
            <a href="/login">
              <Text
                ml="10px"
                color="brand.orange"
                _hover={{ color: "brand.yellow" }}
                cursor="pointer"
                fontWeight="bold"
              >
                Login
              </Text>
            </a>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;
