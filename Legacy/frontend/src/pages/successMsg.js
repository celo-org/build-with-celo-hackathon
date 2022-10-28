import { Box, Image, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";

const SuccessMessage = () => {
  const imgLink = "https://pngimg.com/uploads/confetti/confetti_PNG86957.png";
  return (
    <Box
      padding={{ base: "10px 40px", lg: "30px 80px" }}
      bg="#02044A"
      minH="100vh"
    >
      <Navbar />

      <Box m="80px auto" w="80%">
        <Image src={imgLink} alt="congrats" w="200px" m="20px auto" />
        <Text
          color="white"
          fontSize={{ base: "20px", lg: "50px" }}
          fontWeight="black"
          mt="60px"
          textAlign="center"
        >
          Congratulations!
        </Text>
        <Text
          textAlign="center"
          fontSize={{ base: "12px", lg: "16px" }}
          color="brand.white"
          w={{ base: "100%", lg: "40%" }}
          m="20px auto"
        >
          You have successfully updated your check in interval and you have
          successfully checked in today
        </Text>
      </Box>

      <Link to="/">
        <CustomButton
          m={{ base: "20px auto", lg: "-30px auto" }}
          bg="none"
          w={{ base: "100%", lg: "170px" }}
          d="flex"
          hover="brand.teal"
          border="1px solid #15F4CB"
          hoverColor="brand.white"
          color="brand.white"
        >
          Go Home
        </CustomButton>
      </Link>
    </Box>
  );
};

export default SuccessMessage;
