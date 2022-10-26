import { Box, Image, Text } from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import Congrats from "../assets/images/congrats.png";
import CustomButton from "../components/CustomButton/customButton";

const SuccessUpload = () => {
  return (
    <Box>
      <AuthNav />

      <Box w="100%" p="30px" textAlign="center" mt="120px">
        <Image mx="auto" src={Congrats} h="200px" alt="congrats" />
        <Box mt="50px">
          <Text fontWeight="bold" fontSize="20px" color="brand.lightGreen">
            Congratulations
          </Text>
          <Text fontWeight="thin">
            You've succesfully supported the ecosystem
          </Text>

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
