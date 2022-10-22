import { Flex, Image, Text } from "@chakra-ui/react";
import brandLogo from "../../assets/icons/brand-logo.svg";
import {logoutIcon} from "../../assets/svgs/svg";

const AuthNav = () => {
    return (
        <Flex
          bg="brand.green"
          p="15px 80px"
          alignItems="center"
          justifyContent="space-between"
          fontSize="14px"
        >
          <Flex alignItems="center" color="brand.white">
            <Image src={brandLogo} alt="brand-logo" />
            <Flex alignItems="center" ml="120px">
              <Text
                mr="50px"
                style={{ transition: "all 0.8s ease" }}
                cursor="pointer"
                _hover={{ color: "brand.yellow" }}
              >
                View Experts
              </Text>
              <Text mr="50px" style={{ transition: "all 0.8s ease" }} cursor="pointer" _hover={{ color: "brand.yellow" }}>
                Market Place
              </Text>
              <Text style={{ transition: "all 0.8s ease" }} cursor="pointer" _hover={{ color: "brand.yellow" }}>
                My Profile
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent="space-evenly" alignItems="center">
            <a href="/login">
              <Flex
                alignItems="center"
                style={{ transition: "all 0.8s ease" }}
                cursor="pointer"
                ml="80px"
              >
                {logoutIcon}
                <Text ml="10px" color="white" _hover={{ color: "brand.yellow" }} style={{ transition: "all 0.8s ease" }}>
                  Logout
                </Text>
              </Flex>
            </a>
          </Flex>
        </Flex>
      );
};

export default AuthNav;
