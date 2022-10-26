import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import { uploadIcon } from "../assets/svgs/svg";
import CustomButton from "../components/CustomButton/customButton";
import AuthNav from "../components/Navbar/AuthNav";

const UploadVideo = () => {
  return (
    <Box>
      <AuthNav />

      <Box padding="30px" mx="50px">
        <Text fontSize="25px" fontWeight="normal">
          Upload you video here
        </Text>
      </Box>

      <Box padding="30px" mx="50px" w="40%">
        <FormLabel
          htmlFor="upload-img"
          p="30px"
          border="1px dashed #C4C4C4"
          textAlign="center"
          w="100%"
          cursor="pointer"
        >
          <Box mx="auto">{uploadIcon}</Box>
          <Text>Drag and drop your upload</Text>
          <Text>or</Text>
          <Text color="brand.orange">Browse files</Text>
        </FormLabel>
        <Input
          type="file"
          id="upload-img"
          display="none"
          accept="video/mp4,video/x-m4v,video/*"
        />
        <Box mt="20px">
            <a href="/success">
                <CustomButton
                bg="brand.orange"
                color="brand.white"
                hoverBg="brand.lightGreen"
                mx="auto"
                w="100%"
                >
                <Text fontWeight="medium">Submit Video</Text>
                </CustomButton>
            </a>
        </Box>
      </Box>

    </Box>
  );
};

export default UploadVideo;
