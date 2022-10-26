import {
  Box,
  FormControl,
  Image,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import NigMap from "../assets/images/nigeria-map.png";
import { allTrees, states } from "../utils/data";
import { TriangleDownIcon } from "@chakra-ui/icons";
import CustomButton from "../components/CustomButton/customButton";

const PlantNow = () => {
  return (
    <Box>
      <AuthNav />
      <Box padding="30px" mx="50px">
        <Box>
          <Text fontSize="25px" fontWeight="normal">
            New Plant
          </Text>
          <Text color="brand.lightGreen">Step 1</Text>
        </Box>
        <Box mt="20px">
          <Image
            src={NigMap}
            h="300px"
            w="100%"
            objectFit="cover"
            alt="nig-map"
          />
          <Text mt="40px" color="brand.green" fontWeight="bold">
            Please select any of the available land spaces and trees to be
            planted.
          </Text>

          <SimpleGrid columns={2} gap="48px">
            <FormControl mt="20px">
              {/* <FormLabel color="brand.dark" fontSize="14px" fontWeight="500">
                    Region
                </FormLabel> */}
              <Select
                placeholder="Please select a region"
                focusBorderColor="#65D593"
                _focus={{ border: "0.1px solid #65D593" }}
                _placeholder={{
                  color: "brand.grey",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                icon={<TriangleDownIcon />}
                size="lg"
                fontSize="16px"
                height="48px"
              >
                {states.map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt="20px">
              <Select
                placeholder="Please select a tree to be planted"
                focusBorderColor="#65D593"
                _focus={{ border: "0.1px solid #65D593" }}
                _placeholder={{
                  color: "brand.grey",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                icon={<TriangleDownIcon />}
                size="lg"
                fontSize="16px"
                height="48px"
              >
                {allTrees.map((tree) => (
                  <option value={tree} key={tree}>
                    {tree}
                  </option>
                ))}
              </Select>
            </FormControl>
          </SimpleGrid>
            <Box w="100%" textAlign="center" mt="40px">
                <a href="/invite-pending">
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
    </Box>
  );
};

export default PlantNow;
