import { Flex, Image, Text } from "@chakra-ui/react";
import brandLogo from "../../assets/icons/brand-logo.svg";
import { lockIcon } from "../../assets/svgs/svg";
import CustomButton from "../CustomButton/customButton";

const NavBar = () => {
  return (
    <Flex
      bg="brand.green"
      p="15px 80px"
      alignItems="center"
      justifyContent="space-between"
      fontSize="14px"
    >
      <Flex alignItems="center" color="brand.white">
        <a href="/">
          <Image cursor="pointer" src={brandLogo} alt="brand-logo" />
        </a>
        <Flex alignItems="center" ml="120px">
          <Text
            mr="50px"
            style={{ transition: "all 0.8s ease" }}
            cursor="pointer"
            _hover={{ color: "brand.yellow" }}
          >
            How it Works
          </Text>
          <Text
            style={{ transition: "all 0.8s ease" }}
            cursor="pointer"
            _hover={{ color: "brand.yellow" }}
          >
            About ClimateFix
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="space-evenly" alignItems="center">
        <a href="/signup">
          <CustomButton
            bg="brand.orange"
            hoverBg="brand.yellow"
            hoverColor="brand.green"
            color="brand.white"
          >
            Sign Up
          </CustomButton>
        </a>
        <a href="/login">
          <Flex
            alignItems="center"
            style={{ transition: "all 0.8s ease" }}
            cursor="pointer"
            ml="80px"
          >
            {lockIcon}
            <Text
              ml="10px"
              color="white"
              _hover={{ color: "brand.yellow" }}
              style={{ transition: "all 0.8s ease" }}
            >
              Login
            </Text>
          </Flex>
        </a>
      </Flex>
    </Flex>
  );
};

export default NavBar;
