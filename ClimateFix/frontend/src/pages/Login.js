/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CustomButton from "../components/CustomButton/customButton";
import TextInput from "../components/TextInputs/TextInput";
import brandLogo from "../assets/icons/brand-logo-dark.svg";
import PasswordInput from "../components/TextInputs/PasswordInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  auth,
  logInWithEmailAndPassword,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import { Spinner } from "evergreen-ui";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) {
      <Spinner />;
    };
    Cookies.set("userId", user?.uid)
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <Flex w="100%">
      <Box w="55%" className="main-bg" h="100vh">
        <Text color="brand.lightGrey" fontWeight="900" fontSize="40px">
          Welcome Back!
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
            Login
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
            <PasswordInput
              type="password"
              placeholder="Enter your password"
              label="Password"
              color="brand.dark"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomButton
              m="30px 0"
              w="100%"
              p="25px"
              bg="brand.lightGreen"
              color="brand.white"
              hoverBg="brand.green"
              disabled={!email || !password}
            >
              {loading ? <Spinner /> : 'Log In'}
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
          <a href="/forgot-password">
            <Text color="brand.green" textAlign="center" mt="20px" cursor="pointer" _hover={{ color: "brand.orange" }}>Forgot Password ?</Text>
          </a>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
