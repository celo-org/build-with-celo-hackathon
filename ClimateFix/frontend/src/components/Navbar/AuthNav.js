import { Flex, Image, Text } from "@chakra-ui/react";
import { toaster } from "evergreen-ui";
import brandLogo from "../../assets/icons/brand-logo.svg";
import {logoutIcon} from "../../assets/svgs/svg";
import { logout } from "../../firebase";

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
            <a href="/home">
              <Image cursor="pointer" src={brandLogo} alt="brand-logo" />
            </a>
            <Flex alignItems="center" ml="120px">
              <a href="/experts">
                <Text
                  mr="50px"
                  style={{ transition: "all 0.8s ease" }}
                  cursor="pointer"
                  _hover={{ color: "brand.yellow" }}
                >
                  View Experts
                </Text>
              </a>
              <Text mr="50px" style={{ transition: "all 0.8s ease" }} cursor="pointer" _hover={{ color: "brand.yellow" }} onClick={() => toaster.success("Coming soon")}>
                Market Place
              </Text>
              {/* <a href="/view-plants">
                <Text style={{ transition: "all 0.8s ease" }} cursor="pointer" _hover={{ color: "brand.yellow" }}>
                  My Profile
                </Text>
              </a> */}
            </Flex>
          </Flex>
          <Flex>
                <Text
                  mr="50px"
                  style={{ transition: "all 0.8s ease" }}
                  cursor="pointer"
                  _hover={{ color: "brand.yellow" }}
                  color="brand.yellow"
                >
                  Your celo token: 0.00
                </Text>
            <Flex justifyContent="space-evenly" alignItems="center" onClick={logout}>
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
            </Flex>
          </Flex>
        </Flex>
      );
};

export default AuthNav;
