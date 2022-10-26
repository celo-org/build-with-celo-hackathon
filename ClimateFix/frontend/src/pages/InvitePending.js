import { Box, Image, Text } from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import VerifyIcon from "../assets/images/pending.png";
import CustomButton from "../components/CustomButton/customButton";

const InvitePending = () => {
  return (
    <Box>
      <AuthNav />
      <Box w="100%" textAlign="center">
        <Image src={VerifyIcon} mx="auto" height="300px" alt="verifying-icon" />
        <Text fontWeight="bold" fontSize="20px">
          Your verification is pending!
        </Text>
        <Text color="brand.gray">An expert is already assigned to verify your request.</Text>

        <Box w="100%" textAlign="center" mt="40px">
                <a href="/upload-video">
                    <CustomButton
                    bg="brand.orange"
                    color="brand.white"
                    hoverBg="brand.lightGreen"
                    mx="auto"
                    w="40%"
                    >
                    <Text fontWeight="medium">Proceed</Text>
                    </CustomButton>
                </a>
            </Box>
      </Box>
    </Box>
  );
};

export default InvitePending;
