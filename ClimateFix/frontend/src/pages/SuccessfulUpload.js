import { Box, Flex, Image, Text } from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import Congrats from "../assets/images/congrats.png";
import CustomButton from "../components/CustomButton/customButton";
import Money from "../assets/icons/money-bag.png";

const SuccessUpload = () => {
  return (
    <Box>
      <AuthNav />

      <Box w="100%" p="30px" textAlign="center" mt="120px">
        <Image mx="auto" src={Congrats} h="200px" alt="congrats" />
        <Box mt="50px" w="100%">
          <Text fontWeight="bold" fontSize="20px" color="brand.lightGreen">
            Congratulations
          </Text>
          <Text fontWeight="thin">
            You've succesfully supported the ecosystem
          </Text>
          <Flex alignItems="center" justifyContent="center" mt="30px">
            <Text fontSize="12px" color="brand.lightGreen">NB: Ensure to upload a video and image of your trees quarterly to get rewarded</Text>
            <Image ml="20px" src={Money} w={25} h={25} alt="money-bag" />
          </Flex>

          <Box mt="20px">
            <a href="/home">
              <CustomButton
                bg="brand.orange"
                color="brand.white"
                hoverBg="brand.lightGreen"
                mx="auto"
                w="30%"
              >
                <Text fontWeight="medium">Go Home</Text>
              </CustomButton>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessUpload;
