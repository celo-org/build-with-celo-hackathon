/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CustomButton from "../components/CustomButton/customButton";
import TextInput from "../components/TextInputs/TextInput";
import brandLogo from "../assets/icons/brand-logo-dark.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  auth,
  sendPasswordReset
} from "../firebase";
import { useNavigate } from "react-router-dom";
import { Spinner } from "evergreen-ui";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordReset(email);
    navigate('/login')
  };

  useEffect(() => {
    if (loading) {
      <Spinner />;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <Flex w="100%">
      <Box w="55%" className="main-bg" h="100vh">
        <Text color="brand.lightGrey" fontWeight="900" fontSize="40px">
          Forgot Password!
        </Text>
        <Text color="brand.yellow" fontSize="14px">
          Continue your journey to improve the ecosystem
        </Text>
      </Box>
      <Box w="45%" p="80px">
        <a href="/">
          <Image src={brandLogo} alt="brand-logo" margin="0 auto" />
        </a>
        <Box mt="50px">
          <Text color="brand.dark" fontWeight="extrabold" fontSize="25px">
            Forgot Password
          </Text>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="email"
              placeholder="Enter your email"
              label="Email"
              color="brand.dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomButton
              m="30px 0"
              w="100%"
              p="25px"
              bg="brand.lightGreen"
              color="brand.white"
              hoverBg="brand.green"
              disabled={!email}
            >
              {loading ? <Spinner /> : 'Reset Password'}
            </CustomButton>
          </form>
          <Flex fontSize="14px" mt="-15px" justifyContent="center">
            <Text>Don't have an account yet?</Text>
            <a href="/signup">
              <Text
                ml="10px"
                color="brand.orange"
                _hover={{ color: "brand.yellow" }}
                cursor="pointer"
                fontWeight="bold"
              >
                Sign Up
              </Text>
            </a>
          </Flex>
          <Flex fontSize="14px" mt="15px" justifyContent="center">
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

export default ForgotPassword;
